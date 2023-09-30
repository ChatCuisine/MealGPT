import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, Easing, Text } from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { OPENAI_API_KEY } from '@env';
import { createChatCompletion } from '../api/ChatGPTService';

const LoadingScreen = ({ route }) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState('');
    const [error, setError] = useState(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const apiKey = OPENAI_API_KEY;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userPrompt = route.params.userPrompt;
                const axiosInstance = axios.create({
                    baseURL: 'https://api.openai.com/v1/completions',
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                });

                const chatResponse = await createChatCompletion(userPrompt, axiosInstance);
                setResponse(chatResponse);
                setIsLoading(false);

                // Fade in the response text
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }).start();
            } catch (err) {
                setError(err.message || 'An error occurred');
                setIsLoading(false);
            }
        };

        fetchData();
    }, [route.params.userPrompt]);

    return (
        <Container>
            <LoadingImage source={require('../assets/chatcuisine_loadingrecipes.png')} />
            {isLoading ? (
                <LoadingView>
                    <ActivityIndicator size="large" color="white" style={{ marginTop: 16 }} />
                    <LoadingText>Our rabbits are dreaming up your cuisine... this may take up to 30 seconds.</LoadingText>
                </LoadingView>
            ) : (
                <Animated.View style={{ opacity: fadeAnim }}>
                    <ResponseText>{response}</ResponseText>
                </Animated.View>
            )}
            {!isLoading && error && <ErrorText>{error}</ErrorText>}
        </Container>
    );
};

export default LoadingScreen;

const Container = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 16px;
  align-items: center;
`;

const LoadingView = styled.View`
  align-items: center;
`;

const LoadingImage = styled.Image`
  width: 80%;
  max-height: 50%;
  border-radius: 25px;
  margin-top: 10%;
`;

const LoadingText = styled.Text`
  color: white;
  font-size: 16px;
  margin-top: 16px;
`;

const ResponseText = styled.Text`
  color: white;
  font-size: 16px;
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
`;
