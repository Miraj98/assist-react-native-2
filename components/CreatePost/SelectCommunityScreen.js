import React from 'react'
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { requestInterestsFromApi } from '../../redux/actions/Communities/CommunityActions'
import { connect } from 'react-redux'
import CommunityOption from './CommunityOption'
import { SearchInterests } from '../../utils/SearchUtils/SearchInterests'

class SelectCommunity extends React.Component {

    state = {
        query: '',
        searchResults: this.props.allInterests
    }

    componentDidMount() {
        this.props.requestInterestsFromApi()
    }

    onSearch = query => {
        this.setState(() => ({ query }))
        this.setState(() => ({ searchResults: SearchInterests(query, this.props.allInterests) }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Searchbar
                    placeholder='Search'
                    onChangeText={this.onSearch}
                    value={this.state.query}
                />
                {
                    this.props.isFetchingInterests ? <ActivityIndicator/> : null
                }
                <FlatList
                    data={this.state.searchResults}
                    renderItem={({ item }) => <CommunityOption
                        goBack={() => this.props.navigation.goBack()}
                        onClick={this.props.navigation.getParam('updateCommunitySelected')}
                        name={item.name} />}
                    keyExtractor={item => `${item.id}`}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = (state) => ({
    allInterests: state.allInterests,
    isFetchingInterests: state.isFetching.interests
})

const mapDispatchToProps = {
    requestInterestsFromApi
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCommunity)
