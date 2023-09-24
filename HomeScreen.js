import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import BuyCarrotsModal from './BuyCarrotsModal';
import { useFonts } from "expo-font";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [isBuyCarrotsModalVisible, setIsBuyCarrotsModalVisible] = React.useState(false);

    const [fontsLoaded] = useFonts({
        BalooRegular: require("./fonts/Baloo-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={{ flex: 1 }}>
            {/* Gradient Background */}
            <LinearGradient
                colors={['#A2E1ED', '#E59758']}  // See how these work...might need to change.
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                {/* Image */}
                <Image
                    source={require('./assets/chatcuisine_home.png')}
                    style={{ width: '80%', height: '50%', resizeMode: 'contain', borderRadius: '25px' }}
                />

                {/* Title and Description */}
                <Text style={{ fontSize: 24, marginTop: 20, fontWeight: 'bold', color: 'white', fontFamily: 'BalooRegular' }}>
                    Chat Cuisine
                </Text>
                <Text style={{ width: '80%', fontSize: 14, marginTop: 10, textAlign: 'center', color: 'white', fontFamily: 'BalooRegular' }}>
                    Get some fresh and unique meal ideas based on ingredients you have. Spice up your meal life!
                </Text>

                {/* Let's Cook Button */}
                <Button
                    title="Let's cook! 🥄"
                    buttonStyle={{
                        backgroundColor: '#7bd9f1',
                        paddingVertical: 15, // Increase padding for better spacing
                        paddingHorizontal: 30, // Increase padding for better spacing
                        borderRadius: 20, // Adjust border radius
                    }}
                    titleStyle={{
                        color: 'white',
                        fontFamily: 'BalooRegular',
                        fontSize: 18, // Adjust font size
                    }}
                    raised
                    icon={{
                        name: 'ios-heart',
                        type: 'ionicon',
                        color: 'white',
                        size: 24,
                    }}
                    containerStyle={{
                        marginTop: 10, // Adjust marginTop
                        borderRadius: 20, // Adjust border radius
                        overflow: 'hidden',
                    }}
                    onPress={() => {
                        navigation.navigate('InputIngredients');
                    }}
                />
                {/* View Previous Recipes */}
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}
                    onPress={() => {
                        navigation.navigate('MyRecipes'); // Navigate to the "Recipes" screen
                    }}
                >
                    <Text style={{ fontSize: 14, marginRight: 5, color: 'white', fontFamily: 'BalooRegular' }}>View previous recipes</Text>
                    <Icon
                        name="chevron-right"
                        type="font-awesome"
                        size={14}
                        color="#FFF"
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
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', fontFamily: 'BalooRegular' }}>10🥕</Text>
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

