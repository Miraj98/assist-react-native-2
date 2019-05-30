import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

function Send({ newPostRequest, post_title, post_text, community, shareOptions, isPosting, navigateBack }) {
    return (
        <TouchableOpacity
            onPress={() => {
                newPostRequest(post_title, post_text, community, shareOptions === 'Public' ? 'True': 'False')
                navigateBack()
            }}
            style={styles.container}>
            <Text style={styles.buttonLabel}>{isPosting === true ? 'Posting...' : 'Send'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        backgroundColor: 'black',
        // width: 75,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12
    },
    buttonLabel: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16
    }
})

export default Send