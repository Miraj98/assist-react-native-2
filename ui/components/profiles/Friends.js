import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  View
} from "react-native";
import FastImage from "react-native-fast-image";

const FRIEND_TILE_WIDTH = (Dimensions.get("window").width - 24) / 3;

const Tile = props => (
  <TouchableOpacity style={styles.tileContainer}>
    <View style={styles.friendImageContainer}>
      <FastImage
        style={styles.friendImage}
        source={
          props.photo_url === null || props.photo_url === "null"
            ? require("../../../assets/avatar1.png")
            : { uri: props.photo_url }
        }
      />
    </View>
    <Text style={styles.friendName}>{props.name}</Text>
  </TouchableOpacity>
);

const Friends = props => {
  let data;
  if (props.friends.length <= 6) {
    data = props.friends;
  } else {
    data = props.friends.slice(0, 6);
  }
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Tile photo_url={item.photo_url} name={item.firstname + " " + item.lastname} email={item.email} />
      )}
      horizontal={true}
      style={styles.scrollContainer}
      keyExtractor={item => item.email}
      
    />
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginVertical: 4
  },
  tileContainer: {
    margin: 8,
    flexWrap: "wrap",
    alignItems: "center",
  },
  friendImageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: "white",
    borderRadius: 4
  },
  friendImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  friendName: {
    textAlign: "center",
    fontFamily: "Rubik-Medium"
  },
  seelAllButton: {
    padding: 8,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6
  },
  buttonLabel: {
    color: "white",
    fontFamily: "Rubik-Medium"
  }
});

export default Friends;
