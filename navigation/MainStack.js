import { createStackNavigator } from "react-navigation";
import MainTabs from "./MainTabs";
import Comments from "../ui/screens/Comments";
import Profile from "../ui/screens/Profile";
// import React from "react";
// import { Text, Platform } from "react-native";

const AppRoutes = {
  MainTabs,
  Comments,
  Profile
};

MainTabs.navigationOptions = {
  header: null
  // headerTitle: () => (
  //   <Text style={{ fontFamily: "Rubik-Medium", fontSize: 24, color: "black", marginLeft: Platform.OS === "android" ? 8 : 0 }}>Assist</Text>
  // ),
  // headerTitleStyle: {
  //   color: "black"
  // },
  // headerStyle: {
  //   backgroundColor: "#fafafa"
  // }
};

export default createStackNavigator(AppRoutes);
