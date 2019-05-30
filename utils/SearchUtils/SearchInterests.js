function SearchInterests(query, allInterests) {
    let searchResult = []
    if(query === '') searchResult = allInterests
    else {
        searchResult = allInterests.filter(interest => interest.name.toUpperCase().includes(query.toUpperCase()))
    }
    return searchResult
}

export { SearchInterests }