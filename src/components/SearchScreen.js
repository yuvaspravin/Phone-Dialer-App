import React, { useState, useEffect, useLayoutEffect  } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Platform, FlatList} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { HeaderBackButton } from '@react-navigation/elements';
import { enableDialPad,enableSearch} from '../redux/action'
import { useSelector, useDispatch } from "react-redux";
import Row from './Row';


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
const SearchScreen = ({navigation}) => {

  const dispatch=useDispatch()
  const [search, setSearch] = useState("");
  const [filterData, setFilteredData] = useState([]);
   const [expandedContact, setExpandedContact] = useState('');
  const contactDetail = useSelector((state) => state.contacts);


  console.log('SEARCH', search);

useEffect(() => {
  if (!search.trim()) {
    setFilteredData([]);
    return;
  }

  const matchedData = contactDetail.filter(
    (contact) =>
      (contact.firstName && contact.firstName.toLowerCase().includes(search.toLowerCase())) ||
      (contact.lastName && contact.lastName.toLowerCase().includes(search.toLowerCase())) ||
      (contact.phone && contact.phone.includes(search))
  );

  setFilteredData(matchedData);
}, [search,contactDetail]);

useLayoutEffect(() => {
  navigation.setOptions({
    headerShown: false
  })
}, [search, navigation])

 const toggleContact = (phone) => {
    setExpandedContact(expandedContact === phone ? '' : phone);
  };

  const getAvatarColor = (name) => {
    if (!name) return "#3498db";
    let charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

console.log(search,"filterData")
const handlePress=()=>{
           dispatch(enableDialPad(true))
           dispatch(enableSearch(false))
         }

  return (
    <View style={styles.container}>
    <View style={{flexDirection:"row", borderBottomColor: 'lightgray', alignItems:"center", paddingBottom: '3%', justifyContent:"flex-start", borderBottomWidth: 1}}>
      <HeaderBackButton onPress={() => navigation.goBack()} />
      <TextInput
            style={styles.input}
            onChangeText={setSearch}
            value={search}
            placeholder="Search"
            placeholderTextColor="gray"
          />
</View> 
 <FlatList
        data={filterData}
        keyExtractor={(item) => item}
        renderItem={({ item: section, index }) => (
          <View>
            {console.log(section,"section")}
            {[section].map((item, idx) => {
              const isExpanded = expandedContact.toString() === `${index}${idx}`;
              const initials = `${item.firstName.charAt(0)}${
                item.lastName ? item.lastName.charAt(0) : ""
              }`;
         

              return ( 
                <View style={styles.headerView}>
                  <TouchableOpacity
                    key={item.phone}
                    
                    onPress={() => {
                       toggleContact(`${index}${idx}`)
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
                         
                          <Text style={styles.avatarText}>
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
                            <TouchableOpacity style={styles.iconList} onPress={handlePress}>
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
    marginTop: '10%',
    backgroundColor: "#F5F5F5",
    padding:10
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: "#fff",
    width:"85%"
  },
  icon: {
    marginRight: 10,
  },
  input: {
    padding: '2%',
    width: '70%',
    borderWidth: 1,
    borderColor: 'lightgray'
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
  phone: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "500",
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
});

export default SearchScreen;
