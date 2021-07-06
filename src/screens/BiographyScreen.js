import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

const DetailsScreen = ({ route }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {<Text>{route.params.biography}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DetailsScreen;
