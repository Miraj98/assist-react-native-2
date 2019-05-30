import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

function SelectCommunityPill({ currentCommunitySelected, selectCommunityScreen }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.pill}
                onPress={selectCommunityScreen}
            >
                <Text style={styles.pillText}>{currentCommunitySelected}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default SelectCommunityPill