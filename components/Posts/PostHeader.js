import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

function PostHeader({ author, time, goToProfile }) {
    return (
        <TouchableOpacity
            onPress={goToProfile}
            style={styles.container}>
            <FastImage
                source={require('../../assets/avatar1.png')}
                style={styles.avatar}
            />
            <View>
                <Text style={styles.author}>{author}</Text>
                <Text style={styles.timestamp}>{time}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8
    },
    author: {
        fontWeight: 'bold',
        fontSize: 16
    },
    avatar: {
        height: 40,
        width: 40,
        margin: 4
    },
    timestamp: {
        fontSize: 10,
        color: '#424242'
    }
})

export default PostHeader