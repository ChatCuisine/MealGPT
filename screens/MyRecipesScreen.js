import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from "styled-components";

const MyRecipesScreen = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        const loadSavedRecipes = async () => {
            const savedRecipesJSON = await AsyncStorage.getItem('savedRecipes');
            if (savedRecipesJSON) {
                setSavedRecipes(JSON.parse(savedRecipesJSON));
            }
        };

        loadSavedRecipes();
    }, []);

    const removeRecipe = (recipe) => {
        // Remove the recipe from the list of saved recipes
        const updatedRecipes = savedRecipes.filter((r) => r.title !== recipe.title);
        setSavedRecipes(updatedRecipes);

        // Save the updated list to local storage
        AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    };

    return (
        <ScrollContainer contentContainerStyle={{ alignItems: 'center' }}>
            <SavedRecipesView>
                {savedRecipes.map((recipe, index) => (
                    <RecipeCard key={index}>
                        <RecipeTitle>{recipe.title}</RecipeTitle>
                        <RecipeSubtitle>{recipe.sub_caption}</RecipeSubtitle>
                        <RecipeInfo>
                            <InfoText>Prep Time: {recipe.prep_time} mins</InfoText>
                            <InfoText>Difficulty: {recipe.difficulty}</InfoText>
                        </RecipeInfo>
                        <RemoveButton onPress={() => removeRecipe(recipe)}>
                            <RemoveButtonText>
                                Remove
                            </RemoveButtonText>
                        </RemoveButton>
                    </RecipeCard>
                ))}
            </SavedRecipesView>
        </ScrollContainer>
    );
};

export default MyRecipesScreen;

const ScrollContainer = styled.ScrollView`
  flex-grow: 1;
  background-color: #121212;
  padding: 80px 15px 20px;
  border-top: 30px;
`;

const SavedRecipesView = styled.View`
  align-items: center;
`;

const RecipeCard = styled.View`
  background-color: #333333;
  border-radius: 12px;
  padding: 16px;
  margin: 8px 0;
  font-family: "BalooRegular";
  position: relative;
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

const RemoveButton = styled(TouchableOpacity)`
  background-color: red;
  padding: 8px 16px;
  border-radius: 12px;
  align-self: flex-end;
  margin-top: 8px;
`;

const RemoveButtonText = styled.Text`
  color: white;
  font-size: 14px;
  text-align: center;
`;
