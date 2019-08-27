import React, { Component } from "react";
import store, { persistor } from "./state/store";
import { Provider } from "react-redux";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./navigation/AppNavigator";
import { PersistGate } from "redux-persist/integration/react";

const Assist = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Assist />
        </PersistGate>
      </Provider>
    );
  }
}
