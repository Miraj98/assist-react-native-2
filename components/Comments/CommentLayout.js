import React from 'react'
import { View, StyleSheet } from 'react-native'
import CommentHeader from './CommentHeader'
import CommentBody from './CommentBody'

function CommentLayout({ comment, user_name }) {
    return (
        <View style={styles.container}>
            <CommentHeader user_name={user_name} />
            <CommentBody comment={comment} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 8,
        minHeight: 80,
        marginBottom: 2,
        backgroundColor: 'white'
    }
})

export default CommentLayout