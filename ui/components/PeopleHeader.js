import React from "react";
import { View, SafeAreaView, TextInput, StyleSheet } from "react-native";

const PeopleHeader = props => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.topContainer}>

        <TextInput placeholderTextColor="#616161" placeholder="Post new message" style={styles.textInputStyle} />
        <View style={styles.action}>
          <View style={{ marginRight: 8 }}>
            <Icon name="settings" color="black" size={24} />
          </View>
          <View>
            <Icon name="camera" color="black" size={24} />
          </View>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Feed</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    flex: 1
  }
});

export default PeopleHeader;