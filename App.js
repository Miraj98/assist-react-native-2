import React, {Component} from 'react'
import store, { persistor } from './redux/store/store'
import { Provider } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import AppNavigator from './navigation/AppNavigator'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as Paper } from 'react-native-paper'

const Assist = createAppContainer(AppNavigator)

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Paper>
                        <Assist/>
                    </Paper>
                </PersistGate>
            </Provider>
        )
      }
}
