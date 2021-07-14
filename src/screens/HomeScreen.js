import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SearchBar } from "react-native-elements";

import Styles from "./Styles";

const HomeScreen = ({ navigation }) => {
  const [artistDetails, setArtistDetails] = useState(null);
  const [artistSearch, setArtistSearch] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    getArtistInfo();
  }, []);

  const getArtistInfo = async () => {
    try {
      let response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistSearch}&api_key=4a5eba2666499fb5167258597b378f84&format=json`
      );
      let json = await response.json();
      setArtistDetails(json);
    } catch (error) {
      console.error(error);
    }
  };

  const updateSearch = (artistSearch) => {
    setShowButtons(false);
    setArtistSearch(artistSearch);
  };

  return (
    <>
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={artistSearch}
        />
      </View>
      <View style={Styles.mainView}>
        <TouchableOpacity
          style={Styles.touchableView}
          onPress={() => {
            getArtistInfo();
            setShowButtons(true);
          }}
        >
          <Text style={Styles.touchableText}>Search</Text>
        </TouchableOpacity>
        {showButtons && artistSearch !== "" && (
          <>
            <TouchableOpacity
              display="none"
              style={Styles.touchableView}
              onPress={() => {
                getArtistInfo();
                navigation.navigate("Biography", {
                  biography: artistDetails.artist.bio.content,
                });
              }}
            >
              <Text style={Styles.touchableText}>Biography</Text>
            </TouchableOpacity>
            <TouchableOpacity
              display="none"
              style={Styles.touchableView}
              onPress={() => {
                getArtistInfo();
                navigation.navigate("Albums", {
                  artist: artistSearch,
                });
              }}
            >
              <Text style={Styles.touchableText}>Albums</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

export default HomeScreen;
