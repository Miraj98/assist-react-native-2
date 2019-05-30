import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

function Upload() {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.upload}>
                <Icon name='ios-add-circle' size={30} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12
    },
})

export default Upload