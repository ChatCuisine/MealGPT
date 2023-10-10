import React from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components";

const RecipeDetailsScreen = ({ route }) => {
    const recipe = route.params.recipe;

    return (
        <Container>
            <RecipeCard>
                <RecipeTitle>{recipe.title}</RecipeTitle>
                <RecipeSubtitle>{recipe.sub_caption}</RecipeSubtitle>
                <RecipeInfo>
                    <InfoText>Prep Time: {recipe.prep_time} mins</InfoText>
                    <InfoText>Difficulty: {recipe.difficulty}</InfoText>
                </RecipeInfo>
                <LikeButtonContainer>
                    <LikeButton>❤️</LikeButton>
                </LikeButtonContainer>
            </RecipeCard>

            <IngredientsContainer>
                <SectionTitle>Ingredients:</SectionTitle>
                <IngredientList>
                    {recipe.ingredients.map((ingredient, index) => (
                        <IngredientItem key={index}>{ingredient}</IngredientItem>
                    ))}
                </IngredientList>
            </IngredientsContainer>

            <InstructionsContainer>
                <SectionTitle>Instructions:</SectionTitle>
                <InstructionList>
                    {recipe.instructions.map((instruction, index) => (
                        <InstructionItem key={index}>{instruction}</InstructionItem>
                    ))}
                </InstructionList>
            </InstructionsContainer>
        </Container>
    );
};

export default RecipeDetailsScreen;

const Container = styled.ScrollView`
  flex-grow: 1;
  background-color: #121212;
  padding: 16px;
`;

const RecipeCard = styled.View`
  background-color: #333333;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

const RecipeTitle = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const RecipeSubtitle = styled.Text`
  color: white;
  font-size: 18px;
`;

const RecipeInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`;

const InfoText = styled.Text`
  color: white;
  font-size: 16px;
`;

const LikeButtonContainer = styled.View`
  align-items: flex-end;
  margin-top: 12px;
`;

const LikeButton = styled.Text`
  color: red;
  font-size: 32px;
`;

const IngredientsContainer = styled.View``;

const SectionTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-top: 16px;
`;

const IngredientList = styled.View``;

const IngredientItem = styled.Text`
  color: white;
  font-size: 16px;
  margin-top: 8px;
`;

const InstructionsContainer = styled.View``;

const InstructionList = styled.View``;

const InstructionItem = styled.Text`
  color: white;
  font-size: 16px;
  margin-top: 8px;
`;
