import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import Feed from '../ui/screens/Feed'

const AppRoutes = {
    Feed,
}

Feed.navigationOptions = {
    tabBarIcon: ({ tintColor }) => ( <Icon name='ios-paper' size={24} color={tintColor} style={{paddingTop: 2.5}}/> ),
    tabBarColor: '#fafafa'
}

export default createBottomTabNavigator(AppRoutes, {
    initialRouteName: 'Feed',
    shifting: true,
    activeTintColor: 'black',
    inactiveTintColor: 'rgb(142, 142, 147)'
})