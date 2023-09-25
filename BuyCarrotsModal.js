import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-elements";

/*TODO a lot to alter/add here. I am thinking we give the user like 3 free carrots and then charge $2 per 7 carrots?*/
const BuyCarrotsModal = ({ carrotQuantity }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
      >
        <LinearGradient
          colors={["#A2E1ED", "#E59758"]} // See how these work...might need to change.
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "60%",
          }}
        >
          <Image
            source={require("./assets/chatcuisine_home.png")}
            style={{
              width: "75%",
              height: "50%",
              resizeMode: "stretch",
              borderRadius: 25,
            }}
          />
          <Text
            style={{
              fontSize: 24,
              marginTop: 20,
              fontWeight: "bold",
              color: "white",
              fontFamily: "BalooRegular",
            }}
          >
            Buy More Carrots
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
            To write exquiste recipes for yourself, our chef need to be given
            more carrots
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
            1 carrot = 1 recipe
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
            You currently have {carrotQuantity} carrot
          </Text>

          <Button
            title="Purchase 7 carrots for $1.99"
            buttonStyle={{
              borderColor: "#7bd9f1",
              backgroundColor: "transparent",
              borderWidth: 2,
              paddingVertical: 15,
              paddingHorizontal: 30,
              borderRadius: 100,
            }}
            titleStyle={{ color: "#7bd9f1" }}
            style={{ padding: 15 }}
          />
          <Button
            title="Purchase 30 carrots for $4.99"
            buttonStyle={{
              backgroundColor: "#7bd9f1",
              paddingVertical: 15,
              paddingHorizontal: 30,
              borderRadius: 100,
            }}
          />

          <Text
            style={{
              fontSize: 10,
              marginTop: 10,
              textAlign: "center",
              width: "68%",
              color: "white",
              fontFamily: "BalooRegular",
              paddingBottom: "70%",
            }}
          >
            This app generates stories using AI. You can purchase coins to
            generate new stories. We do not gurantee the quality of the AI
            generated stories, and are not liable for any damage or losses from
            using the app
          </Text>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default BuyCarrotsModal;
