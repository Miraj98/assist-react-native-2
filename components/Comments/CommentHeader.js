import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

function CommentHeader({ user_name }) {
    return (
        <View style={styles.container}>
            <FastImage
                source={require('../../assets/avatar1.png')}
                style={styles.avatar}
            />
            <Text style={styles.username}>{user_name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        height: 38,
        width: 38,
        margin: 6
    },
    username: {
        fontWeight: 'bold'
    }
})

export default CommentHeader