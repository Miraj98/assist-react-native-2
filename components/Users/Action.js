import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

function Action({name, label}) {
    return (
        <TouchableOpacity style={styles.container}>
            <Icon name={name} size={28} color='black' />
            {/* <Text style={styles.label}>{label}</Text> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: '#eeeeee',
    },
    label: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default Action