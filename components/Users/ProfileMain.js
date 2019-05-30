import React from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import Avatar from './Avatar'
import ProfileActions from './ProfileActions'

const SCREEN_HEIGHT = Dimensions.get('window').height

function ProfileMain() {
    return (
        <View style={styles.container}>
            <Avatar/>
            <ProfileActions/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 24
    }
})

export default ProfileMain