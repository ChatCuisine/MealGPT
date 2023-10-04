import React, { useState, useEffect, useRef } from "react";
import { Switch, Keyboard, TouchableWithoutFeedback } from "react-native";
import Slider from "@react-native-community/slider";
import styled from "styled-components";

const InputIngredientsScreen = ({ navigation, route }) => {
  const [carrotCount, setCarrotCount] = useState(route.params.carrotCount);
  const [focusedField, setFocusedField] = useState(null);
  const [ingredients, setIngredients] = useState("");
  const [mealPrepTime, setMealPrepTime] = useState(15);
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [seasonings, setSeasonings] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null); // Track selected meal
  const [selectedDifficulty, setSelectedDifficulty] = useState(null); // Track selected difficulty
  const [includeExtraIngredients, setIncludeExtraIngredients] = useState(false);
  const ingredientInputRef = useRef(null);
  const seasoningInputRef = useRef(null); // Ref for condiments and seasonings input

  const updateCarrots = (newAmount) => {
    setCarrotCount(newAmount);
  };

  useEffect(() => {
    setCarrotCount(route.params.carrotCount);
  }, [route.params.carrotCount]);

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
    const prompt = `Type of Meal: ${selectedMeal},
        \nInclude Ingredients: ${ingredients},
        \nInclude condiments/seasonings: ${seasonings},
        \nMeal Time: ${mealPrepTime},
        \nDifficulty: ${selectedDifficulty},
        \nInclude ingredients not listed${includeExtraIngredients}
        \n\nI want the response to be in JSON format. With title, sub caption, meal time, difficulty, list of steps.
        \nOnly output the json and no extra text please.
        \n\nPlease make the meal be esquite and always ineresting for them to try`;

    return prompt;
  };

  const handleGenerateRecipes = () => {
    const prompt = buildPrompt(
      ingredients,
      mealPrepTime,
      dietaryPreferences,
      includeExtraIngredients
    );

    // TODO - move the update carrots call to after the response comes back in the loading page.
    // Also do we need both of these calls here?
    updateCarrots(carrotCount - 1);
    route.params.updateCarrots(carrotCount - 1);
    navigation.removeListener;
    navigation.navigate("Loading", { userPrompt: prompt });
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
          multiline
          numberOfLines={4}
          value={seasonings}
          onChangeText={(text) => setSeasonings(text)}
          onFocus={() => setFocusedField("seasonings")}
        />
        <RecipeText>
          Preferred Meal Prep Time: {mealPrepTime} minutes
        </RecipeText>
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
          />
          <ConsentText>
            Deliberately include recipes that incorporate one or more
            ingredients I have not listed
          </ConsentText>
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
  font-size: 12px;
  margin-left: 8px;
`;

const ConsentView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const CustomTextInput = styled.TextInput`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 8px;
  color: black;
`;
