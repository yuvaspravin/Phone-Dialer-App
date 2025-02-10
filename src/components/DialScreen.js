import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { enableDialScreen, enableDialPad } from "../redux/action";

const DialScreen = ({ navigation }) => {
  const [callTime, setCallTime] = useState(0);
  const isDialScreenEnable = useSelector((state) => state?.isContactNumber);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const handleCallCut = () => {
    // navigation.navigate('dialPad')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.phoneNumber}>{isDialScreenEnable}</Text>
      <Text style={styles.callTime}>{formatTime(callTime)}</Text>
      <View style={styles.avatar} />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="pause-circle" size={30} color="#000" />
          <Text style={styles.controlText}>Hold</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="person-add" size={30} color="#000" />
          <Text style={styles.controlText}>Add Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="bluetooth" size={30} color="#000" />
          <Text style={styles.controlText}>Bluetooth</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="volume-high" size={30} color="#000" />
          <Text style={styles.controlText}>Speaker</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.endCallButton}
        onPress={() => {
          navigation.navigate("TabNav", { screen: "recents" });
        }}
      >
        <Ionicons name="call" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: "#ddd",
  },
  phoneNumber: { fontSize: 22, color: "#000", marginBottom: 5 },
  callTime: { fontSize: 18, color: "#000", marginBottom: 30 },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 30,
  },
  controlButton: { alignItems: "center" },
  controlText: { color: "#000", fontSize: 14, marginTop: 5 },
  endCallButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 50,
    position: "absolute",
    bottom: 50,
  },
});

export default DialScreen;
