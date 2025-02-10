import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet,TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {MaterialCommunityIcons as Icon} from "@expo/vector-icons";

import { enableDialPad,callingNumber } from '../redux/action';

const CallHistory = ({navigation}) => {
  const dispatch = useDispatch()
  const callHistory = useSelector((state) => state.callHistory);
console.log(callHistory,"callHistory")
  const handlePress = () => dispatch(enableDialPad(true));

  
const onHandleSearch = () => {
  navigation.navigate('dialPad')
}
const handleMakeCall=(phoneNumber)=>{
   dispatch(callingNumber(phoneNumber));
    navigation.navigate('dialScreen')
}

  return (
    <View style={styles.container}>
        
      <View style={styles.floatingButton} >
        <Pressable onPress={onHandleSearch}>
          <Icon name="dialpad" size={24} color="green" />
        </Pressable>
      </View>
      <FlatList
        data={callHistory}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => {
          return <View><Text>There is no recents contact</Text></View>
        }}
        renderItem={({ item }) => {
          const formattedTime = new Date(item.time).toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }
          );

          return (
          <View style={styles.item}>
                  <View style={styles.dataView}>
                    <View style={styles.dataView}>
                      <Icon
                        name="phone-outgoing"
                        size={20}
                        color="grey"
                        style={styles.icon}
                        onPress={() => handleAddContact()}
                      />
                      <Text style={styles.dataTitle}>{item?.number}</Text>
                      <Text>{formattedTime}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>handleMakeCall(item?.number)}><Icon
                        name="phone"
                        size={20}
                        color="green"
                        style={styles.icon}
                        
                      /></TouchableOpacity>
                  </View>
                </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
 
  item: {
    fontSize: 18,

    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 15,
  },
  icon: {
    marginRight: 5,
  },
 
  dataView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    zIndex:99999
  },
  dataTitle: {
    fontSize: 16,
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

export default CallHistory;
