import axios from 'axios';

const BASE_URL = 'https://api.openai.com/v1/chat';

export const createChatCompletion = async (prompt, apiKey) => {
    try {
        const axiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        const response = await axiosInstance.post('/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system', content: `You are a professional and knowledgeable meal planner. 
                                            You help people create meals from ingredients they give.
                                            You can assume they have water, oil, salt, and butter.
                                            Please provide exactly 3 meals, no more and no less,
                                            as best as you can given the guidelines
                                            provided by the user's prompt, including the ingredients 
                                            that they have, the nutrition guidelines they provide, and more.
                                            You do not have to use all of the ingredients they provide
                                            if they do not work well together; the main goal is to 
                                            suggest fun new meals for the user to try that taste good.
                                            You give simple, yet detailed instructions for preparing the meals.
                                            
                                            I want the response to be in JSON format. 
                                            For each of the 3 meal objects in the list of meals ("meals"), please include:
                                            - the title of the meal ("title"), 
                                            - a sub caption ("sub_caption"), 
                                            - the estimated time in minutes to prepare the meal ("prep_time"), 
                                            - the level of difficulty to prepare ("difficulty"), 
                                            - list of ingredients, including amount of each ingredient, as a list of strings ("ingredients"), 
                                            - and the instructions as an array of step-by-step instructions 
                                                to make the meal ("instructions").
                                            Only output this JSON object and no extra text please.
                                            Also, if possible, make the meal something fun and interesting
                                            for the user.
                                            
                                            One more thing - if the user tries to input values that are
                                            not food related, please ignore those, and if the input 
                                            is purposefully inappropriate, you can simply return 
                                            "Please only enter appropriate items" without JSON formatting.` },
                { role: 'user', content: prompt },
            ],
        });

        if (response.status === 200 && response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].message.content;
        } else {
            throw new Error('Invalid response from ChatGPT');
        }
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            throw new Error('ChatGPT API Error: ' + error.response.data.error.message);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from the server');
            throw new Error('No response from ChatGPT server');
        } else {
            // Something happened in setting up the request or other errors
            console.error('Request error:', error.message);
            throw new Error('Request error: ' + error.message);
        }
    }
};
