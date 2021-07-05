import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [artistDetails, setArtistDetails] = useState(null);

  useEffect(() => {
    getArtistInfo();
  }, []);

  const getArtistInfo = async () => {
    try {
      let response = await fetch(
        "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=the+avalanches&api_key=4a5eba2666499fb5167258597b378f84&format=json"
      );
      let json = await response.json();
      setArtistDetails(json.topalbums.album);
      // console.log(artistDetails);
    } catch (error) {
      console.error(error);
    }
  };

  return artistDetails != null ? (
    <ScrollView contentContainerStyle={styles.mainView}>
      <Text>Hello</Text>
      {artistDetails.map((album) => (
        <TouchableOpacity
          key={album.mbid != null ? album.mbid : Math.random()}
          style={styles.touchableView}
          onPress={() => {
            navigation.navigate("Home_to_Details", { album: album.name });
          }}
        >
          <View>
            <Text style={styles.touchableText}>{album.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    justifyContent: "center",
  },
  touchableView: {
    marginBottom: 30,
    width: 150,
    height: 50,
    alignItems: "center",
    backgroundColor: "orange",
    borderWidth: 5,
    borderRadius: 10,
  },
  touchableText: {
    textAlign: "center",
    paddingTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default HomeScreen;
