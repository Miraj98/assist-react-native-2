import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ProfileMain from '../components/Users/ProfileMain'
import Section from '../components/Users/Section'

class Profile extends React.Component {

    static navigationOptions = { 
        headerTintColor: 'black',
        headerStyle: {
            borderBottomColor: 'white',
            shadowColor: 'transparent'
        }
    }

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <ProfileMain/>
                <Section name='Things I love talking about' />
                <Section name='Interests' />
                <Section name='Friends' />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#eeeeee'
    }
})

export default Profile