import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  FlatList
} from "react-native";
import FastImage from "react-native-fast-image";

const INTEREST_TILE_WIDTH = (Dimensions.get("window").width - 24) / 3;

const Tile = props => (
  <TouchableOpacity style={styles.tileContainer}>
    <FastImage
      style={styles.friendImage}
      source={
        props.photo_url === null || props.photo_url === "null"
          ? require("../../../assets/avatar1.png")
          : { uri: props.photo_url }
      }
    />
    <Text style={styles.friendName}>{props.name}</Text>
  </TouchableOpacity>
);

const Interests = props => {
  let data;
  if (props.friends.length <= 6) {
    data = props.friends;
  } else {
    data = props.friends.slice(0, 6);
  }
  return (
    // <View style={{ flex: 1 }}>
    //   {
    //     props.friends.length > 6 ? (
    //       <TouchableOpacity style={styles.seelAllButton}>
    //         <Text style={styles.buttonLabel}>See all</Text>
    //       </TouchableOpacity>
    //     ) : null
    //   }
    // </View>
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Tile photo_url={item.photo_url} name={item.firstname + " " + item.lastname} email={item.email} />
      )}
      numColumns={3}
      style={styles.scrollContainer}
      keyExtractor={item => item.email}
      ListFooterComponent={() => {
        if(props.friends.length > 6) {
          return (
            <TouchableOpacity style={styles.seelAllButton}>
              <Text style={styles.buttonLabel}>See all</Text>
            </TouchableOpacity>
          );
        } else {
          return null;
        }
      }}
      ListFooterComponentStyle={{ margin: 8 }}
    />
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginVertical: 4
  },
  tileContainer: {
    width: INTEREST_TILE_WIDTH,
    flexWrap: "wrap"
  },
  friendImage: {
    flex: 1,
    height: 120,
    borderRadius: 8
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

export default Interests;
