import { createStackNavigator } from 'react-navigation'
import MainTabs from './MainTabs'

const AppRoutes = {
    MainTabs
}

MainTabs.navigationOptions = {
 
    headerTitle: "Assist",
    headerTitleStyle: {
        color: 'black'
    },
    headerStyle: {
        backgroundColor: '#fafafa'
    },
}

export default createStackNavigator(AppRoutes)