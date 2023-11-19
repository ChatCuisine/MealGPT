import React, { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import BuyCarrotsModal from "./BuyCarrotsModal";
import { useFonts } from "expo-font";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetHandle,
} from "@gorhom/bottom-sheet";
import styled from "styled-components";

const HomeScreen = () => {
    const navigation = useNavigation();
    const bottomSheetModalRef = useRef(null);
    const snapPoints = ["90%"];
    const [amountOfCarrots, setAmountOfCarrots] = useState(8);
    const updateCarrots = (newAmount) => {
        setAmountOfCarrots(newAmount);
    };
    function handlePresentModal() {
        bottomSheetModalRef.current?.present();
    }

    const [fontsLoaded] = useFonts({
        BalooRegular: require("../fonts/Baloo-Regular.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }

    return (
        <BottomSheetModalProvider>
            <HomeView>
                <CustomLinearGradient colors={["#113355", "#A2E1ED", "#113355"]}>
                    <HomeImage source={require("../assets/chatcuisine_home.png")} />
                    <TitleText>Chat Cuisine</TitleText>
                    <DescriptionText>
                        Get some fresh and unique meal ideas based on ingredients you have.
                        Spice up your meal life!
                    </DescriptionText>
                    <ButtonContainer
                        onPress={() => {
                            navigation.removeListener;
                            navigation.navigate("Define Your Recipe", {
                                carrotCount: amountOfCarrots,
                                updateCarrots: updateCarrots,
                            }); // Navigate to the "InputIngredients" screen
                        }}
                    >
                        <ButtonTitle>Let's cook 🍴</ButtonTitle>
                    </ButtonContainer>

                    <PreviousTouchable
                        onPress={() => {
                            navigation.removeListener;
                            navigation.navigate("Liked Recipes"); // Navigate to the "Recipes" screen
                        }}
                    >
                        <PreviousText>View previous recipes</PreviousText>
                        <ChevronRightIcon />
                    </PreviousTouchable>
                    <CarrortsTouchable onPress={handlePresentModal}>
                        <CarrotText>{amountOfCarrots} 🥕</CarrotText>
                    </CarrortsTouchable>
                </CustomLinearGradient>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    handleComponent={() => <BottomSheetHandle style={handleStyle} />}
                >
                    <BuyCarrotsModal carrotQuantity={amountOfCarrots} />
                </BottomSheetModal>
            </HomeView>
        </BottomSheetModalProvider>
    );
};

const handleStyle = {
    backgroundColor: "#224761", // Change the background color
    width: "100%", // Change the width
    borderTopLeftRadius: 15, // Adjust the top-left border radius
    borderTopRightRadius: 15, // Adjust the top-right border radius
};

export default HomeScreen;

const HomeView = styled.View`
  flex: 1;
`;

const CustomLinearGradient = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const HomeImage = styled.Image`
  width: 80%;
  height: 50%;
  border-radius: 25px;
  margin-top: 40px;
`;

const TitleText = styled.Text`
  font-size: 24px;
  margin-top: 20px;
  font-weight: 700;
  color: #faf0de;
  font-family: "BalooRegular";
  text-align: center;
`;

const DescriptionText = styled.Text`
  font-size: 15px;
  margin-top: 10px;
  text-align: center;
  width: 68%;
  color: #faf0de;
  font-family: "BalooRegular";
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #3bb9f1;
  padding-vertical: 15px;
  padding-horizontal: 30px;
  border-radius: 20px;
  width: 50%;
  margin-top: 20px;
  color: #faf0de;
  margin-top: 10px;
  border-radius: 20px;
  overflow: hidden;
`;

const ButtonTitle = styled.Text`
  color: white;
  font-family: BalooRegular;
  font-size: 18px;
  text-align: center;
`;

const PreviousTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const PreviousText = styled.Text`
  font-size: 12px;
  margin-right: 5px;
  color: #faf0de;
  font-weight: bold;
`;

const ChevronRightIcon = styled(Icon).attrs({
    name: "chevron-right",
    type: "font-awesome",
    size: 10,
    color: "white",
})``;

const CarrortsTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  height: 10%;
`;

const CarrotText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #faf0de;
  font-family: "BalooRegular";
`;
