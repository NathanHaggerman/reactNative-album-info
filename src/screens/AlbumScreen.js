import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text } from "react-native";

import Styles from "./Styles";

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={Styles.mainView}>
      {albums.map((album) => (
        <>
          <Text
            key={album.mbid != null ? album.mbid : Math.random()}
            style={Styles.text}
          >
            {album.name}
          </Text>
          <Image
            style={Styles.image}
            source={{
              uri: `${JSON.stringify(album.image[2])
                .replace('{"#text":"', "")
                .replace('","size":"large"}', "")}`,
            }}
          />
        </>
      ))}
    </ScrollView>
  );
};

export default AlbumScreen;
