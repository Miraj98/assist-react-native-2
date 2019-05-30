import React from 'react'
import { View, FlatList, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PostLayout from '../components/Posts/PostLayout'
import { requestFeedFromApi } from '../redux/actions/Feed/FeedActions'
import CreatePostFAB from '../components/CreatePost/CreatePostFAB'

const generateId = (item) => `${item}`

class Feed extends React.PureComponent {

    componentDidMount() {
        this.props.requestFeedFromApi()
    }

    goToProfile = () => {
        this.props.navigation.navigate('Profile', { from: 'Feed' })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.feed}
                    keyExtractor={generateId}
                    removeClippedSubviews={Platform.OS === 'android' ? true : false}
                    style={styles.listStyle}
                    renderItem={({ item }) => <PostLayout id={item} goToProfile={this.goToProfile} navigation={this.props.navigation} />}
                    onRefresh={() => this.props.requestFeedFromApi()}
                    refreshing={this.props.isFetchingFeed}
                />
                <CreatePostFAB createpostScreen={() => this.props.navigation.navigate('CreatePost')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listStyle: {
        flex: 1,
        backgroundColor: '#eeeeee'
    }
})

const mapStateToProps = state => ({
    feed: state.posts.feed,
    isFetchingFeed: state.isFetching.feed
})
const mapDispatchToProps = {
    requestFeedFromApi
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)