import React, { useState, useEffect } from "react";
import { Switch, Keyboard, TouchableWithoutFeedback } from "react-native";
import Slider from "@react-native-community/slider";
import styled from "styled-components";

const InputIngredientsScreen = ({ navigation, route }) => {
    const [ingredients, setIngredients] = useState("");
    const [mealPrepTime, setMealPrepTime] = useState(15);
    const [dietaryPreferences, setDietaryPreferences] = useState({});
    const [includeExtraIngredients, setIncludeExtraIngredients] = useState(false);
    const [carrotCount, setCarrotCount] = useState(route.params.carrotCount);

    const updateCarrots = (newAmount) => {
        setCarrotCount(newAmount);
    };
    useEffect(() => {
        setCarrotCount(route.params.carrotCount);
    }, [route.params.carrotCount]);

    const onSliderValueChange = (value) => {
        setMealPrepTime(value);
    };

    const handleScreenPress = () => {
        // Dismiss the keyboard when the screen is pressed
        Keyboard.dismiss();
    };

    const buildPrompt = (
        ingredients,
        mealPrepTime,
        dietaryPreferences,
        includeExtraIngredients,
    ) => {
        // Build the string using the provided parameters
        const prompt = `I have 2 lemons, 2 chicken breasts, lettuce, a white onion, and cherry tomatoes.
        I would like a meal that takes under 30 minutes to make.
        I also have lemon pepper, thyme, italian seasoning.
        I would like something over 500 calories.
        I am open to getting ingredients not listed.`
                        /*`Ingredients: ${ingredients}
                        \nMeal Prep Time: ${mealPrepTime} minutes
                        \nDietary Preferences: ${dietaryPreferences}
                        \nInclude Extra Ingredients: ${includeExtraIngredients}`;*/

        return prompt;
    };

    const handleGenerateRecipes = () => {
        // Implement logic to generate recipes based on user input here
        // Build the prompt string using the buildPrompt function
        // TODO will need to add difficulty level and type of meal
        const prompt = buildPrompt(
            ingredients,
            mealPrepTime,
            dietaryPreferences,
            includeExtraIngredients,
        );
        // TODO - move the update carrots call to after the response comes back in the loading page.

        updateCarrots(carrotCount - 1); // Update carrotCount 
        route.params.updateCarrots(carrotCount - 1); // Call the update function in Home Screen
        navigation.removeListener;
        navigation.navigate("Loading", { userPrompt: prompt }); // Navigate to the "Loading" screen
    };

    return (
        <TouchableWithoutFeedback onPress={handleScreenPress}>
            <RecipeView>
                <RecipeText>What type of meal?</RecipeText>
                <MealButtonsView>
                    <CustomButton onPress={() => { }}>
                        <ButtonText>Breakfast</ButtonText>
                    </CustomButton>
                    <CustomButton onPress={() => { }}>
                        <ButtonText>Lunch</ButtonText>
                    </CustomButton>
                    <CustomButton onPress={() => { }}>
                        <ButtonText>Dinner</ButtonText>
                    </CustomButton>
                    <CustomButton onPress={() => { }}>
                        <ButtonText>Dessert</ButtonText>
                    </CustomButton>
                </MealButtonsView>
                <RecipeText>What current ingredients do you have?</RecipeText>
                <CustomTextInput
                    placeholder="Enter ingredients here"
                    multiline
                    numberOfLines={4}
                    value={{ key: "ingredients" }}
                    onChangeText={(text) => setIngredients(text)}
                />
                <RecipeText>
                    What condiments, seasonings, and sauces you have on hand?
                </RecipeText>
                <RecipeText>Preferred Meal Prep Time: {mealPrepTime} minutes</RecipeText>
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
                <RecipeText>Dietary Preferences</RecipeText>
                <CustomTextInput
                    placeholder="Any other dietary preferences?"
                    multiline
                    numberOfLines={4}
                    value={{ key: "dietaryPreferences" }}
                    onChangeText={(text) => setDietaryPreferences(text)}
                />
                <RecipeText>Level of difficulty</RecipeText>
                <MealButtonsView>
                    <CustomButton onPress={() => { }}>
                        <ButtonText>Easy</ButtonText>
                    </CustomButton>
                    <CustomButton onPress={() => { }}>
                        <ButtonText>Medium</ButtonText>
                    </CustomButton>
                    <CustomButton onPress={() => { }}>
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
                        Deliberately include recipes that incorporate one or more ingredients
                        I have not listed
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

const RecipeView = styled.View`
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
  background-color: #7bd9f1;
  margin: 0px 3px; /* Adjust the spacing between buttons */
  border-radius: 15px;
  overflow: hidden;
`;

const ButtonText = styled.Text`
  color: white;
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

const InfoText = styled.Text`
  color: #7bd9f1;
  font-size: 12px;
  margin-left: 5;
`;

const SubmitText = styled.Text`
  font-family: BalooRegular;
  color: white;
  font-size: 18px;
`;

const SubmitTouchable = styled.TouchableOpacity`
  background-color: #7bd9f1;
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
