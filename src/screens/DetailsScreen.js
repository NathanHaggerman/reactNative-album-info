import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const DetailsScreen = ({ navigation, route }) => {
  console.log(navigation);
  console.log(route);
  return (
    <View style={styles.mainView}>
      <Text>{route.params.album}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DetailsScreen;
