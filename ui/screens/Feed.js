import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { requestCaptionsFromApi } from "../../actions/posts/captions";
import Card from "../components/Card";
import FeedHeader from "../components/FeedHeader";

const renderItem = (item, navigateToComments, navigateToProfile) => {
  const _props = item.postcaption_content;
  if (_props === null) return null;
  else {
    return (
      <Card
        type="POST"
        profile_photo_url={_props.profile_photo_url}
        email={_props.user_email}
        author={_props.user_name}
        timestamp={_props.pub_timestamp}
        title={_props.post_title}
        content={_props.post_text}
        photo_url={_props.photo_url}
        navigateToComments={navigateToComments}
        navigateToProfile={navigateToProfile}
        id={item.content_id}
        captionId={item.id}
      />
    );
  }
};

const keyExtractor = item => `${item.id}`;

class Feed extends React.Component {
  componentDidMount() {
    this.props.requestCaptionsFromApi();
  }

  navigateToComments = (id, captionId) => {
    this.props.navigation.navigate("Comments", { id, captionId });
  };

  navigateToProfile = (email) => {
    this.props.navigation.navigate("Profile", { email });
  }

  render() {
    const { allIds, byId } = this.props.captions;
    const data = allIds.map(id => byId[id]);
    return (
      <FlatList
        data={data}
        ListHeaderComponent={() => <FeedHeader/>}
        renderItem={({ item }) => renderItem(item, this.navigateToComments, this.navigateToProfile)}
        keyExtractor={keyExtractor}
        onRefresh={this.props.requestCaptionsFromApi}
        refreshing={this.props.isFetchingCaptions}
        style={styles.feedContainer}
      />
    );
  }
}

const mapStateToProps = state => ({
  captions: state.posts.captions,
  isFetchingCaptions: state.isFetching.captions
});
const mapDispatchToProps = {
  requestCaptionsFromApi
};

const styles = StyleSheet.create({
  feedContainer: {
    flex: 1,
    backgroundColor: "#eeeeee"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
