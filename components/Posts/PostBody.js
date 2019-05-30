import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import LinkPreview from './LinkPreview'

function PostBody({ title, content, linkPreview }) {
    return (
        <View style={styles.container}>
            <Text style={styles.postTitle}>{title}</Text>
            <Hyperlink linkDefault={true} linkStyle={styles.linkStyle}>
                <Text>{content}</Text>
            </Hyperlink>
            <LinkPreview linkPreview={linkPreview} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        marginLeft: 44
    },
    postTitle: {
        fontWeight: 'bold'
    },
    linkStyle: {
        color: '#2980b9'
    }
})

export default PostBody