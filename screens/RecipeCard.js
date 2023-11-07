import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RecipeCard = ({ meal, openRecipeDetails, isFavorite, toggleFavorite }) => {
    return (
        <TouchableOpacity onPress={() => openRecipeDetails(meal)}>
            <View>
                <Text>{meal.title}</Text>
                <Text>{meal.sub_caption}</Text>
                <View>
                    <Text>Prep Time: {meal.prep_time} mins</Text>
                    <Text>Difficulty: {meal.difficulty}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => toggleFavorite(meal)}>
                        {isFavorite ? '💙' : '❤️'}
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default RecipeCard;
