import React from "react";
import { View, Text, FlatList, StyleSheet, Keyboard, Animated } from "react-native";
import { connect } from "react-redux";
import Card from "../components/Card";
import { requestCommentsFromApi } from "../../actions/posts/comments";
import CommentTextInput from "../components/CommentTextInput";

const renderHeader = _props => {
  return (
    <View>
    <Card
      type="POST"
      profile_photo_url={_props.profile_photo_url}
      author={_props.user_name}
      timestamp={_props.pub_timestamp}
      title={_props.post_title}
      content={_props.post_text}
      photo_url={_props.photo_url}
      navigateToComments={() => null}
      id={_props.id}
      captionId={_props.captionId}
    />
    <View style={{ width: "100%", padding: 8 }}>
      <Text style={{ fontFamily: "Rubik-Medium", fontSize: 12,  color:"#616161" }}>COMMENTS</Text>
    </View>
    </View>
  );
};

const renderItem = (focusCommentTextInput, item) => {
  return (
    <Card
      type="COMMENT"
      focusCommentTextInput={focusCommentTextInput}
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

class Comments extends React.Component {
  state = {
    textInputBoxHeight: new Animated.Value(85),
    keyboardHeight: new Animated.Value(0),
    unAnimatedKeyboardHeight: 0,
    parent_comment_id: null
  };

  static navigationOptions = {
    headerTintColor: 'black'
  }

  setCommentInputRef = (textInput) => {
    this.commentInput = textInput;
  }

  focusCommentTextInput = (parent_comment_id) => {
    this.commentInput.focus();
    this.setState({ parent_comment_id });
  }

  onCommentInputBlurred = () => {
    this.setState({ parent_comment_id: null });
  }

  componentDidMount() {
    this.props.requestCommentsFromApi(this.props.navigation.getParam("id"));
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.onKeyboardShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.onKeyboardHide
    );
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this.willKeyboardShow
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this.willKeyboardHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
    this.keyboardDidShowListener.remove();
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  willKeyboardShow = event => {
    this.setState({ unAnimatedKeyboardHeight: event.endCoordinates.height });
    Animated.timing(this.state.keyboardHeight, {
      duration: event.duration,
      toValue: event.endCoordinates.height
    }).start();
  };

  willKeyboardHide = event => {
    this.setState({ unAnimatedKeyboardHeight: 0 });
    Animated.timing(this.state.keyboardHeight, {
      duration: event.duration,
      toValue: 0
    }).start();
  };

  updateTextInputBoxHeight = ({
    nativeEvent: {
      layout: { height: textInputBoxHeight }
    }
  }) => {
    Animated.timing(this.state.textInputBoxHeight, {
      toValue: textInputBoxHeight + this.state.unAnimatedKeyboardHeight
    }).start();
  };

  render() {
    const data = this.props.commentIds
      .map(id => this.props.commentById[id])
      .filter(comment => comment.parent_comment_id === null);
    return (
      <React.Fragment>
        <Animated.View
          style={[
            styles.listContainer,
            { marginBottom: this.state.textInputBoxHeight }
          ]}
        >
          <FlatList
            data={data}
            renderItem={({ item }) => renderItem(this.focusCommentTextInput, item)}
            keyExtractor={keyExtractor}
            ListHeaderComponent={() =>
              renderHeader({
                ...this.props.post,
                captionId: this.props.navigation.getParam("captionId"),
                id: this.props.navigation.getParam("id")
              })
            }
            // ListHeaderComponentStyle={{ marginBottom: 12 }}
            style={styles.listContainer}
            refreshing={this.props.isFetchingComments}
            onRefresh={() =>
              this.props.requestCommentsFromApi(
                this.props.navigation.getParam("id")
              )
            }
          />
        </Animated.View>
        <CommentTextInput
          setCommentInputRef={this.setCommentInputRef}
          parent_comment_id={this.state.parent_comment_id}
          onCommentInputBlurred={this.onCommentInputBlurred}
          post_id={this.props.navigation.getParam("id")}
          bottom={this.state.keyboardHeight}
          onLayout={this.updateTextInputBoxHeight}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  post:
    state.posts.captions.byId[props.navigation.getParam("captionId")] ===
    undefined
      ? {}
      : state.posts.captions.byId[props.navigation.getParam("captionId")]
          .postcaption_content,
  isFetchingComments: state.isFetching.comments,
  commentIds:
    state.posts.comments.mapPostToComments[props.navigation.getParam("id")] ||
    [],
  commentById: state.posts.comments.byId
});
const mapDispatchToProps = { requestCommentsFromApi };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#eeeeee"
  }
});
