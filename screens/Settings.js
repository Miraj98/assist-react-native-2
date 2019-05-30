import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import SettingPanel from '../components/Settings/SettingPanel'

class Settings extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Settings</Text>
                <SettingPanel label='Edit Profile' icon='account-edit' />
                <SettingPanel label='Assist Web' icon='qrcode-scan' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 48,
        marginBottom: 48
    }
})

export default Settings