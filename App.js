import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import AlbumScreen from "./src/screens/AlbumScreen";
import BiographyScreen from "./src/screens/BiographyScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="App_to_Home"
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#1DB954" },
        }}
      >
        <Stack.Screen
          name="App_to_Home"
          component={HomeScreen}
          options={{
            title: "Artist Search",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 30,
            },
          }}
        />
        <Stack.Screen name="Biography" component={BiographyScreen} />
        <Stack.Screen name="Albums" component={AlbumScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
