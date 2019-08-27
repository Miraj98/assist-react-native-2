import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Easing } from "react-native";
import FastImage from "react-native-fast-image";
import PropTypes from "prop-types";
import PostActions from "./PostActions";
import Replies from "./Replies";
import { calculateTime } from "../utils/CardUtils";
import LinkPreview from "./LinkPreview";
import ReplyActions from "./ReplyActions";
import NotifActions from "./NotifActions";

const Author = props => {
  if (props.author !== undefined) {
    const timestamp = calculateTime(props.timestamp);
    return (
      <TouchableOpacity onPress={props.navigateToProfile} style={styles.authorContainer}>
        <Text style={styles.author}>{props.author}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

const Content = props => {
  if (props.title === undefined && props.content === undefined) return null;
  else
    return (
      <View>
        {props.title !== undefined &&
        props.title !== "null" &&
        props.title !== "" ? (
          <Text style={styles.title}>{props.title}</Text>
        ) : null}
        {props.content !== undefined ? (
          <Text style={styles.content}>{props.content}</Text>
        ) : null}
        {props.photo_url !== null &&
        props.photo_url !== "null" &&
        props.photo_url !== undefined ? (
          <TouchableOpacity>
            <FastImage
              style={styles.contentImage}
              source={{ uri: props.photo_url }}
            />
          </TouchableOpacity>
        ) : null}
        {props.type === "POST" ? (
          <LinkPreview post_text={props.content} post_id={props.post_id} />
        ) : null}
      </View>
    );
};

function Card(props) {
  const image =
    props.profile_photo_url === null
      ? require("../../assets/avatar1.png")
      : { uri: props.profile_photo_url };
  return (
    <View style={[styles.parentContainer, { borderBottomWidth: props.type === "NOTIFICATION" ? 0 : StyleSheet.hairlineWidth }]}>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.imageContainer}>
          <FastImage style={[styles.defaultImageStyle]} source={image} />
        </TouchableOpacity>
        <View style={styles.body}>
          <Author navigateToProfile={() => props.navigateToProfile(props.email)} author={props.author} timestamp={props.timestamp} />
          <Content
            title={props.title}
            content={props.content}
            photo_url={props.photo_url}
            type={props.type}
            post_id={props.id}
          />
          {props.type === "POST" ? (
            <PostActions
              navigateToComments={props.navigateToComments}
              post_id={props.id}
              caption_id={props.captionId}
            />
          ) : null}
          {props.type === "COMMENT" ? (
            <ReplyActions parent_comment_id={props.id} focusCommentTextInput={props.focusCommentTextInput} />
          ) : null}
          {props.type === "NOTIFICATION" ? (
            <NotifActions
              accepted={props.accepted}
              action={props.action}
              postAcceptRequest={() => props.postAcceptRequest(props.id)}
              ignoreNotif={() => props.ignoreNotif(props.id)}
            />
          ) : null}
        </View>
      </View>
      <Replies type={props.type} replies_array={props.replies_array} />
    </View>
  );
}

Card.propTypes = {
  profile_photo_url: PropTypes.string,
  photo_url: PropTypes.string,
  author: PropTypes.string,
  timestamp: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  captionId: PropTypes.number
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#bdbdbd",
    paddingBottom: 8
  },
  cardContainer: {
    flex: 1,
    padding: 8,
    paddingBottom: 0,
    flexDirection: "row",
    backgroundColor: "white"
  },
  imageContainer: {
    padding: 4
  },
  defaultImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  body: {
    padding: 4,
    marginLeft: 8,
    flex: 1,
    flexWrap: "wrap"
  },
  authorContainer: {
    flex: 1,
    marginBottom: 8
  },
  author: {
    // fontWeight: "bold",
    fontFamily: "Roboto-Bold",
    color: "black"
  },
  timestamp: {
    fontSize: 10,
    fontFamily: "Roboto-Bold",
    color: "#424242"
  },
  title: {
    // fontWeight: "bold",
    fontFamily: "Roboto-Bold",
    marginBottom: 2,
    color: "black",
    fontSize: 15
  },
  contentImage: {
    flex: 1,
    height: 240,
    borderRadius: 4
  },
  replyButtonContainer: {
    flexDirection: "row",
    marginTop: 4
  },
  replyButtonLabel: {
    fontSize: 12,
    marginRight: 8,
    color: "#757575"
  },
  content: {
    fontFamily: "Roboto-Regular",
    color: "black",
    fontSize: 15
  }
});

export default Card;
