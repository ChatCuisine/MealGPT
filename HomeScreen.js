import React, { useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import BuyCarrotsModal from "./BuyCarrotsModal";
import { useFonts } from "expo-font";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import styled from "styled-components";

const HomeScreen = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["85%"];
  const [amountOfCarrots, setAmountOfCarrots] = useState(8);
  const updateCarrots = (newAmount) => {
    setAmountOfCarrots(newAmount);
  };
  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  const [fontsLoaded] = useFonts({
    BalooRegular: require("./fonts/Baloo-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <BottomSheetModalProvider>
      <HomeView>
        <LinearGradient
          colors={["#A2E1ED", "#E59758"]}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <HomeImage source={require("./assets/chatcuisine_home.png")} />
          <TitleText>Chat Cuisine</TitleText>
          <DescriptionText>
            Get some fresh and unique meal ideas based on ingredients you have.
            Spice up your meal life!
          </DescriptionText>
          <Button
            title="Let's cook 🍴"
            titleStyle={{
              color: "white",
              fontFamily: "BalooRegular",
              fontSize: 18,
            }}
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
            onPress={() => {
              navigation.removeListener;
              navigation.navigate("Define Your Recipe", {
                carrotCount: amountOfCarrots,
                updateCarrots: updateCarrots,
              }); // Navigate to the "InputIngredients" screen
            }}
          />

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={() => {
              navigation.removeListener;
              navigation.navigate("MyRecipes"); // Navigate to the "Recipes" screen
            }}
          >
            <PreviousText>View previous recipes</PreviousText>
            <Icon
              name="chevron-right"
              type="font-awesome"
              size={10}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              width: "32%",
              height: "14%",
            }}
            onPress={handlePresentModal}
          >
            <CarrotText>{amountOfCarrots} 🥕</CarrotText>
          </TouchableOpacity>
        </LinearGradient>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <BuyCarrotsModal carrotQuantity={amountOfCarrots} />
        </BottomSheetModal>
      </HomeView>
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;

const HomeView = styled.View`
  flex: 1;
`;

const CookButton = styled.Button`
  padding-left: 13px;
  padding-right: 13px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;
const CarrotText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #faf0de;
  font-family: "BalooRegular";
`;

const PreviousText = styled.Text`
  font-size: 12px;
  margin-right: 5px;
  color: #faf0de;
`;

const DescriptionText = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  width: 68%;
  color: #faf0de;
  font-family: "BalooRegular";
`;

const TitleText = styled.Text`
  font-size: 24px;
  margin-top: 20px;
  font-weight: 700;
  color: #faf0de;
  font-family: "BalooRegular";
`;

const HomeImage = styled.Image`
  width: 80%;
  height: 50%;
  border-radius: 25px;
  margin-top: 40px;
`;
