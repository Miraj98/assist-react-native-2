import MainStack from './MainStack'
import { createSwitchNavigator } from 'react-navigation'

const AppRoutes = {
    MainStack
}

export default createSwitchNavigator(AppRoutes, {
    initialRouteName: 'MainStack'
})