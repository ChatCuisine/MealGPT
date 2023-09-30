import React from 'react';
import { View, Text } from 'react-native';

const MyRecipesScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#121212', padding: 16 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>
                The start of the My Recipes page - here we can show a history of recipes the user has generated. 
                Do we think local storage or something like a database like Firebase? 
                Maybe this would be a fun time to experiment with a different kind of database as well? 
                I am open to it!
            </Text>
            <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>
                - I was thinking for this section having a bunch of containers/cards with titles 
                and short descriptions of the recipes. (assuming that the response from ChatGPT 
                is set up a certain way that we can get that). 
                Perhaps we can be fancy and add images as well.
            </Text>
            <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>
                - This may get complicated, but for the recipes to show up here, 
                should we make the user star it or something? 
                Otherwise, this section would be pretty huge.
            </Text>
            <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>
                - It would probably be good to have some sort of search functionality 
                at the top so that they don't have to scroll forever for old recipes they want. 
                We could save them by title. Elasticsearch might be a good option for the 
                database if this is a priority, though I am not sure they have a free tier?
            </Text>
        </View>
    );
};

export default MyRecipesScreen;
