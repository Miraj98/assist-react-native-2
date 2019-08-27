import React, { useState } from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import { postNewCommentToApi } from "../../actions/posts/comments";

function CommentTextInput(props) {
  const [comment, setComment] = useState('');
  return (
    <Animated.View
      onLayout={props.onLayout}
      style={[styles.container, { bottom: props.bottom, paddingBottom: 8 }]}
    >
      <SafeAreaView style={styles.safeArea}>
        <FastImage
          source={require("../../assets/avatar1.png")}
          style={styles.avatar}
        />
        <TextInput
          ref={textInput => props.setCommentInputRef(textInput)}
          value={comment}
          onBlur={props.onCommentInputBlurred}
          onChangeText={setComment}
          placeholder="Write a comment"
          style={styles.textInput}
          multiline
        />
        {props.isPostingComment ? (
          <ActivityIndicator/>
        ) : (
          <TouchableOpacity
            onPress={() => props.postNewCommentToApi(props.post_id, comment, props.parent_comment_id)}
          >
            <Icon name="send-o" size={24} />
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </Animated.View>
  );
}

const mapStateToProps = (state) => ({
  isPostingComment: state.isPosting.comments
})

const mapDispatchToProps = {
  postNewCommentToApi
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentTextInput);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: 0,
    paddingTop: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1,
    minHeight: 85
  },
  safeArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 8
  },
  textInput: {
    flex: 1,
    backgroundColor: "#eeeeee",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
    fontFamily: "Rubik"
  }
});
