import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Card from "./Card";

const renderItem = ({ item }) => {
  // console.log(item)
  return (
    <Card
      type="COMMENT"
      author={item.user_name}
      timestamp={item.pub_timestamp}
      content={item.comment}
      replies_array={item.replies_array}
      profile_photo_url={item.profile_photo_url}
      id={item.id}
    />
  );
};
const keyExtractor = item => `${item.id}`;

function Replies(props) {
  if (props.type === "COMMENT") {
    if (props.replies_array.length !== 0) {
      let data = props.replies_array.map(reply => props.commentsById[reply]).filter(reply => reply !== undefined);
      return (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.listContainer}
        />
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}

const mapStateToProps = state => ({
  commentsById: state.posts.comments.byId
});

export default connect(mapStateToProps)(Replies);

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#0288d1",
    marginLeft: 33
  }
});
