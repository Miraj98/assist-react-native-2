import React from "react";
import {
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet
} from "react-native";

function NotifActions({
  action,
  ignoreNotif,
  acceptRequest,
  postAcceptRequest,
  accepted
}) {
  if (action > 0 && action < 5)
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => {
            if (accepted) return null;
            postAcceptRequest();
          }}
          style={styles.acceptContainer}
        >
          {acceptRequest !== undefined && acceptRequest.pending ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.accept}>
              {accepted ? "You accepted" : "Accept"}
            </Text>
          )}
        </TouchableHighlight>
        {accepted ? null : (
          <TouchableHighlight
            onPress={ignoreNotif}
            style={styles.ignoreContainer}
          >
            <Text style={styles.ignore}>Ignore</Text>
          </TouchableHighlight>
        )}
      </View>
    );
  else return null;
}

const styles = StyleSheet.create({
  container: {
    marginRight: 6,
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0
  },
  acceptContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0288d1",
    padding: 8,
    borderRadius: 6,
    marginRight: 6
  },
  ignoreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefef",
    padding: 8,
    borderRadius: 6
  },
  accept: {
    color: "white",
    fontWeight: "bold"
  },
  ignore: {
    fontWeight: "bold"
  }
});

export default NotifActions;
