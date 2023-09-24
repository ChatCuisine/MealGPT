// HomeScreen.js

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import BuyCarrotsModal from './BuyCarrotsModal';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [isBuyCarrotsModalVisible, setIsBuyCarrotsModalVisible] = React.useState(false);

    return (
        <View style={{ flex: 1 }}>
            {/* Gradient Background */}
            <LinearGradient
                colors={['#82909a', '#a05d44']}  // See how these work...might need to change.
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                {/* Image */}
                <Image
                    source={require('./assets/chatcuisine_home.png')}
                    style={{ width: '80%', height: '50%', resizeMode: 'contain' }}
                />

                {/* Title and Description */}
                <Text style={{ fontSize: 24, marginTop: 20, fontWeight: 'bold' }}>
                    Chat Cuisine
                </Text>
                <Text style={{ fontSize: 12, marginTop: 10, textAlign: 'center' }}>
                    Get some fresh and unique meal ideas based on ingredients you have. Spice up your meal life!
                </Text>

                {/* Let's Cook Button */}
                <Button
                    title="Let's cook! 🥄"
                    buttonStyle={{ backgroundColor: '#7bd9f1', marginTop: 20 }}
                    titleStyle={{ color: 'white' }}
                    containerStyle={{ borderRadius: 30, overflow: 'hidden' }}
                    raised
                    icon={
                        <Icon
                            name="ios-heart"
                            type="ionicon"
                            color="white"
                            size={24}
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    onPress={() => {
                        navigation.navigate('InputIngredients'); // Navigate to the "InputIngredients" screen
                    }}
                />
                {/* View Previous Recipes */}
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}
                    onPress={() => {
                        navigation.navigate('MyRecipes'); // Navigate to the "Recipes" screen
                    }}
                >
                    <Text style={{ fontSize: 12, marginRight: 5 }}>View previous recipes</Text>
                    <Icon
                        name="chevron-right"
                        type="font-awesome"
                        size={14}
                        color="#333"
                    />
                </TouchableOpacity>
            </LinearGradient>

            {/* Buy Carrots Section */}
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#7bd9f1' }}
                onPress={() => {
                    setIsBuyCarrotsModalVisible(true); // Show the Buy Carrots modal
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>10🥕</Text>
            </TouchableOpacity>

            {/* Render BuyCarrotsModal */}
            <BuyCarrotsModal
                isVisible={isBuyCarrotsModalVisible}
                onClose={() => {
                    setIsBuyCarrotsModalVisible(false); // Close the Buy Carrots modal
                }}
            />
        </View>
    );
};

export default HomeScreen;

