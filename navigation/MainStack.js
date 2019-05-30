import { createStackNavigator } from 'react-navigation'
import MainTabs from './MainTabs'
import CompletePost from '../screens/CompletePost'
import Profile from '../screens/Profile'
import CreatePost from '../screens/CreatePost'
import SelectCommunityScreen from '../components/CreatePost/SelectCommunityScreen'

const AppRoutes = {
    MainTabs,
    CompletePost,
    Profile,
    CreatePost,
    SelectCommunityScreen
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