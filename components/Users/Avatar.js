import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

function Avatar() {
    return (
        <View style={styles.container}>
            <FastImage
                style={styles.avatarprofile}
                source={require('../../assets/miraj.jpg')}/>
            <Text style={styles.name}>Miraj Shah</Text>
            <Text style={styles.about}>Hello Assist, Hit me up!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 36,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    avatarprofile: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 24
    },
    about: {
        marginTop: 8,
        fontSize: 18
    }
})

export default Avatar