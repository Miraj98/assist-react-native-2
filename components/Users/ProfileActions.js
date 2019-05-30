import React from 'react'
import { View, StyleSheet } from 'react-native'
import Action from './Action';

function ProfileActions() {
    return (
        <View style={styles.actionContainer}>
            <Action name='md-person-add' label='Add Friend'/>
            <Action name='md-chatbubbles' label='Chat Request' />
            <Action name='md-beer' label="Let's Hangout" />
        </View>
    )
}

const styles = StyleSheet.create({
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 24
    }
})

export default ProfileActions