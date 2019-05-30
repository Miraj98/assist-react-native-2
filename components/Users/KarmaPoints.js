import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function KarmaPoints() {
    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Text style={styles.karmaValue}>{1118}</Text>
            </View>
            <Text style={styles.label}>Karma Points</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
    },
    subcontainer: {
        padding: 12,
        backgroundColor: '#0277bd',
        borderRadius: 4,
        alignSelf: 'flex-start'
    },
    karmaValue: {
        fontSize: 36,
        fontWeight: '900',
        color: 'white'
    },
    label: {
        color: 'white',
        fontWeight: '900',
        marginTop: 4,
        marginLeft: 2
    }
})

export default KarmaPoints