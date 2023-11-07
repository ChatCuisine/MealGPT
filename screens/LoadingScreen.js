import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Easing, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { OPENAI_API_KEY } from "@env";
import { createChatCompletion } from "../api/ChatGPTService";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from "expo-font";

const LoadingScreen = ({ route }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]); // State to store favorite recipes
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const apiKey = OPENAI_API_KEY;

  // Define a function to toggle the favorite status
  const toggleFavorite = async (meal) => {
    try {
      // Check if the meal is already in favorites
      const favorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = favorites ? JSON.parse(favorites) : [];

      const isFavorite = favoritesArray.some((favorite) => favorite.title === meal.title);

      if (isFavorite) {
        // Remove from favorites
        favoritesArray = favoritesArray.filter((favorite) => favorite.title !== meal.title);
      } else {
        // Add to favorites
        favoritesArray.push(meal);
      }

      // Update the AsyncStorage
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPrompt = route.params.userPrompt;
        const axiosInstance = axios.create({
          baseURL: "https://api.openai.com/v1/completions",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        });

        const chatResponse = await createChatCompletion(
          userPrompt,
          apiKey,
          axiosInstance
        );
        console.log(chatResponse);
        setIsLoading(false);
        const parsedResponse = JSON.parse(chatResponse);

        if (parsedResponse === "Please only enter appropriate items") {
          throw new Error("Invalid input: Please only enter appropriate items");
        } else {
          setResponse(parsedResponse);
        }

        // Fade in the response text
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.bounce,//Easing.linear,
          useNativeDriver: true,
        }).start();
      } catch (err) {
        setError(err.message || "An unknown error occurred :( - please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [route.params.userPrompt]);

  const openRecipeDetails = (recipe) => {
    // Navigate to a full-screen view with recipe details
    navigation.navigate("RecipeDetails", { recipe });
  };

  return (
    <ScrollContainer
      contentContainerStyle={{ alignItems: 'center' }}
    >
      {isLoading && ( // Render the LoadingImage only when isLoading is true
        <LoadingImage
          source={require("../assets/chatcuisine_loadingrecipes.png")}
        />
      )}
      {isLoading ? (
        <LoadingView>
          <ActivityIndicator
            size="large"
            color="white"
            style={{ marginTop: 16 }}
          />
          <LoadingText>
            Our rabbits are dreaming up your cuisine...{'\n'}
            this may take up to 30 seconds.
          </LoadingText>
        </LoadingView>
      ) : (
        <Animated.View style={{ opacity: fadeAnim }}>
          {response && response.meals ? (
            response.meals.map((meal, index) => (
              <RecipeCard key={index} onPress={() => openRecipeDetails(meal)}>
                <RecipeTitle>{meal.title}</RecipeTitle>
                <RecipeSubtitle>{meal.sub_caption}</RecipeSubtitle>
                <RecipeInfo>
                  <InfoText>Prep Time: {meal.prep_time} mins</InfoText>
                  <InfoText>Difficulty: {meal.difficulty}</InfoText>
                </RecipeInfo>
                <LikeButtonContainer>
                  <LikeButton
                    onPress={() => {
                      toggleFavorite(meal);
                    }}
                  >
                    {favorites.includes(meal) ? '💙' : '❤️'}
                  </LikeButton>
                </LikeButtonContainer>
              </RecipeCard>
            ))
          ) : (
            <ErrorText>No recipe data available.</ErrorText>
          )}
        </Animated.View>

      )}
      {!isLoading && error && <ErrorText>{error}</ErrorText>}
    </ScrollContainer>
  );
};

export default LoadingScreen;

// padding: top, l/r, bottom;
const ScrollContainer = styled.ScrollView`
  flex-grow: 1;
  background-color: #121212;
  padding: 80px 15px 20px;
  border-top: 30px;
`;

const LoadingView = styled.View`
  align-items: center;
`;

const LoadingImage = styled.Image`
  width: 80%;
  max-height: 50%;
  border-radius: 25px;
  margin-top: 10%;
`;

const LoadingText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
  margin-top: 16px;
  font-family: "BalooRegular";
`;

const RecipeCard = styled.TouchableOpacity`
  background-color: #333333;
  border-radius: 12px;
  padding: 16px;
  margin: 8px 0;
  font-family: "BalooRegular";
`;

const RecipeTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const RecipeSubtitle = styled.Text`
  color: white;
  font-size: 16px;
`;

const RecipeInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`;

const InfoText = styled.Text`
  color: white;
  font-size: 14px;
`;

const LikeButtonContainer = styled.View`
  align-items: flex-end;
  margin-top: 12px;
`;

const LikeButton = styled.Text`
  color: red;
  font-size: 24px;
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
`;
