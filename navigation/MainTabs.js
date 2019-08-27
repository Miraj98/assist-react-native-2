import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Feed from "../ui/screens/Feed";
import AllUsers from "../ui/screens/AllUsers";
import Notifications from "../ui/screens/Notifications";

const AppRoutes = {
  Feed,
  "All users": AllUsers,
  Notifications
};

Feed.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon
      name="ios-paper"
      size={24}
      color={tintColor}
      style={{ paddingTop: 2.5 }}
    />
  ),
  tabBarColor: "#fafafa",
};

AllUsers.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon
      name="ios-contacts"
      size={24}
      color={tintColor}
      style={{ paddingTop: 2.5 }}
    />
  ),
  tabBarColor: "#fafafa"
};

export default createBottomTabNavigator(AppRoutes, {
  initialRouteName: "Feed",
  tabBarOptions: {
    activeTintColor: "black"
  },
  shifting: true,
  activeTintColor: "black",
  inactiveTintColor: "rgb(142, 142, 147)"
});
