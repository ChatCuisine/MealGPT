import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import your screens
import HomeScreen from "./screens/HomeScreen";
import MyRecipesScreen from "./screens/MyRecipesScreen";
import InputIngredientsScreen from "./screens/InputIngredientsScreen";
import LoadingScreen from "./screens/LoadingScreen";
const Stack = createStackNavigator();

function App() {
  /*Should we use expo routing instead?
    I admit I do not know much about it but just chose react navigation for now.
    We could install expo-router if we want to try that instead - some people say it is easier?
    https://www.reddit.com/r/reactnative/comments/14apzyj/exporouter_vs_react_navigation/*/
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyRecipes"
          component={MyRecipesScreen}
          options={{
            headerStyle: {
              backgroundColor: "#121212", // Set the background color of the header
            },
            headerTitleStyle: {
              fontFamily: "BalooRegular", // Set the desired font family
              fontSize: 20, // Set the font size
              fontWeight: "bold", // Set the font weight (e.g., bold)
            },
            headerTintColor: "white", // Set the color of the header text and buttons
            headerShadowVisible: false, // Set this to false to remove the header shadow
          }}
        />
        <Stack.Screen
          name="Define Your Recipe"
          component={InputIngredientsScreen}
          options={{
            headerStyle: {
              backgroundColor: "#121212", // Set the background color of the header
            },
            headerTitleStyle: {
              fontFamily: "BalooRegular", // Set the desired font family
              fontSize: 20, // Set the font size
              fontWeight: "bold", // Set the font weight (e.g., bold)
            },
            headerTintColor: "white", // Set the color of the header text and buttons
            headerShadowVisible: false, // Set this to false to remove the header shadow
          }}
        />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        {/* Adding other idea for now...
        <Stack.Screen name="GPTRecipeIdeas" component={GPTRecipeIdeasScreen} />   */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
