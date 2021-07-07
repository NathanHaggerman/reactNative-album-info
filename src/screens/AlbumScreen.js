import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

const AlbumScreen = ({ route }) => {
  console.log("route", route.params.artist);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAlbums();
  }, []);

  const getAlbums = async () => {
    try {
      let response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${route.params.artist}&api_key=4a5eba2666499fb5167258597b378f84&format=json`
      );
      let json = await response.json();
      setAlbums(json.topalbums.album);
      console.log("albums", albums);
      // console.log(artistDetails.artist.bio.summary);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.mainView}>
      {albums.map((album) => (
        <Text
          key={album.mbid != null ? album.mbid : Math.random()}
          style={styles.text}
        >
          {album.name}
        </Text>
      ))}
    </ScrollView>
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
    backgroundColor: "#1DB954",
    borderWidth: 5,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    paddingTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default AlbumScreen;
