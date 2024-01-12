import React, { useRef, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";
import { PanResponder } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRevenueCat } from "../provider/RevenueCatProvider";
import { PurchasesPackage } from "react-native-purchases";

const BuyCarrotsModal = () => {
  const navigation = useNavigation();
  const { user, packages, purchasePackage, restorePermissions } =
    useRevenueCat();

  const onPurchase = async (pack) => {
    purchasePackage(pack);
  };

  // Initialize PanResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // Check if the user has dragged the modal down by a certain amount (e.g., 50 pixels)
        if (gestureState.dy > 30) {
          // You can add any additional checks or conditions here if needed
          // Close the modal or perform any desired action
          navigation.removeListener;
          navigation.navigate("Home"); // Navigate to the "Home" screen
          //, {
          // TODO figure out this count later
          //carrotCount: amountOfCarrots,
          //updateCarrots: updateCarrots,
          //});
        }
      },
      onPanResponderRelease: () => {
        navigation.removeListener;
        navigation.navigate("Home");
        // Reset any state or perform actions when the user releases the touch
      },
    })
  ).current;

  return (
    <CarrotView>
      <ModalScroll {...panResponder.panHandlers}>
        <CustomLinearGradient colors={["#224761", "#C0BBAC", "#224761"]}>
          <ModalImage source={require("../assets/chatcuisine_carrots.png")} />
          <ModalTitle>Buy More Carrots</ModalTitle>
          <ModalDescription>
            To write exquiste recipes for yourself, our chef needs to be given
            carrots
          </ModalDescription>
          <ModalEquation>
            1 carrot = 1 inquiry to recieve 3 recipes
          </ModalEquation>
          <ModalCarrotCount>
            You currently have {user.carrots} carrot(s)
          </ModalCarrotCount>
          {packages.map((pack) => {
            return (
              <React.Fragment key={pack.identifier}>
                {pack.product.identifier ===
                  "com.chatcuisine.recipes_pack.sevens" && (
                  <PurchaseFirstButton onPress={() => onPurchase(pack)}>
                    <FirstButtonText>
                      Purchase 7 carrots for $1.99
                    </FirstButtonText>
                  </PurchaseFirstButton>
                )}
                {pack.product.identifier ===
                  "com.chatcuisine.recipes_pack.thirty" && (
                  <PurchaseSecondButton onPress={() => onPurchase(pack)}>
                    <SecondButtonText>
                      Purchase 30 carrots for $4.99
                    </SecondButtonText>
                  </PurchaseSecondButton>
                )}
              </React.Fragment>
            );
          })}
          <PurchaseRestoreButton onPress={restorePermissions}>
            <SecondButtonText>Restore</SecondButtonText>
          </PurchaseRestoreButton>
          <ModalDisclaimer>
            This app generates recipes using AI. You can purchase carrots to
            generate new recipes. We do not guarantee the quality of the AI
            generated recipes, and are not liable for any damage or losses from
            using the app. If you delete the app, you will lose all purchased
            carrots and recipes.
          </ModalDisclaimer>
        </CustomLinearGradient>
      </ModalScroll>
    </CarrotView>
  );
};

export default BuyCarrotsModal;

const CarrotView = styled.View`
  flex: 1;
`;

const CustomLinearGradient = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 55%;
`;

const ModalScroll = styled.ScrollView`
  flex: 1;
  flex-grow: 1;
  padding-bottom: 30px;
  background-color: #224761;
`;

const ModalImage = styled.Image`
  width: 75%;
  height: 50%;
  border-radius: 25px;
`;

const ModalTitle = styled.Text`
  font-size: 24px;
  margin-top: 20px;
  font-weight: 800;
  color: white;
  font-family: "BalooRegular";
`;

const ModalDescription = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  width: 68%;
  color: white;
  font-family: "BalooRegular";
`;

const ModalEquation = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  width: 68%;
  color: white;
  font-family: "BalooRegular";
`;

const ModalCarrotCount = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  width: 68%;
  color: white;
  font-family: "BalooRegular";
`;

const ModalDisclaimer = styled.Text`
  font-size: 10px;
  margin-top: 10px;
  text-align: center;
  width: 68%;
  color: white;
  font-family: "BalooRegular";
  padding-bottom: 70%;
`;

const PurchaseFirstButton = styled.TouchableOpacity`
  border-color: #7bd9f1;
  background-color: transparent;
  border-width: 2px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 100px;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const FirstButtonText = styled.Text`
  color: #7bd9f1;
  font-family: BalooRegular;
  font-size: 14px;
`;

const PurchaseSecondButton = styled.TouchableOpacity`
  background-color: #7bd9f1;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 100px;
`;

const PurchaseRestoreButton = styled.TouchableOpacity`
  background-color: #64b1c4;
  margin-top: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 100px;
`;

const SecondButtonText = styled.Text`
  color: white;
  font-family: BalooRegular;
  font-size: 14px;
`;
