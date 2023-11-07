import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import RecipeCard from './RecipeCard'; // Import the RecipeCard component
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyRecipesScreen = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Load the saved recipes from AsyncStorage
        const loadFavorites = async () => {
            try {
                const favoritesJSON = await AsyncStorage.getItem('favorites');
                if (favoritesJSON) {
                    const favoritesArray = JSON.parse(favoritesJSON);
                    setFavorites(favoritesArray);
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };

        loadFavorites();
    }, []);

    return (
        <View>
            <Text>My Favorite Recipes</Text>
            <FlatList
                data={favorites}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <RecipeCard
                        meal={item}
                        openRecipeDetails={openRecipeDetails}
                        isFavorite={true} // Pass the isFavorite prop based on whether the recipe is saved
                        toggleFavorite={toggleFavorite}
                    />
                )}
            />
        </View>
    );
};

export default MyRecipesScreen;
