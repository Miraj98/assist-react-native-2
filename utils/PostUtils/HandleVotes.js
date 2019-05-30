export const HandleVotes = (vote, post_id, currentVoteState, currentLikes, apiRequest) => {
    let newVoteState = vote === currentVoteState ? 0 : vote
    let newLikes
    switch(newVoteState) {
        case 0:
            newLikes = currentLikes - currentVoteState
            break
        default:
            newLikes = currentLikes - currentVoteState + newVoteState
    }

    apiRequest(newVoteState, post_id, newLikes, currentVoteState, currentLikes)

}