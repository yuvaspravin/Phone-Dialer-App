import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DialPad from "../components/DialPad";
import Icon from "react-native-vector-icons/Ionicons";
import CallHistory from "../components/CallHistory";
import ContactList from "../components/ContactList";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ seAddContactPage }) => {
  const navigation = useNavigation();
  const [tabViewChange, setTabViewChange] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactSavePage, setContactSavePage] = useState(false);

  const handleTabChange = (tabIndex) => {
    setTabViewChange(tabIndex);
  };

  return (
    <View style={styles.container}>
      {/* Fixed Top Search Bar */}
      <View style={styles.topNav}>
        {/* <View>
          {tabViewChange !== 0 && (
            <Text style={styles.title}>
              {tabViewChange === 1 ? "Phone" : "Contact"}
            </Text>
          )}
        </View> */}
        <View style={styles.search}>
          <Icon
            name="add"
            size={25}
            color="black"
            style={styles.searchIcon}
            onPress={() => navigation.navigate("AddContact")}
          />

          <Icon
            name="search"
            size={22}
            color="black"
            style={styles.searchIcon}
          />
          <Icon
            name="ellipsis-vertical"
            size={22}
            color="black"
            style={styles.searchIcon}
          />
        </View>
      </View>

      <View style={styles.contactWrapper}>
        <ScrollView
          contentContainerStyle={styles.contactDisplay}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {tabViewChange === 0 && (
            <DialPad
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          )}
          {tabViewChange === 1 && <CallHistory />}
          {tabViewChange === 2 && <ContactList />}
        </ScrollView>
      </View>

      {/* Fixed Bottom Tab Navigation */}
      <View style={styles.textArea}>
        <Text
          style={[styles.text, tabViewChange === 0 && styles.activeTab]}
          onPress={() => handleTabChange(0)}
        >
          Keypad
        </Text>
        <Text
          style={[styles.text, tabViewChange === 1 && styles.activeTab]}
          onPress={() => handleTabChange(1)}
        >
          Recents
        </Text>
        <Text
          style={[styles.text, tabViewChange === 2 && styles.activeTab]}
          onPress={() => handleTabChange(2)}
        >
          Contacts
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#F5F5F5",
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",

    left: 10,
    right: 10,
    height: "10%",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 5,
    marginLeft: 5,
  },
  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop: 10,
  },
  contactWrapper: {
    flex: 1,
    marginTop: "10%",
    marginBottom: "10%",
  },
  contactDisplay: {
    flexGrow: 1, // Prevents collapse when empty
    justifyContent: "flex-start", // Ensures content starts from the top
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  textArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "10%",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    paddingBottom: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#000",
  },
  title: {
    fontSize: 24,
  },
});

export default HomeScreen;
