import React, { useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { OPENAI_API_KEY } from "@env";
import { createChatCompletion } from "../api/ChatGPTService";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

const LoadingScreen = ({ route }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Load savedRecipes from local storage when the component mounts
    AsyncStorage.getItem("savedRecipes")
      .then((data) => {
        if (data) {
          setSavedRecipes(JSON.parse(data));
        }
      })
      .catch((error) => {
        console.error("Error loading savedRecipes from local storage:", error);
      });
  }, []);

  // Save the updated savedRecipes to local storage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPrompt = route.params.userPrompt;
        const axiosInstance = axios.create({
          baseURL: "https://api.openai.com/v1/completions",
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        });

        const chatResponse = await createChatCompletion(
          userPrompt,
          OPENAI_API_KEY,
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
          easing: Easing.bounce, //Easing.linear,
          useNativeDriver: true,
        }).start();
      } catch (err) {
        setError(
          err.message ||
            "An unknown error occurred :( - please try again later."
        );
        setIsLoading(false);
      }
    };

    fetchData();
  }, [route.params.userPrompt]);

  const openRecipeDetails = (recipe) => {
    // Navigate to a full-screen view with recipe details
    navigation.navigate("RecipeDetails", {
      recipe,
      updateSavedRecipes: toggleRecipeLike, // Pass the toggleRecipeLike function
      isSaved: savedRecipes.some((r) => r.title === recipe.title),
    });
  };

  const toggleRecipeLike = (recipe, isSaved) => {
    const index = savedRecipes.findIndex((r) => r.title === recipe.title);
    let updatedRecipes;

    if (index === -1) {
      // Recipe is not saved, add it
      updatedRecipes = [...savedRecipes, recipe];
    } else {
      // Recipe is already saved, remove it
      updatedRecipes = [...savedRecipes];
      updatedRecipes.splice(index, 1);
    }

    // Update the state with the new savedRecipes
    setSavedRecipes(updatedRecipes);
  };

  return (
    <LinearGradient
      colors={[
        "rgba(18, 18, 18, 1)",
        "rgba(22, 57, 75, 1)",
        "rgba(18, 18, 18, 1)",
      ]} // Adjust the opacity as needed
      style={{ flex: 1 }}
    >
      <ScrollContainer
        contentContainerStyle={{ alignItems: "center" }}
        style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
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
              Our rabbits are dreaming up your cuisine...{"\n"}
              this may take a little bit.
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
                    <LikeButton onPress={() => toggleRecipeLike(meal)}>
                      {savedRecipes.some((r) => r.title === meal.title)
                        ? "♥"
                        : "♡"}
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
    </LinearGradient>
  );
};

export default LoadingScreen;

// padding: top, l/r, bottom;
const ScrollContainer = styled.ScrollView`
  flex-grow: 1;
  background-color: #121212;
  padding: 30px 15px 20px;
  border-top: 10px;
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
  background-color: "rgba(51, 67, 80, .85)";
  border-radius: 12px;
  padding: 16px;
  margin: 8px 0;
  font-family: "BalooRegular";
  width: 335px;
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
