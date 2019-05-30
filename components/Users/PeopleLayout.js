import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

class PeopleLayout extends React.Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
        const { firstname, lastname, about } = this.props
        return (
            <TouchableOpacity style={styles.container}>
                <FastImage
                    source={require('../../assets/avatar1.png')}
                    style={styles.avatar}
                />
                <View style={styles.details}>
                    <Text style={styles.username}>{firstname} {lastname}</Text>
                    <Text>{about}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: 2,
        height: 90
    },
    avatar: {
        height: 50,
        width: 50,
    },
    details: {
        paddingHorizontal: 8,
        justifyContent: 'space-around'
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default PeopleLayout