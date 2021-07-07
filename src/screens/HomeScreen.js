import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar } from "react-native-elements";

const HomeScreen = ({ navigation }) => {
  const [artistDetails, setArtistDetails] = useState(null);
  const [artistSearch, setArtistSearch] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    getArtistInfo();
  }, []);

  const getArtistInfo = async () => {
    try {
      console.log("artistSearch, " + artistSearch);
      let response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistSearch}&api_key=4a5eba2666499fb5167258597b378f84&format=json`
      );
      let json = await response.json();
      setArtistDetails(json);
      // console.log(artistDetails.artist.bio.summary);
    } catch (error) {
      console.error(error);
    }
  };

  const updateSearch = (artistSearch) => {
    setShowButtons(false);
    setArtistSearch(artistSearch);
    console.log(artistSearch);
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
      <View style={styles.mainView}>
        <TouchableOpacity
          style={styles.touchableView}
          onPress={() => {
            getArtistInfo();
            setShowButtons(true);
          }}
        >
          <Text style={styles.touchableText}>Search</Text>
        </TouchableOpacity>
        {showButtons && artistSearch !== "" && (
          <>
            <TouchableOpacity
              display="none"
              style={styles.touchableView}
              onPress={() => {
                getArtistInfo();
                navigation.navigate("Biography", {
                  biography: artistDetails.artist.bio.content,
                });
              }}
            >
              <Text style={styles.touchableText}>Biography</Text>
            </TouchableOpacity>
            <TouchableOpacity
              display="none"
              style={styles.touchableView}
              onPress={() => {
                getArtistInfo();
                navigation.navigate("Albums", {
                  artist: artistSearch,
                });
              }}
            >
              <Text style={styles.touchableText}>Albums</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.mainView}>
        {/* {artistDetails.map((album) => (
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
      ))} */}
      </ScrollView>
    </>
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
  touchableText: {
    textAlign: "center",
    paddingTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default HomeScreen;
