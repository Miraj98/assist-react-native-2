import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { createSwitchNavigator } from "react-navigation";

const AppRoutes = {
  AuthStack,
  MainStack
};

export default createSwitchNavigator(AppRoutes, {
  initialRouteName: "AuthStack"
});
