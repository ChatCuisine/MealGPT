import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Dimensions,
  StyleSheet,
  Button,
} from "react-native";
import Slider from "@react-native-community/slider";

/* This is the screen for gathering data (ingredients, etc.) that will be input for the chatGPT prompt */
const InputIngredientsScreen = ({ navigation, route }) => {
  const [ingredients, setIngredients] = useState("");
  const [mealPrepTime, setMealPrepTime] = useState(15);
  const [dietaryPreferences, setDietaryPreferences] = useState({});
  const [includeExtraIngredients, setIncludeExtraIngredients] = useState(false);
  const [carrotCount, setCarrotCount] = useState(route.params.carrotCount);
  const screenWidth = Dimensions.get("window").width;

  const updateCarrots = (newAmount) => {
    setCarrotCount(newAmount);
  };
  useEffect(() => {
    // If you want to update carrotCount when it changes in the parent screen
    setCarrotCount(route.params.carrotCount);
  }, [route.params.carrotCount]);

  const onSliderValueChange = (value) => {
    setMealPrepTime(value);
  };

  const handleGenerateRecipes = () => {
    // Implement logic to generate recipes based on user input here
    // I think we would want to navigate to a loading screen while we wait to get a response from ChatGPT
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#121212", padding: 16 }}>
      {/* Ingredient Input */}
      <Text style={{ color: "white", fontSize: 16 }}>
        What current ingredients do you have?
        <Text
          style={{ color: "#7bd9f1", fontSize: 12, marginLeft: 5 }}
          onPress={() => {
            // Implement modal or info display logic here
            // I am thinking we have something like:
            /* "If you do not have a solid base ingredient, 
                            the suggested recipes will likely contain ingredients 
                            that you will need to go get! 
                            Ex. chicken, lettuce, salmon, etc. 
                            We assume you have oil, salt, pepper, and butter."*/
          }}
        >
          (Info)
        </Text>
      </Text>
      <TextInput
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 5,
          marginTop: 8,
          color: "black",
        }}
        placeholder="Enter ingredients here"
        multiline
        numberOfLines={4}
        value={{ key: "ingredients" }}
        onChangeText={(text) => setIngredients(text)}
      />
      <Text style={{ color: "white", fontSize: 16 }}>
        What condiments, seasonings, and sauces you have on hand?
      </Text>

      <Text style={{ color: "white", fontSize: 16 }}>What type of meal?</Text>
      <View style={styles.container}>
        <Button
          title="Breakfast"
          onPress={() => {}}
          buttonStyle={{
            backgroundColor: "#7bd9f1",
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 20,
          }}
          containerStyle={{
            borderRadius: 30,
            overflow: "hidden",
            width: "50%",
            marginTop: 20,
            color: "#faf0de",
            marginTop: 10,
            borderRadius: 20,
            overflow: "hidden",
          }}
        />
      </View>

      {/* Meal Prep Time Slider */}
      <Text style={{ color: "white", fontSize: 16, marginTop: 16 }}>
        Preferred Meal Prep Time: {mealPrepTime} minutes
      </Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={15}
        maximumValue={60}
        step={5}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={mealPrepTime}
        onValueChange={onSliderValueChange}
      />
      {/* Dietary Preferences */}
      <Text style={{ color: "white", fontSize: 16, marginTop: 16 }}>
        Dietary Preferences
      </Text>
      {/* TODO - do we want something other than textarea? */}
      <TextInput
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 5,
          marginTop: 8,
          color: "black",
        }}
        placeholder="Any other dietary preferences?"
        multiline
        numberOfLines={4}
        value={{ key: "dietaryPreferences" }}
        onChangeText={(text) => setDietaryPreferences(text)}
      />
      {/* Include Extra Ingredients */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
      >
        <Switch
          value={includeExtraIngredients}
          onValueChange={(value) => setIncludeExtraIngredients(value)}
        />
        <Text style={{ color: "white", marginLeft: 8 }}>
          Deliberately include recipes that incorporate one or more ingredients
          I have not listed
        </Text>
      </View>
      <Text style={{ color: "white", fontSize: 16 }}>Level of difficulty</Text>
      {/* Generate Recipes Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#7bd9f1",
          borderRadius: 5,
          padding: 12,
          marginTop: 16,
          alignItems: "center",
        }}
        onPress={() => {
          updateCarrots(carrotCount - 1); // Update carrotCount
          route.params.updateCarrots(carrotCount - 1); // Call the update function in Home Screen
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Generate Recipes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default InputIngredientsScreen;
