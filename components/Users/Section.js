import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Section({ name }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        marginTop: 6,
        backgroundColor: 'white'
    },
    title: {
        fontWeight: '500',
        fontSize: 18
    }
})

export default Section