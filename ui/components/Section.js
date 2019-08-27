import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

const Section = props => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
        {
          props.viewAllIsVisible && (
            <TouchableHighlight>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableHighlight>
          )
        }
      </View>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 6
  },
  title: {
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    paddingLeft: 8,
    paddingTop: 8
  },
  subtitle: {
    fontFamily: "Rubik",
    color: '#616161',
    paddingLeft: 8
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  viewAll: {
    color: "#0091ea",
    paddingRight: 8
  }
});

export default Section;