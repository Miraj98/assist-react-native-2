import React from "react";
import { FlatList, TouchableHighlight, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Card from "../components/Card";
import { requestAllUsersFromApi } from "../../actions/people/allUsers";


const renderItem = (item, navigateToProfile) => {
  return (
    <TouchableHighlight
      onPress={() => navigateToProfile(item.email)}
    >
      <Card
        type="USER"
        id={item.email}
        profile_photo_url={item.photo_url}
        title={item.firstname + " " + item.lastname}
        content={item.about}
      />
    </TouchableHighlight>
  );
}
const keyExtractor = (item) => `${item.email}`

class AllUsers extends React.Component {

  componentDidMount() {
    this.props.requestAllUsersFromApi();
  }

  navigateToProfile = (email) => {
    this.props.navigation.navigate("Profile", { email });
  }

  render() {

    const data = this.props.allUsers.allEmails === undefined ? [] : this.props.allUsers.allEmails.map(email => this.props.allUsers.byEmail[email]);

    return (
      <FlatList
        data={data}
        renderItem={({ item }) => renderItem(item, this.navigateToProfile)}
        keyExtractor={keyExtractor}
        style={styles.scrollContainer}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  allUsers: state.people.allUsers
})

const mapDispatchToProps = {
  requestAllUsersFromApi
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);