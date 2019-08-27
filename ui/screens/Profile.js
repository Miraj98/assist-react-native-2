import React from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { requestCompleteProfileFromApi } from "../../actions/people/completeprofile";
import { requestRelationshipFromApi } from "../../actions/people/relationships";
import Avatar from "../components/profiles/Avatar";
import ProfileActions from "../components/profiles/ProfileActions";
import Section from "../components/Section";
import { connect } from "react-redux";
import Friends from "../components/profiles/Friends";

class Profile extends React.Component {

  static navigationOptions = {
    headerTintColor: "black",
    headerTitle: () => <Text style={{ fontFamily: "Rubik-Medium", fontSize: 20, color: "black" }}>Profile</Text>
  }

  componentDidMount() {
    this.props.requestCompleteProfileFromApi(this.props.navigation.getParam("email"));
    this.props.requestRelationshipFromApi();
  }

  render() {
    if (this.props.profile === undefined) {
      return (
        <View style={styles.loadingView}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Fetching profile</Text>
        </View>
      );
    }
    return (
      <ScrollView style={styles.scrollContainer}>
        <Avatar
          name={this.props.profile.name}
          about={this.props.profile.about}
          profilePic={this.props.profile.photo_url}
        />
        <ProfileActions phone={this.props.profile.phone_number} email={this.props.profile.email} />
        <Section viewAllIsVisible={this.props.profile.friends.length > 6} title="Friends" subtitle="Max. 50 possible">
          <Friends friends={this.props.profile.friends}/>
        </Section>
        <Section viewAllIsVisible={false} title="Interests" subtitle="Communities joined" />
        <Section viewAllIsVisible={false} title="Activity" subtitle={`${this.props.profile.total_karma} karma points`} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, props) => ({
  profile: state.people.profileByEmail[props.navigation.getParam("email")],
  isFetchingProfile: state.isFetching.completeprofile
});

const mapDispatchToProps = {
  requestCompleteProfileFromApi,
  requestRelationshipFromApi
};

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    fontFamily: "Rubik",
    color: "#616161",
    marginTop: 4
  },
  scrollContainer: {
    backgroundColor: "#eeeeee",
    flex: 1
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
