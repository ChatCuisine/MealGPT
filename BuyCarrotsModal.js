import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

/*This modal is to allow the user to buy "carrots" to use like tokens for generating recipes*/
/*TODO a lot to alter/add here. I am thinking we give the user like 3 free carrots and then charge $2 per 7 carrots?*/
const BuyCarrotsModal = ({ isVisible, onClose }) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
        >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    {/* Modal content */}
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Buy Carrots</Text>
                    {/* Add more content for purchasing carrots here... 
                        I think it would be nice to add an integration with applepay here*/}
                    <TouchableOpacity onPress={onClose}>
                        <Text style={{ color: 'blue' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default BuyCarrotsModal;
