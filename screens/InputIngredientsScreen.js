import React, { useState, useEffect, useRef, createContext } from "react";
import { Switch, Keyboard, TouchableWithoutFeedback } from "react-native";
import Slider from "@react-native-community/slider";
import styled from "styled-components";
import { useRevenueCat } from "../provider/RevenueCatProvider";

const InputIngredientsScreen = ({ navigation, route }) => {
  const [focusedField, setFocusedField] = useState(null);
  const { user } = useRevenueCat();
  const [ingredients, setIngredients] = useState("");
  const [mealPrepTime, setMealPrepTime] = useState(15);
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [seasonings, setSeasonings] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null); // Track selected meal
  const [selectedDifficulty, setSelectedDifficulty] = useState(null); // Track selected difficulty
  const [includeExtraIngredients, setIncludeExtraIngredients] = useState(false);
  const ingredientInputRef = useRef(null);
  const seasoningInputRef = useRef(null); // Ref for condiments and seasonings input

  const customSwitchTrackColor = {
    true: "#3bb9f1", // Color when switch is ON
    false: "#333", // Color when switch is OFF
  };

  const focusTextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const onSliderValueChange = (value) => {
    setMealPrepTime(value);
  };

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  const handleMealSelection = (meal) => {
    setSelectedMeal(meal);
  };

  const handleDifficultySelection = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const buildPrompt = (
    ingredients,
    seasonings,
    selectedMeal,
    selectedDifficulty,
    mealPrepTime,
    dietaryPreferences,
    includeExtraIngredients
  ) => {
    //TODO fix and add code to prevent injection and sanitize fields first.
    //Perhaps split up this screen and do it somewhere else
    const prompt = `Please provide 3 meals I could make.
    I have these ingredients: ${ingredients}.
    I have these seasonings/condiments: ${seasonings}.
    I would prefer to make this for ${selectedMeal}.
    Meal difficulty complexity preference: ${selectedDifficulty}.
    Other dietary preferences: ${dietaryPreferences}.
    For meal prep time, please only include meals around or under ${mealPrepTime} minutes.
    Open to using ingredients additional to what was listed?: ${includeExtraIngredients}`;
    return prompt;
  };

  const handleGenerateRecipes = () => {
    const prompt = buildPrompt(
      ingredients,
      seasonings,
      selectedMeal,
      selectedDifficulty,
      mealPrepTime,
      dietaryPreferences,
      includeExtraIngredients
    );

    // TODO - move the update carrots call to after the response comes back in the loading page.
    // Also do we need both of these calls here?
    if (user.carrots >= 1) {
      navigation.removeListener;
      navigation.navigate("Recipes", { userPrompt: prompt }); // This is really the loading screen
    } else {
      alert("You need more carrots to create recipes!");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <RecipeView>
        <RecipeText>What type of meal?</RecipeText>
        <MealButtonsView>
          <CustomButton
            onPress={() => handleMealSelection("Breakfast")}
            isSelected={selectedMeal === "Breakfast"}
          >
            <ButtonText>Breakfast</ButtonText>
          </CustomButton>
          <CustomButton
            onPress={() => handleMealSelection("Lunch")}
            isSelected={selectedMeal === "Lunch"}
          >
            <ButtonText>Lunch</ButtonText>
          </CustomButton>
          <CustomButton
            onPress={() => handleMealSelection("Dinner")}
            isSelected={selectedMeal === "Dinner"}
          >
            <ButtonText>Dinner</ButtonText>
          </CustomButton>
          <CustomButton
            onPress={() => handleMealSelection("Dessert")}
            isSelected={selectedMeal === "Dessert"}
          >
            <ButtonText>Dessert</ButtonText>
          </CustomButton>
        </MealButtonsView>
        <RecipeText onPress={() => focusTextInput(ingredientInputRef)}>
          What current ingredients do you have?
        </RecipeText>
        <CustomTextInput
          ref={ingredientInputRef}
          placeholder="Enter ingredients here"
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          value={ingredients}
          onChangeText={(text) => setIngredients(text)}
          onFocus={() => setFocusedField("ingredients")}
        />
        <RecipeText onPress={() => focusTextInput(seasoningInputRef)}>
          What condiments, seasonings, and sauces do you have on hand?
        </RecipeText>
        <CustomTextInput
          ref={seasoningInputRef}
          placeholder="Enter condiments, seasonings, and sauces here"
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          value={seasonings}
          onChangeText={(text) => setSeasonings(text)}
          onFocus={() => setFocusedField("seasonings")}
        />
        <RecipeText>Max meal prep time: {mealPrepTime} minutes</RecipeText>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={15}
          maximumValue={60}
          step={5}
          minimumTrackTintColor="#7bd9f1"
          maximumTrackTintColor="#262626"
          value={mealPrepTime}
          onValueChange={onSliderValueChange}
        />
        <RecipeText>Level of difficulty</RecipeText>
        <MealButtonsView>
          <CustomButton
            onPress={() => handleDifficultySelection("Easy")}
            isSelected={selectedDifficulty === "Easy"}
          >
            <ButtonText>Easy</ButtonText>
          </CustomButton>
          <CustomButton
            onPress={() => handleDifficultySelection("Medium")}
            isSelected={selectedDifficulty === "Medium"}
          >
            <ButtonText>Medium</ButtonText>
          </CustomButton>
          <CustomButton
            onPress={() => handleDifficultySelection("Hard")}
            isSelected={selectedDifficulty === "Hard"}
          >
            <ButtonText>Hard</ButtonText>
          </CustomButton>
        </MealButtonsView>
        <ConsentView
          style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
        >
          <Switch
            value={includeExtraIngredients}
            onValueChange={(value) => setIncludeExtraIngredients(value)}
            trackColor={customSwitchTrackColor}
          />
          <ConsentText>Include recipes with additional ingredients</ConsentText>
        </ConsentView>
        <SubmitTouchable
          onPress={() => {
            handleGenerateRecipes();
          }}
        >
          <SubmitText>Generate Recipes</SubmitText>
        </SubmitTouchable>
      </RecipeView>
    </TouchableWithoutFeedback>
  );
};

export default InputIngredientsScreen;

const RecipeView = styled.ScrollView`
  flex: 1;
  background-color: #121212;
  padding: 16px;
`;

const MealButtonsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 0px;
`;

const CustomButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props) => (props.isSelected ? "#3bb9f1" : "#333")};
  margin: 0px 3px;
  border-radius: 15px;
  overflow: hidden;
`;

const ButtonText = styled.Text`
  color: ${(props) => (props.isSelected ? "#333" : "white")};
  font-family: BalooRegular;
  font-size: 16px;
  text-align: center;
  padding: 15px 5px;
`;

const RecipeText = styled.Text`
  color: white;
  font-family: BalooRegular;
  font-size: 16px;
  font-weight: 600;
  padding-top: 15px;
`;

const SubmitText = styled.Text`
  font-family: BalooRegular;
  color: white;
  font-size: 18px;
`;

const SubmitTouchable = styled.TouchableOpacity`
  background-color: #3bb9f1;
  border-radius: 5px;
  padding: 12px;
  margin-top: 16px;
  align-items: center;
  border-radius: 15px;
`;

const ConsentText = styled.Text`
  color: white;
  font-family: BalooRegular;
  font-size: 15px;
  margin-left: 8px;
`;

const ConsentView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const CustomTextInput = styled.TextInput`
  background-color: #333;
  padding: 10px;
  border-radius: 5px;
  margin-top: 8px;
  color: white;
`;
