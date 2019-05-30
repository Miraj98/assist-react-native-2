import React from 'react'
import { FlatList, StyleSheet, View , Platform} from 'react-native'
import { connect } from 'react-redux'
import { requestAllUsersFromApi } from '../redux/actions/Users/UsersActions'
import { SearchUser } from '../utils/SearchUtils/SearchUser'
import PeopleLayout from '../components/Users/PeopleLayout'
import SearchBar from '../node_modules/react-native-paper/src/components/Searchbar'

const _renderItem = ({ item }) => <PeopleLayout {...item} />
const generateId = (item) => `${item.email}`
const getItemLayout = (data, index) => ({
    length: 90,
    offset: 90*index,
    index
})

class People extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = { searchParam: '' }
        this.props.requestAllUsersFromApi()
    }

    render() {
        const { allEmails, usersByEmail, isFetching } = this.props
        const { searchParam } = this.state
        return (
            <View style={styles.container}>
                <FlatList
                    data={SearchUser(allEmails, usersByEmail, searchParam)}
                    renderItem={_renderItem}
                    keyExtractor={generateId}
                    onRefresh={this.props.requestAllUsersFromApi}
                    refreshing={this.props.isFetching}
                    style={styles.listStyle}
                    getItemLayout={getItemLayout}
                    removeClippedSubviews={Platform.OS === 'android' ? true: false}
                />
                <View style={styles.searchConatiner}>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={searchParam => this.setState({ searchParam })}
                        value={searchParam}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    searchConatiner: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        padding: 12,
        height: 70,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'white'
    },
    listStyle: {
        marginTop: 70
    }
})

const mapStateToProps = state => ({
    usersByEmail: state.allUsers.byEmail,
    allEmails: state.allUsers.allEmails,
    isFetching: state.isFetching.allUsers
})
const mapDispatchToProps = { requestAllUsersFromApi }

export default connect(mapStateToProps, mapDispatchToProps)(People)