import React from 'react'
import { View, TextInput, StyleSheet, ScrollView, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { newPostRequest } from '../redux/actions/Posts/CreatePost'
import Header from '../components/CreatePost/Header'
import Upload from '../components/CreatePost/Upload'
import Send from '../components/CreatePost/Send'

const FOOTER_HEIGHT = 80

class CreatePost extends React.Component {
    state = {
        shareOptions: 'Public',
        community: 'none',
        keyboardHeight: 0,
        post_title: '',
        post_text: ''
    }

    static navigationOptions = {
        headerTitle: 'Create Post'
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onKeyboardShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onKeyboardHide)
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove()
        this.keyboardDidShowListener.remove()
    }

    onKeyboardShow = (event) => {
        const keyboardHeight = event.endCoordinates.height
        this.setState(() => ({ keyboardHeight }))
    }

    onKeyboardHide = () => {
        this.setState(() => ({ keyboardHeight: 0 }))
    }

    updateShareOptions = (shareOptions) => {
        if(shareOptions === 'Cancel') return
        this.setState(() => ({ shareOptions }))
    }

    updateCommunitySelected = (community) => {
        this.setState(() => ({ community }))
    }

    render() {
        const { keyboardHeight } = this.state
        let isPosting = this.props.isPostingNewPost
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={scrollview => this.scrollview = scrollview}
                    onContentSizeChange={(width, height) => this.scrollview.scrollToEnd({ animated: true })}
                    style={[styles.scrollContainer, { marginBottom: FOOTER_HEIGHT + keyboardHeight }]}>
                    <Header
                        currentShareOption={this.state.shareOptions}
                        community={this.state.community}
                        updateShareOptions={this.updateShareOptions}
                        // updateCommunitySelected={this.updateCommunitySelected}
                        selectCommunityScreen={() => this.props.navigation.navigate('SelectCommunityScreen', { updateCommunitySelected: this.updateCommunitySelected })}
                    />
                    <TextInput
                        placeholder='Post title'
                        value={this.state.post_title}
                        onChangeText={post_title => this.setState(() => ({ post_title }))}
                        multiline={true}
                        style={{ padding: 12, flex: 1, fontSize: 18, fontWeight: 'bold' }}
                    />
                    <TextInput
                        placeholder='Post content'
                        value={this.state.post_text}
                        onChangeText={post_text => this.setState(() => ({ post_text }))}
                        multiline={true}
                        style={{ padding: 12, flex: 1, fontSize: 18 }}
                    />
                </ScrollView>
                <View style={[styles.footer, { marginBottom: keyboardHeight }]}>
                    <Upload/>
                    <Send
                        post_title={this.state.post_title}
                        post_text={this.state.post_text}
                        shareOptions={this.state.shareOptions}
                        community={this.state.community}
                        isPosting={isPosting}
                        navigateBack={() => setTimeout(() => this.props.navigation.goBack(), 1000)}
                        newPostRequest={this.props.newPostRequest} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: FOOTER_HEIGHT,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#9e9e9e',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    scrollContainer: {
        flex: 1,
    }
})

const mapStateToProps = (state) => ({
    isPostingNewPost: state.isPosting.post
})

const mapDispatchToProps = {
    newPostRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)