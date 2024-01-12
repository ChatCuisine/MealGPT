import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";

// Import your screens
import HomeScreen from "./screens/HomeScreen";
import MyRecipesScreen from "./screens/MyRecipesScreen";
import InputIngredientsScreen from "./screens/InputIngredientsScreen";
import LoadingScreen from "./screens/LoadingScreen";
import RecipeDetailsScreen from "./screens/RecipeDetailsScreen";
import { RevenueCatProvider } from "./provider/RevenueCatProvider";
const Stack = createStackNavigator();

function App() {
  //TODO extract styles into one shared style for the different stacks.
  useEffect(() => {
    // Hide the splash screen when your app is ready
    SplashScreen.hideAsync();
  }, []);
  return (
    <RevenueCatProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Liked Recipes"
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
            name="Input Ingredients"
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
            name="Recipes"
            component={LoadingScreen}
            options={{
              headerStyle: {
                backgroundColor: "#121212", // Set the background color of the header
              },
              headerTitleStyle: {
                display: "none",
              },
              headerTintColor: "white", // Set the color of the header text and buttons
              headerShadowVisible: false, // Set this to false to remove the header shadow
            }}
          />
          <Stack.Screen
            name="RecipeDetails"
            component={RecipeDetailsScreen}
            options={{
              headerStyle: {
                backgroundColor: "#121212", // Set the background color of the header
              },
              headerTitleStyle: {
                display: "none",
              },
              headerTintColor: "white", // Set the color of the header text and buttons
              headerShadowVisible: false, // Set this to false to remove the header shadow
            }}
          />
          {/* Adding other idea for now...
        <Stack.Screen name="GPTRecipeIdeas" component={GPTRecipeIdeasScreen} />   */}
        </Stack.Navigator>
      </NavigationContainer>
    </RevenueCatProvider>
  );
}

export default App;
