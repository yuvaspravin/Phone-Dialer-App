import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addCallLog, enableDialScreen, callingNumber,enableDialPad } from "../redux/action";
import Icon from "react-native-vector-icons/MaterialIcons";

const DialPad = ({navigation}) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const contactsList = useSelector((state) => state.contacts);

  const handlePress = (num) => {
    const newNumber = phoneNumber + num;
    setPhoneNumber(newNumber);
    const matches = contactsList.filter(
      (contact) => contact.phone && contact.phone.includes(newNumber)
    );
    setFilteredContacts(matches);
  };

  const handleDelete = () => {
    const newNumber = phoneNumber.slice(0, -1);
    setPhoneNumber(newNumber);
    const matches = contactsList.filter(
      (contact) => contact.phone && contact.phone.includes(newNumber)
    );
    setFilteredContacts(matches);
    console.log(matches,"matches")
  };

  const handleSuggestionPress = (number) => {
    setPhoneNumber(number);
    setFilteredContacts([]);
  };

  const makeCall = () => {
    if (phoneNumber.trim().length > 0) {
      const callTime = new Date().toISOString();
      dispatch(addCallLog(phoneNumber, "Outgoing", callTime));
      // dispatch(enableDialPad(false));
      // dispatch(enableDialScreen(true));
      dispatch(callingNumber(phoneNumber));
      navigation.navigate('dialScreen')
    } else {
      alert("Enter a number first");
    }
  };

  return (
    <View style={styles.container}>
    
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        style={styles.suggestionsList}
        contentContainerStyle={{ paddingBottom: 250 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => handleSuggestionPress(item.phone)}
          >
            <Text style={styles.suggestionText}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.suggestionText}>{item.phone}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.dialPadContainer}>
        <Text style={styles.input} numberOfLines={1} ellipsizeMode="tail">
          {phoneNumber}
        </Text>
        <View>
          {[
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            ["*", 0, "#"],
          ].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((num) => (
                <TouchableOpacity
                  key={num}
                  style={styles.button}
                  onPress={() => handlePress(num)}
                >
                <Text style={styles.btnText}>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <View>
          {phoneNumber && (
            <TouchableOpacity style={styles.videoBtn} onPress={makeCall}>
              <Icon name="videocam" size={30} color="green" />
            </TouchableOpacity>
          )}
        </View>
        <View>
          <TouchableOpacity style={styles.callBtn} onPress={()=>makeCall()}>
            <Icon name="phone" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          {phoneNumber && (
            <TouchableOpacity style={styles.delBtn} onPress={handleDelete}>
              <Icon name="backspace" size={30} color="grey" />
            </TouchableOpacity>
          )}
        </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  suggestionsList: {
    flex: 1,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  suggestionText: { fontSize: 18 },
  dialPadContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    width:"100%",
     justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    
  },
  input: {
    fontSize: 28,
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
    alignSelf:"center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontSize: 30, fontWeight: "400" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    width: "80%",
    paddingHorizontal: 20,
  },
  callBtn: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 50,
  },
  videoBtn: {
    padding: 10,
    borderRadius: 50,
  },
  delBtn: {
    padding: 10,
    borderRadius: 50,
  },
});

export default DialPad;
