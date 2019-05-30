import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import Config from './Config'
import SelectCommunityPill from './SelectCommunityPill'

function Header({ updateShareOptions, currentShareOption, community, selectCommunityScreen, updateCommunitySelected }) {
    return (
        <View style={styles.container}>
            <FastImage
                source={require('../../assets/miraj.jpg')}
                style={styles.avatar}
            />
            <View>
                <Text style={styles.username}>Miraj Shah</Text>
                <View style={styles.config}>
                    <View>
                        <Config
                            updateShareOptions={updateShareOptions}
                            currentShareOption={currentShareOption}
                        />
                    </View>
                    {
                        currentShareOption === 'Community' ? <View><SelectCommunityPill
                            currentCommunitySelected={community}
                            // updateCommunitySelected={updateCommunitySelected}
                            selectCommunityScreen={selectCommunityScreen}
                        /></View> : null
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 12
    },
    config: {
        flexDirection: 'row',
    }
})

export default Header