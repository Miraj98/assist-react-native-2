import React from "react";
import { View, StyleSheet } from "react-native";
import Action from "./Action";
import { connect } from "react-redux";

const ProfileActions = ({
  email,
  friend,
  message,
  hangout,
  phone,
  friendRequest,
  hangoutRequest,
  messageRequest
}) => {
  return (
    <View style={styles.actionContainer}>
      <Action
        requestState={friendRequest[email] || false}
        state={friend}
        email={email}
        phone={null}
        name="addFriend"
      />
      <Action
        requestState={hangoutRequest[email] || false}
        state={hangout}
        email={email}
        phone={null}
        name="hangout"
      />
      <Action
        requestState={messageRequest[email] || false}
        state={message}
        email={email}
        phone={phone}
        name="chat"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 8,
    backgroundColor: "white",
    marginBottom: 6
  }
});

const mapStateToProps = (state, props) => ({
  friend:
    state.people.relationships.byEmail[props.email] === undefined
      ? false
      : state.people.relationships.byEmail[props.email].friend,
  message:
    state.people.relationships.byEmail[props.email] === undefined
      ? false
      : state.people.relationships.byEmail[props.email].message,
  hangout:
    state.people.relationships.byEmail[props.email] === undefined
      ? false
      : state.people.relationships.byEmail[props.email].hangout,
  friendRequest: state.people.relationships.friendRequest,
  messageRequest: state.people.relationships.messageRequest,
  hangoutRequest: state.people.relationships.hangoutRequest
});

export default connect(mapStateToProps)(ProfileActions);
