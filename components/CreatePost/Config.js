import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import ActionSheet from 'react-native-actionsheet'

const options = ['Public', 'Friends', 'Community', 'Cancel']

function Config({ updateShareOptions, currentShareOption }) {

    let _actionsheet

    const showActionSheet = () => {
        _actionsheet.show()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.pill}
                onPress={showActionSheet}
            >
                <Text style={styles.pillText}>{currentShareOption}</Text>
            </TouchableOpacity>
            <ActionSheet
                ref={actionsheet => _actionsheet = actionsheet}
                title='Select sharing option'
                options={options}
                cancelButtonIndex={3}
                onPress={index => updateShareOptions(options[index])}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 6,
    },
    pill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: '#eeeeee',
        alignItems: 'center'
    },
    pillText: {
        fontWeight: 'bold',
        fontSize: 12
    }
})

export default Config