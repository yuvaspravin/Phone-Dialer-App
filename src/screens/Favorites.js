import  { useState,useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {MaterialIcons as Icon} from "@expo/vector-icons";
import { favortiesContactList,deleteContact,enableDialPad,enableSearch} from '../redux/action'
import Row from '../components/Row';


const colors = [
  "#FF5733",
  "#33A1FF",
  "#33FF57",
  "#FF33A1",
  "#FF8C33",
  "#33FFF3",
  "#F333FF",
  "#FF3333",
  "#33FF8C",
  "#8C33FF",
];

const Favorites = ({navigation}) => {
  const dispatch = useDispatch();
  const favoritesList = useSelector((state) => state.contacts);
  const [expandedContact, setExpandedContact] = useState('');
  const [trashItems, setTrashItems] = useState([]);
  const [contactDetail,setContactDetail]=useState([])

 useEffect(() => {
  const filterData = favoritesList.filter((e) => e.favorites === 1);
  setContactDetail(filterData);
}, [favoritesList]);

  

  const toggleContact = (phone) => {
    setExpandedContact(expandedContact === phone ? '' : phone);
  };

  const getAvatarColor = (name) => {
    if (!name) return "#3498db";
    let charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const groupedContacts = contactDetail.reduce((acc, contact) => {
    const firstLetter = (contact.firstName[0] || "#").toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  const sortedSections = Object.keys(groupedContacts).sort();

  const onLongPress = (trashItem) => {
    trashItems.includes(trashItem)
      ? setTrashItems(trashItems.filter(e => e !== trashItem))
      : setTrashItems([...trashItems, trashItem])
  }

  const onDeleteContact = () => {
    let finalList = [];
    sortedSections.forEach((it, index) => {
      finalList = [...finalList, ...groupedContacts[it].filter((e, idx) => {
        const id = `${index}${idx}`;
        return !trashItems.includes(id)
      })]
    })
    setTrashItems([]);
    dispatch(deleteContact(finalList));
  }
const addFavorites = (item) => {
    
    const updatedContactDetail = contactDetail&&contactDetail.map(e =>
        e.firstName === item.firstName &&
        e.lastName === item.lastName &&
        e.phone === item.phone &&
        e.email === item.email
            ? { ...e, favorites: 1 }  
            : e
    );

    dispatch(favortiesContactList(updatedContactDetail));
};

const handlePress = () => dispatch(enableDialPad(true));

  
const onHandleSearch = () => {
  navigation.navigate('dialPad')
}



  return (
    <View style={styles.container}>
    <View style={styles.floatingButton} >
        <Pressable onPress={onHandleSearch}>
          <Icon name="dialpad" size={24} color="green" />
        </Pressable>
      </View>

        {trashItems.length > 0
          ? <Pressable onPress={onDeleteContact}><Row style={{marginTop: '4%'}}>
          <Icon name="delete" size={20} color={'red'} />
          <Text style={styles.deleteContact}>Delete</Text>
        </Row>
        </Pressable>
        : <Pressable onPress={() => {navigation.navigate('addContact')}}>
            <Row style={{marginTop: '4%'}}>
              <Icon name="add" size={20} color={'#1b8bd1'} />
              <Text style={styles.newContact}>Create New Contact</Text>
            </Row>
          </Pressable>
        }
       

      <FlatList
        data={sortedSections}
        keyExtractor={(item) => item}
        renderItem={({ item: section, index }) => (
          <View>
            {/* Section Header */}
            <Text style={styles.sectionHeader}>{section}</Text>
            {groupedContacts[section].map((item, idx) => {
              const isExpanded = expandedContact.toString() === `${index}${idx}`;
              const initials = `${item.firstName.charAt(0)}${
                item.lastName ? item.lastName.charAt(0) : ""
              }`;
              const isTrashElement = trashItems.includes(`${index}${idx}`);

              return ( 
                <View style={[styles.headerView, {backgroundColor: isTrashElement ? 'lightgray' : '#fff' }]}>
                  <TouchableOpacity
                    key={item.phone}
                    onLongPress={() => onLongPress(`${index}${idx}`)}
                    onPress={() => {
                      trashItems.length > 0 
                        ? onLongPress(`${index}${idx}`)
                        : toggleContact(`${index}${idx}`)
                    }}
                    style={styles.item}
                  >
                    <View>
                      <View style={styles.row}>
                        <View
                          style={[
                            styles.avatar,
                            { backgroundColor: getAvatarColor(item.firstName) },
                          ]}
                        >
                          {isTrashElement
                            ? <Icon name="check" size={20} />
                            : <Text style={styles.avatarText}>
                            {initials.toUpperCase()}
                          </Text>
                          }
                          
                        </View>
                        <Text style={styles.contactName}>
                          {item.firstName} {item.lastName}
                        </Text>
                      </View>
                      {isExpanded && (
                        <View style={styles.detailView}>
                          <View style={styles.details}>
                            <Text>Mobile</Text>{" "}
                            <Text style={styles.phone}>{item.phone}</Text>
                          </View>
                          <View style={styles.iconView}>
                            <TouchableOpacity style={styles.iconList}>
                              <Icon name="phone" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconListMsg}>
                              <Icon name="message" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconStar} onPress={()=>addFavorites(item)}>
                              <Icon name="star" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconListInfo}>
                              <Icon name="info" size={20} color="white" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View style={{borderWidth: 0.5, borderColor: '#f3f3f3'}} />
                </View>
              );
            })}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  deleteContact: {
    fontSize: 16,
    paddingLeft: '2%',
    color: 'red',
  },
  newContact: {
    fontSize: 16,
    paddingLeft: '2%',
    color: '#1b8bd1',
  },
 
  headerView: {
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#F5F5F5",
    padding: 8,
    paddingLeft: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  item: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailView: {
    marginLeft: 55,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  icon: {
    marginRight: 10,
  },
  phone: {
    fontSize: 14,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 500,
  },
  iconView: {
    marginTop: 20,
    marginBottom: 10,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconList: {
    backgroundColor: "green",
    padding: 10,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  iconListMsg: {
    backgroundColor: "skyblue",
    padding: 10,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  iconListInfo: {
    backgroundColor: "grey",
    padding: 10,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  iconStar: {
    backgroundColor: "grey",
    padding: 10,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
    floatingButton: {
    zIndex: 1,
    backgroundColor: '#f7f7f7',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    right: 30,
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Favorites;

