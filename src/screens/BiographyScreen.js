import React from "react";
import { ScrollView, Text } from "react-native";

import Styles from "./Styles";

const DetailsScreen = ({ route }) => {
  return (
    <ScrollView contentContainerStyle={Styles.scrollView}>
      {<Text style={Styles.text}>{route.params.biography}</Text>}
    </ScrollView>
  );
};

export default DetailsScreen;
