function SearchUser(userEmails, usersByEmail, searchParam) {
    let searchResult = []
    if(searchParam === '') {
        searchResult = userEmails.map(email => usersByEmail[email])
    } else {
        for(let i = 0; i < userEmails.length; i++) {
            let user = usersByEmail[userEmails[i]]
            let username = `${user.firstname} ${user.lastname}`
            if(username.includes(searchParam)) searchResult.push(user)
        }
    }
    return searchResult
}

export { SearchUser }