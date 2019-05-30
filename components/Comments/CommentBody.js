import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Hyperlink from 'react-native-hyperlink'

function CommentBody({ comment }) {
    return (
        <Hyperlink linkStyle={styles.linkStyle} linkDefault={true}>
            <Text style={styles.commentStyle}>{comment}</Text>
        </Hyperlink>
    )
}

const styles = StyleSheet.create({
    commentStyle: {
        marginLeft: 48,
        marginBottom: 6
    },
    linkStyle: {
        color: '#2980b9'
    }
})

export default CommentBody
