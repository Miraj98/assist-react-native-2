export const normalizeFeed = (apiResponse, user_email) => {
    let normalizedResponse = {
        posts: {
            byId: {},
            allIds: []
        },
        users:{
          postsByUser: {},
          allEmails: []  
        },
        postsByInterest: {},
        postsVotedByUser: {
            byId: {},
            allIds: []
        }
    }
    for(let i = 0; i < apiResponse.length; i++) {
        let post = apiResponse[i]
        normalizedResponse.posts = {
            byId: {
                ...normalizedResponse.posts.byId,
                [post.id]: {
                    ...post,
                }
            },
            allIds: [...normalizedResponse.posts.allIds, post.id]
        }
        normalizedResponse.users = {
            postsByUser: {
                ...normalizedResponse.users.postsByUser,
                [post.user_email]: [...(normalizedResponse.users.postsByUser[post.user_email] || []), post.id]
            },
            allEmails: [...normalizedResponse.users.allEmails, post.user_email]
        }
        normalizedResponse.postsByInterest = {
            ...normalizedResponse.postsByInterest,
            [post.shareinterest]: [...(normalizedResponse.postsByInterest[post.shareinterest] || []), post.id]
        }

    }

    return normalizedResponse
}

export const normalizeAllUsers = (data) => {
    let normalizedData = {
        byEmail: {},
        allEmails: []
    }
    for(let i = 0; i < data.length; i++) {
        normalizedData = {
            byEmail: {
                ...normalizedData.byEmail,
                [data[i].email]: data[i]
            },
            allEmails: [...normalizedData.allEmails, data[i].email]
        }
    }
    return normalizedData
}

export const normalizePost = post => {
    let normalizedPost = {
        post: {},
        comments: {
            byId: {},
            allIds: []
        }
    }
    for(let i = 0; i < post.comments.length; i++) {
        normalizedPost = {
            ...normalizedPost,
            comments: {
                byId: {
                    ...normalizedPost.comments.byId,
                    [post.comments[i].id]: post.comments[i]
                },
                allIds: [...normalizedPost.comments.allIds, post.comments[i].id]
            }
        }
    }
    normalizedPost = {
        ...normalizedPost,
        post: {
            ...post,
            comments: normalizedPost.comments.allIds
        }
    }
    return normalizedPost
}