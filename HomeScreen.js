import React, { useRef } from "react";
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["85%"];
  const amountOfCarrots = 8;
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
      <View style={{ flex: 1 }}>
        {/* Gradient Background */}
        <LinearGradient
          colors={["#A2E1ED", "#E59758"]} // See how these work...might need to change.
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* Image */}
          <Image
            source={require("./assets/chatcuisine_home.png")}
            style={{
              width: "80%",
              height: "50%",
              resizeMode: "stretch",
              borderRadius: 25,
              marginTop: 40,
            }}
          />

          {/* Title and Description */}
          <Text
            style={{
              fontSize: 24,
              marginTop: 20,
              fontWeight: "bold",
              color: "white",
              fontFamily: "BalooRegular",
            }}
          >
            Chat Cuisine
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 10,
              textAlign: "center",
              width: "68%",
              color: "white",
              fontFamily: "BalooRegular",
            }}
          >
            Get some fresh and unique meal ideas based on ingredients you have.
            Spice up your meal life!
          </Text>

          {/* Let's Cook Button */}
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
              navigation.removeListener;
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
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                fontFamily: "BalooRegular",
              }}
            >
              {amountOfCarrots} 🥕
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Render BuyCarrotsModal */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <BuyCarrotsModal carrotQuantity={amountOfCarrots} />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;
