import React from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostActions from './PostActions'
import { requestLinkPreviewfromApi } from '../../redux/actions/Posts/LinkPreviews'
import { calculateTime } from '../../utils/PostUtils/CalculateTime'

class PostLayout extends React.Component {

    shouldComponentUpdate(newProps) {
        if(this.props.post.likes !== newProps.post.likes) return true
        else return false
    }

    componentDidMount() {
        this.props.requestLinkPreviewfromApi(this.props.post.id, this.props.post.post_text)
    }

    completePost = () => this.props.navigation.navigate('CompletePost', { id: this.props.post.id })

    render() {
        const { post: { post_title, post_text, user_name, likes, self_vote, id, pub_timestamp, comments_number }, linkPreview } = this.props
        return (
            <View style={styles.container}>
                <PostHeader goToProfile={this.props.goToProfile} author={user_name} time={calculateTime(pub_timestamp)} />
                <PostBody title={post_title} content={post_text} linkPreview={linkPreview} />
                <PostActions numOfComments={comments_number} likes={likes} selfVote={self_vote} id={id} completePost={this.completePost} />
            </View>
        )
    }
}

const mapStateToProps = (state, { id }) => ({
    post: state.posts.postsById[id],
    linkPreview: state.linkPreviews[id] || null
})
const mapDispatchToProps = {
    requestLinkPreviewfromApi
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 90,
        backgroundColor: 'white',
        borderBottomColor: '#757575',
        borderBottomWidth: StyleSheet.hairlineWidth
        // marginBottom: 2
    },
    author: {
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PostLayout)