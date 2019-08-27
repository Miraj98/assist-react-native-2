import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

const Avatar = props => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.avatarprofile}
        source={
          props.profilePic !== undefined &&
          props.profilePic !== "null" &&
          props.profilePic !== null
            ? { uri: props.profilePic }
            : require("../../../assets/avatar1.png")
        }
      />
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.about}>{props.about}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    alignItems: "center",
    backgroundColor: "white"
  },
  avatarprofile: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  name: {
    fontSize: 32,
    fontFamily: "Rubik-Medium",
    marginTop: 24,
    color: "black"
  },
  about: {
    marginTop: 8,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Rubik",
    color: "black"
  }
});

export default Avatar;
