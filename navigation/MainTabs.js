import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Feed from '../screens/Feed'
import Communities from '../screens/Communities'
import People from '../screens/People'
import Settings from '../screens/Settings'

const AppRoutes = {
    Communities,
    Feed,
    People,
    Settings
}

Communities.navigationOptions = {
    tabBarIcon: ({ tintColor }) => ( <Icon name='ios-people' size={24} color={tintColor} style={{paddingTop: 2.5}}/> ),
    tabBarColor: '#fafafa'
}

People.navigationOptions = {
    tabBarIcon: ({ tintColor }) => ( <Icon name='ios-contacts' size={24} color={tintColor} style={{paddingTop: 2.5}}/> ),
    tabBarColor: '#fafafa'
}

Feed.navigationOptions = {
    tabBarIcon: ({ tintColor }) => ( <Icon name='ios-paper' size={24} color={tintColor} style={{paddingTop: 2.5}}/> ),
    tabBarColor: '#fafafa'
}

Settings.navigationOptions = {
    tabBarIcon: ({ tintColor }) => ( <Icon name='ios-cog' size={24} color={tintColor} style={{paddingTop: 2.5}}/> ),
    tabBarColor: '#fafafa'
}

export default createMaterialBottomTabNavigator(AppRoutes, {
    initialRouteName: 'Feed',
    shifting: true,
    activeTintColor: 'black',
    inactiveTintColor: 'rgb(142, 142, 147)'
})