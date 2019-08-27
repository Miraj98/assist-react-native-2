import React from "react";
import { SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class Email extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
      </SafeAreaView>
    ); 
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  signInButton: {
    height: 48,
    width: 192,
    borderRadius: 8
  }
});
export default Email;