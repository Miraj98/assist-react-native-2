import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

function CommunityOption({ name, onClick, goBack }) {
    return (
        <TouchableOpacity
            onPress={() => {
                onClick(name)
                goBack()
            }}
            style={styles.container}>
            <Text style={styles.community}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#757575'
    },
    community: {
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default CommunityOption