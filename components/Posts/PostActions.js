import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { HandleVotes } from '../../utils/PostUtils/HandleVotes'
import { voteRequest } from '../../redux/actions/Posts/VoteActions'
import { connect } from 'react-redux'

function PostActions({ likes, selfVote, id, voteRequest, completePost, numOfComments }) {
    return (
        <View style={styles.container}>
            <View style={styles.voteActionContainer}>
                <TouchableOpacity
                    style={styles.upvote}
                    onPress={() => HandleVotes(1, id, selfVote, likes, voteRequest)}
                >
                    <Icon
                        name='arrow-up-thick'
                        size={24}
                        color={selfVote === 1 ? 'green' : 'rgb(142, 142, 147)'}
                    />
                </TouchableOpacity>
                <Text>{likes}</Text>
                <TouchableOpacity style={styles.downvote}>
                    <Icon
                        name='arrow-down-thick'
                        size={24}
                        color={selfVote === -1 ? 'red' : 'rgb(142, 142, 147)'}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.comment}
                onPress={completePost}
            >
                <Icon
                    name="comment-text-multiple"
                    size={24}
                    color="rgb(142, 142, 147)"
                />
                <Text style={styles.commentValue}>{numOfComments === 0 ? 'Comment' : numOfComments}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon
                    name="share"
                    size={24}
                    color="rgb(142, 142, 147)"
                />
            </TouchableOpacity>
        </View>
    )
}

const mapDispatchToProps = {
    voteRequest
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16,
        marginLeft: 44
    },
    voteActionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    upvote: {
        marginRight: 24
    },
    downvote: {
        marginLeft: 24
    },
    comment: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    commentValue: {
        marginLeft: 12
    }
})

export default connect(null, mapDispatchToProps)(PostActions)