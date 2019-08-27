export const calculateTime = (_date) => {
    const date = new Date(_date)
    const now = new Date()
    let difference = (now.getTime() - date.getTime())/1000
    if(difference < 60) {
        return Math.floor(difference) + ' s ago'
    } else {
        difference = difference / 60
        if(difference < 60) {
            let value = Math.floor(difference)
            return value + ` min${value === 1 ? '': 's'} ago`
        } else {
            difference = difference / 60
            if(difference < 24) {
                let value = Math.floor(difference)
                return value + ` hour${value === 1 ? '': 's'} ago`
            } else {
                difference = difference / 24
                if(difference < 30) {
                    let value = Math.floor(difference)
                    return value + ` day${value === 1 ? '': 's'} ago`
                } else {
                    difference = difference / 30
                    if(difference < 12) {
                        let value = Math.floor(difference)
                        return value + ` month${value === 1 ? '': 's'} ago`
                    } else {
                        let value = Math.floor(difference)
                        return value + ` month${value === 1 ? '': 's'} ago`
                    }
                }
            }
        }
    }
}

export const handleVotes = (vote, currentVoteState, currentLikes, post_id, caption_id, apiRequest) => {
    let newVoteState = vote === currentVoteState ? 0 : vote
    let newLikes
    console.log("New votes state:", newVoteState)
    switch(newVoteState) {
        case 0:
            newLikes = currentLikes - currentVoteState
            break
        default:
            newLikes = currentLikes - currentVoteState + newVoteState
    }
    console.log("New likes:", newLikes)
    return apiRequest(newVoteState, post_id, newLikes, currentVoteState, currentLikes, caption_id)

}