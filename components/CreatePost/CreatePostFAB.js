import React from 'react'
import { FAB } from 'react-native-paper'
import { StyleSheet } from 'react-native'

function CreatePostFAB({ createpostScreen }) {
    return (
        <FAB
            style={styles.fab}
            icon='create'
            onPress={createpostScreen}
            color='white'
        />
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 16,
        backgroundColor: 'black'
    }
})

export default CreatePostFAB