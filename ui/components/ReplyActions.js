import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default (props)  => {
  return  (
    <TouchableOpacity
      onPress={() => props.focusCommentTextInput(props.parent_comment_id)}
      style={styles.buttonContainer}
    >
      <Text style={styles.label}>Reply</Text>
      <Icon name="ios-undo" size={18} color="#757575" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    marginTop: 4
  },
  label: {
    fontSize: 12,
    marginRight: 8,
    color: "#757575",
    fontFamily: "Rubik"
  }
});