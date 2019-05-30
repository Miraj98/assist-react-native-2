import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PostLayout from '../components/Posts/PostLayout'
import CommentLayout from '../components/Comments/CommentLayout'
import { requestPostByIdFromApi } from '../redux/actions/Posts/Comments'

const renderItem = ({ item }) => <CommentLayout {...item} />
const keyExtractor = (item) => `${item.id}`

class CompletePost extends React.PureComponent {

    componentDidMount() {
        this.props.requestPostByIdFromApi(this.props.navigation.getParam('id'))
    }

    render() {
        console.log(this.props.commentIds)
        const comments = this.props.commentIds.map(id => this.props.commentsById[id])
        return (
            <FlatList
                data={comments}
                ListHeaderComponent={<PostLayout id={this.props.navigation.getParam('id')} />}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                refreshing={this.props.isFetchingPostById}
                onRefresh={() => this.props.requestPostByIdFromApi(this.props.navigation.getParam('id'))}
                style={styles.container}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eeeeee'
    }
})

const mapStateToProps = (state, props) => ({
    commentIds: state.posts.postsById[props.navigation.getParam('id')].comments || [],
    commentsById: state.comments,
    isFetchingPostById: state.isFetching.postById,
})
const mapDispatchToProps = {
    requestPostByIdFromApi
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletePost)