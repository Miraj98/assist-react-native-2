import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

function SettingPanel({ label, icon, screen }) {
    return (
        <TouchableOpacity style={styles.container}>
            <Icon name={icon} size={24} />
            <Text style={styles.labelStyle}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    container: {
        width: '100%',
        padding: 12,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 6
    },
    labelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8
    }
})

export default SettingPanel