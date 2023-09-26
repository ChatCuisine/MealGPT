import React, { useState, useEffect } from "react";
import { TextInput, Switch, Dimensions } from "react-native";
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

    const handleGenerateRecipes = () => {
        // Implement logic to generate recipes based on user input here
        // I think we would want to navigate to a loading screen while we wait to get a response from ChatGPT
        updateCarrots(carrotCount - 1); // Update carrotCount
        route.params.updateCarrots(carrotCount - 1); // Call the update function in Home Screen
        navigation.removeListener;
        navigation.navigate("Loading"); // Navigate to the "Loading" screen
    };

    return (
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
  font-size: 12;
  margin-left: 5;
`;

const SubmitText = styled.Text`
  font-family: BalooRegular;
  color: white;
  font-size: 18;
`;

const SubmitTouchable = styled.TouchableOpacity`
  background-color: #7bd9f1;
  border-radius: 5px;
  padding: 12px;
  margin-top: 16;
  align-items: center;
  border-radius: 15px;
`;

const ConsentText = styled.Text`
  color: white;
  font-family: BalooRegular;
  font-size: 12px;
  margin-left: 8;
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
