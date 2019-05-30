import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native'
import FastImage from 'react-native-fast-image'

function LinkPreview({ linkPreview }) {
    if(linkPreview !== null && linkPreview.title !== undefined && linkPreview.description !== undefined && linkPreview.images.length !== 0) {
        return (
            <TouchableOpacity
                onPress={() => Linking.openURL(linkPreview.url)}
                style={styles.container}
            >
                <FastImage
                    source={{ uri: linkPreview.images[0], priority: FastImage.priority.high }}
                    style={styles.previewImage}
                />
                <Text numberOfLines={1} style={styles.linkPreviewTitle}>{linkPreview.title}</Text>
                <Text numberOfLines={3} style={styles.linkPreviewDescription}>{linkPreview.description}</Text>
            </TouchableOpacity>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 240,
        borderRadius: 6,
        marginTop: 12,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5'
    },
    previewImage: {
        flex: 1,
        height: '85%'
    },
    linkPreviewTitle: {
        margin: 8,
        marginBottom: 0,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#424242'
    },
    linkPreviewDescription: {
        margin: 8,
        fontSize: 12,
        color: '#616161'
    }
})

export default LinkPreview