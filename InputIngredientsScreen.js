import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { Slider } from '@react-native-community/slider';

/* This is the screen for gathering data (ingredients, etc.) that will be input for the chatGPT prompt */
const InputIngredientsScreen = ({ navigation }) => {
    const [ingredients, setIngredients] = useState('');
    const [mealPrepTime, setMealPrepTime] = useState(15);
    const [dietaryPreferences, setDietaryPreferences] = useState({});
    const [includeExtraIngredients, setIncludeExtraIngredients] = useState(false);

    const handleGenerateRecipes = () => {
        // Implement logic to generate recipes based on user input here
        // I think we would want to navigate to a loading screen while we wait to get a response from ChatGPT
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#121212', padding: 16 }}>
            {/* Ingredient Input */}
            <Text style={{ color: 'white', fontSize: 16 }}>
                What current ingredients do you have?
                <Text
                    style={{ color: '#7bd9f1', fontSize: 12, marginLeft: 5 }}
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
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 8,
                    color: 'black',
                }}
                placeholder="Enter ingredients here"
                multiline
                numberOfLines={4}
                value={ingredients}
                onChangeText={(text) => setIngredients(text)}
            />

            {/* Meal Prep Time Slider */}
            <Text style={{ color: 'white', fontSize: 16, marginTop: 16 }}>
                Preferred Meal Prep Time: ({mealPrepTime} minutes)
            </Text>
            <Slider
                minimumValue={15}
                maximumValue={60}
                step={5}
                value={mealPrepTime}
                onValueChange={(value) => setMealPrepTime(value)}
                minimumTrackTintColor="#7bd9f1" // Customize the color of the slider track
                maximumTrackTintColor="white" // Customize the color of the slider track beyond the thumb
                thumbTintColor="#7bd9f1" // Customize the color of the thumb (slider handle)
            />

            {/* Dietary Preferences */}
            <Text style={{ color: 'white', fontSize: 16, marginTop: 16 }}>
                Dietary Preferences
            </Text>
            {/* TODO - do we want something other than textarea? */}
            <TextInput
                style={{
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 8,
                    color: 'black',
                }}
                placeholder="Any other dietary preferences?"
                multiline
                numberOfLines={4}
                value={dietaryPreferences}
                onChangeText={(text) => setDietaryPreferences(text)}
            />
            {/* Include Extra Ingredients */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                <Switch
                    value={includeExtraIngredients}
                    onValueChange={(value) => setIncludeExtraIngredients(value)}
                />
                <Text style={{ color: 'white', marginLeft: 8 }}>
                    Deliberately include recipes that incorporate one or more ingredients I have not listed
                </Text>
            </View>

            {/* Generate Recipes Button */}
            <TouchableOpacity
                style={{
                    backgroundColor: '#7bd9f1',
                    borderRadius: 5,
                    padding: 12,
                    marginTop: 16,
                    alignItems: 'center',
                }}
                onPress={handleGenerateRecipes}
            >
                <Text style={{ color: 'white', fontSize: 18 }}>Generate Recipes</Text>
            </TouchableOpacity>
        </View>
    );
};

export default InputIngredientsScreen;
