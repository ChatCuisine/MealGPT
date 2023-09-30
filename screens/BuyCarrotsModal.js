import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";

const BuyCarrotsModal = ({ carrotQuantity }) => {
    return (
        <CarrotView>
            <ModalScroll>
                <CustomLinearGradient colors={["#224761", "#C0BBAC", "#224761"]}>
                    <ModalImage source={require("../assets/chatcuisine_carrots.png")} />
                    <ModalTitle>Buy More Carrots</ModalTitle>
                    <ModalDescription>
                        To write exquiste recipes for yourself, our chef need to be given
                        more carrots
                    </ModalDescription>
                    <ModalEquation>1 carrot = 1 recipe</ModalEquation>
                    <ModalCarrotCount>
                        You currently have {carrotQuantity} carrot(s)
                    </ModalCarrotCount>
                    <PurchaseFirstButton>
                        <FirstButtonText>Purchase 7 carrots for $1.99</FirstButtonText>
                    </PurchaseFirstButton>
                    <PurchaseSecondButton>
                        <SecondButtonText>Purchase 30 carrots for $4.99</SecondButtonText>
                    </PurchaseSecondButton>
                    <ModalDisclaimer>
                        This app generates recipes using AI. You can purchase carrots to
                        generate new recipes. We do not guarantee the quality of the AI
                        generated recipes, and are not liable for any damage or losses from
                        using the app.
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
  padding-bottom: 30;
  background-color: #224761;
`;

const ModalImage = styled.Image`
  width: 75%;
  height: 50%;
  resize: stretch;
  border-radius: 25px;
`;

const ModalTitle = styled.Text`
  font-size: 24px;
  margin-top: 20;
  font-weight: 800;
  color: white;
  font-family: "BalooRegular";
`;

const ModalDescription = styled.Text`
  font-size: 14;
  margin-top: 10;
  text-align: center;
  width: 68%;
  color: white;
  font-family: "BalooRegular";
`;

const ModalEquation = styled.Text`
  font-size: 14;
  margin-top: 10;
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
  font-size: 10;
  margin-top: 10;
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

const SecondButtonText = styled.Text`
  color: white;
  font-family: BalooRegular;
  font-size: 14px;
`;
