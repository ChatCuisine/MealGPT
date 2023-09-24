// HomeScreen.js

import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import BuyCarrotsModal from "./BuyCarrotsModal";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isBuyCarrotsModalVisible, setIsBuyCarrotsModalVisible] =
    React.useState(false);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["85%"];

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        {/* Gradient Background */}
        <LinearGradient
          colors={["#82909a", "#a05d44"]} // See how these work...might need to change.
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* Image */}
          <Image
            source={require("./assets/chatcuisine_home.png")}
            style={{
              width: "70%",
              height: "50%",
              resizeMode: "stretch",
              borderRadius: 25,
            }}
          />

          {/* Title and Description */}
          <Text
            style={{
              fontSize: 24,
              marginTop: 20,
              fontWeight: "bold",
              color: "#faf0de",
            }}
          >
            Chat Cuisine
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 10,
              textAlign: "center",
              width: "68%",
              color: "#faf0de",
            }}
          >
            Get some fresh and unique meal ideas based on ingredients you have.
            Spice up your meal life!
          </Text>

          <Button
            title="Let's cook 🍴"
            titleStyle={{
              fontWeight: "bold",
            }}
            containerStyle={{
              borderRadius: 30,
              overflow: "hidden",
              width: "50%",
              marginTop: 20,
              color: "#faf0de",
            }}
            onPress={() => {
              navigation.navigate("Define Your Recipe"); // Navigate to the "InputIngredients" screen
            }}
          />

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={() => {
              navigation.navigate("MyRecipes"); // Navigate to the "Recipes" screen
            }}
          >
            <Text style={{ fontSize: 12, marginRight: 5, color: "#faf0de" }}>
              View previous recipes
            </Text>
            <Icon
              name="chevron-right"
              type="font-awesome"
              size={10}
              color="#faf0de"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 35,
              width: "32%",
              height: "11%",
            }}
            onPress={handlePresentModal}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
              }}
            >
              10 🥕
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Render BuyCarrotsModal */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <View>
            <Text>Hello</Text>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;
