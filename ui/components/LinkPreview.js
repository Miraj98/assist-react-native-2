import React from "react";
import { TouchableOpacity, StyleSheet, Text, Linking } from "react-native";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import { requestLinkPreviewsFromApi } from "../../actions/posts/linkpreviews";

function LinkPreview(props) {
  props.requestLinkPreviewsFromApi(props.post_id, props.post_text);
  if (
    props.linkpreview !== undefined &&
    props.linkpreview.images.length !== 0 &&
    props.linkpreview.description !== undefined &&
    props.linkpreview.title !== undefined
  ) {
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(props.linkpreview.url)}
        style={styles.container}
      >
        <FastImage
          style={styles.linkPreviewImage}
          source={{ uri: props.linkpreview.images[0] }}
        />
        <Text style={styles.title} numberOfLines={1}>
          {props.linkpreview.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {props.linkpreview.description}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 240,
    marginTop: 8,
    overflow: "hidden",
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black'
  },
  linkPreviewImage: {
    height: "67.5%"
  },
  title: {
    margin: 8,
    marginBottom: 4,
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    color: "black"
  },
  description: {
    fontSize: 12,
    marginHorizontal: 8,
    fontFamily: "Rubik-Regular",
  }
});

const mapStateToProps = (state, props) => ({
  linkpreview: state.posts.linkpreviews[props.post_id]
});

const mapDispatchToProps = {
  requestLinkPreviewsFromApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkPreview);
