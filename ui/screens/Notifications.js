import React from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import Card from "../components/Card";
import {
  postAcceptRequest,
  ignoreNotif,
  postMarkAsRead,
  requestNotificationsFromApi
} from "../../actions/notifications/notifications";

const NotifMapping = {
  2: "sent you a friend request.",
  "-2": "accepted your friend request. You can now see what they share with their friends",
  3: "sent you a message request.",
  "-3": "accepted your message request. You can now send them a message.",
  4: "sent you a hangout request.",
  "-4": "accepted your hangout request. You can now fix the time and place.",
  5: "upvoted your post.",
  "-5": "downvoted your post.",
  6: "is going to your event.",
  7: "commented on your post.",
  "-7": "replied to your comment"
};

const renderItem = (
  item,
  navigateToPost,
  navigateToProfile,
  postAcceptRequest,
  ignoreNotif
) => {
  return (
    <View style={styles.notifContainer}>
      <Card
        type="NOTIFICATION"
        action={item.action}
        id={item.id}
        author={item.actor_name}
        profile_photo_url={item.photo_url}
        timestamp={item.action_timestamp}
        content={NotifMapping[item.action]}
        accepted={item.accepted}
        postAcceptRequest={postAcceptRequest}
        ignoreNotif={ignoreNotif}
        email={item.actor_email}
        navigateToProfile={navigateToProfile}
      />
      {item.content1 !== null || item.content2 !== null ? (
        <TouchableOpacity
          onPress={() =>
            item.action === 6 || item.action === 11
              ? navigateToPost(item.object_id)
              : null
          }
          style={styles.notifContext}
        >
          {item.content1 === "" ? null : (
            <Text style={{ fontFamily: "Roboto-Medium" }} numberOfLines={2}>
              {item.content1 === "null" ? null : item.content1}
            </Text>
          )}
          {item.content2 === "" ? null : (
            <Text
              style={{ marginTop: 4, fontFamily: "Roboto" }}
              numberOfLines={2}
            >
              {item.content2 === "null" || item.content2 === ""
                ? null
                : item.content2}
            </Text>
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

class Notifications extends React.Component {
  state = {
    newlyReadNotifs: []
  };

  componentDidMount() {
    this.props.requestNotificationsFromApi();
    this._sub = this.props.navigation.addListener(
      "willBlur",
      this.componentWillBlur
    );
  }

  componentWillUnmount() {
    this._sub.remove();
  }

  componentWillBlur = () => {
    this.props.postMarkAsRead(this.state.newlyReadNotifs);
  };

  markAsRead = id => {
    this.setState(prevState => ({
      newlyReadNotifs: [...prevState.newlyReadNotifs, id]
    }));
  };

  navigateToProfile = email => {
    this.props.navigation.navigate("Profile", { email });
  };

  navigateToPost = post_id => {
    this.props.navigation.navigate("Comments", { post_id });
  };

  navigateToEventPage = id => {};

  render() {
    const data = this.props.notifIds.map(id => this.props.notifsById[id]);
    return (
      <FlatList
        data={data}
        renderItem={({ item }) =>
          renderItem(
            item,
            this.navigateToPost,
            this.navigateToProfile,
            this.props.postAcceptRequest,
            this.props.ignoreNotif
          )
        }
        keyExtractor={item => `${item.id}`}
        style={styles.scrollContainer}
      />
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  notifContext: {
    backgroundColor: "#eeeeee",
    padding: 8,
    borderRadius: 8,
    marginLeft: 76,
    marginRight: 8,
    marginBottom: 8
  },
  notifContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#bdbdbd"
  }
});

const mapStateToProps = state => ({
  notifIds: state.notifications.unseen,
  notifsById: state.notifications.byId
});

const mapDispatchToProps = {
  postAcceptRequest,
  ignoreNotif,
  postMarkAsRead,
  requestNotificationsFromApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
