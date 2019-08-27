import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { postReactionToApi } from "../../actions/posts/reactions";
import { handleVotes } from "../utils/CardUtils";

function PostActions(props) {
  return (
    <View style={styles.actions}>
      <View style={styles.votes}>
        <TouchableOpacity
          onPress={() => {
            handleVotes(
              1,
              props.self_vote,
              props.likes,
              props.post_id,
              props.caption_id,
              props.postReactionToApi
            )
          }}
        >
          <Icon
            name={
              props.self_vote === 1 ? "arrow-up-bold" : "arrow-up-bold-outline"
            }
            size={20}
            color={props.self_vote === 1 ? "green" : "black"}
          />
        </TouchableOpacity>
        <Text style={styles.votenumber}>{props.likes}</Text>
        <TouchableOpacity
          onPress={() => {
            handleVotes(
              -1,
              props.self_vote,
              props.likes,
              props.post_id,
              props.caption_id,
              props.postReactionToApi
            )
          }}
        >
          <Icon
            name={
              props.self_vote === -1
                ? "arrow-down-bold"
                : "arrow-down-bold-outline"
            }
            size={20}
            color={props.self_vote === -1 ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() =>
          props.navigateToComments(props.post_id, props.caption_id)
        }
        style={styles.commentContainer}
      >
        <Icon color="black" name="comment-text-multiple-outline" size={20} />
        <Text style={styles.comment}>
          {props.num_of_comments === 0 ? "Comment" : props.num_of_comments}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon color="black" name="share-outline" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const mapDispatchToProps = {
  postReactionToApi
};

const mapStateToProps = (state, props) => ({
  likes: state.posts.captions.byId[props.caption_id].postcaption_content.likes,
  self_vote:
    state.posts.captions.byId[props.caption_id].postcaption_content.self_vote,
  num_of_comments:
    state.posts.captions.byId[props.caption_id].postcaption_content
      .comments_number
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostActions);

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16
  },
  votes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  votenumber: {
    marginHorizontal: 24,
    fontFamily: "Rubik-Regular",
    color: "black"
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  comment: {
    marginLeft: 8,
    fontFamily: "Rubik-Regular",
    color: "black"
  }
});
