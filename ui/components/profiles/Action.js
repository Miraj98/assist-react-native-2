import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Linking,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { postRequestNotification } from "../../../actions/people/relationships";

const getPath = (name, state, requestState) => {
  if (name === "chat") return require("../../../assets/chat.png");
  else if (name === "addFriend")
    return state
      ? require("../../../assets/green_friend_request_accepteded.png")
      : requestState
      ? require("../../../assets/green_friend_requested.png")
      : require("../../../assets/addFriend.png");
  else if (name === "hangout")
    return requestState
      ? require("../../../assets/blue_hangout_requested.png")
      : require("../../../assets/hangout.png");
};

const makeApiCall = (api, name, email, user_email, phone, state, user_name) => {
  if (name === "chat") {
    if (email === user_email)
      return alert(
        "Seriously man, you need to get over the habit of talking to yourself 😑"
      );
    return Linking.openURL(
      "http://api.whatsapp.com/send?phone=91" +
        phone.replace("+91", "") +
        "&text=Hi there!\n"
    );
  } else if (name === "addFriend") {
    if (user_email === email)
      return alert(
        "I know you are awesome, but you can't send friend request to yourself. Sorry 😛"
      );
    return state ? null : api(2, email);
  } else if (name === "hangout") {
    if (user_email === email)
      return alert(`Seriously ${user_name}. I am judging you 😒`);
    return state ? null : api(4, email);
  }
};

const actionLabel = (name, state, requestState) => {
  if (name === "chat") return "Chat";
  else if (name === "addFriend")
    return state ? "Friends" : requestState ? "Request sent" : "Add Friend";
  else if (name === "hangout")
    return state ? "Hangout" : requestState ? "Request sent" : "Let's hangout";
};

const Action = ({
  name,
  email,
  user_email,
  postRequestNotification,
  state,
  phone,
  requestState,
  user_name
}) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        onPress={() =>
          makeApiCall(
            postRequestNotification,
            name,
            email,
            user_email,
            phone,
            state,
            user_name
          )
        }
        style={styles.container}
      >
        <Image
          style={{
            height: name === "hangout" ? 68 : 60,
            width: name === "hangout" ? 68 : 60
          }}
          source={getPath(name, state, requestState)}
        />
      </TouchableOpacity>
      <Text style={styles.label}>{actionLabel(name, state, requestState)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontFamily: "Rubik-Medium",
    marginTop: 6
  },
  icon: {
    height: 60,
    width: 60
  }
});

const mapStateToProps = state => ({
  user_email: "f20170635@pilani.bits-pilani.ac.in",
  user_name: "Miraj Shah"
});

const mapDispatchToProps = {
  postRequestNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);
