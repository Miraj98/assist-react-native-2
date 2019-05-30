import Loading from '../screens/Loading'
import MainStack from './MainStack'
import { createSwitchNavigator } from 'react-navigation'

const AppRoutes = {
    Loading,
    MainStack
}

export default createSwitchNavigator(AppRoutes, {
    initialRouteName: 'MainStack'
})