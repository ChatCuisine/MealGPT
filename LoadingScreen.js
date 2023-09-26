import React from 'react';
import { View, Text } from 'react-native';
import styled from "styled-components";

// TODO we can make stuff into styled stuff if we want to- 
// since there isnt much being reused here though i dont really care either way
const LoadingScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#121212', padding: 16 }}>
            <LoadingImage source={require("./assets/chatcuisine_carrots.png")} />
            <Text style={{ color: 'white', fontSize: 16 }}>
                Loading...
            </Text>
        </View>
    );
};

export default LoadingScreen;

const LoadingImage = styled.Image`
  width: 80%;
  max-height: 50%;
  border-radius: 25px;
  margin-top: 10%;
`;
