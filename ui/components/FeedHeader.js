import React from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FeedHeader = props => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.topContainer}>
        <FastImage
          source={{ uri: "https://getassistapp.sgp1.cdn.digitaloceanspaces.com/getassistapp/dp-folder/2cea714dfca93259b4f927eb545101a6529071155550471aedf54e6ba1953caf.jpg" }}
          style={styles.avatar}
        />
        <TextInput placeholderTextColor="#616161" placeholder="Post new message" style={styles.textInputStyle} />
        <View style={styles.action}>
          <View style={{ marginRight: 8 }}>
            <Icon name="settings" color="black" size={24} />
          </View>
          <View>
            <Icon name="camera" color="black" size={24} />
          </View>
        </View>
      </View>
      {/* <View style={styles.titleContainer}>
        <Text style={styles.title}>Feed</Text>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    flex: 1
  },
  topContainer: {
    padding: 8,
    paddingLeft: 18,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  title: {
    fontSize: 42,
    fontFamily: "Roboto-Black",
    // color: "#2962ff"
    color: "black"
  },
  titleContainer: {
    padding: 8,
    paddingLeft: 16,
    paddingBottom: 16
  },
  textInputStyle: {
    backgroundColor: "#eeeeee",
    color: "black",
    paddingLeft: 16,
    borderRadius: 20,
    height: 36,
    marginLeft: 8,
    flex: 1,
  },
  action: {
    padding: 8,
    flexDirection: "row"
  }
});

export default FeedHeader;