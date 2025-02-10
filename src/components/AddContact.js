import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {MaterialIcons as Icon} from "@expo/vector-icons";
import { saveContact } from "../redux/action";
import { useDispatch } from "react-redux";
import { successToast} from '../utils'

const AddContact = ({navigation}) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSaveContact = () => {
    const isAllEmpty = [firstName, lastName, phone, email].every(e => e === "");
      !isAllEmpty && (dispatch(saveContact(firstName, lastName, phone, email)),
           successToast('Success', 'Added Contact Successfully'))
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="First Name"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Last Name"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={setPhone}
            value={phone}
            placeholder="Phone"
            placeholderTextColor="gray"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="gray"
            keyboardType="email-address"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.button}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => handleSaveContact()}
        >
          <Text style={styles.button}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '10%',
    backgroundColor: "#F5F5F5",
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
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  header: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    width: "100%",
    // backgroundColor: "#fff",
    paddingVertical: 10,
    // borderTopWidth: 1,
    // borderColor: "#ccc",
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    // backgroundColor: "#ddd",
    borderRadius: 8,
    width: 150,
    alignItems: "center",
  },
  button: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddContact;
