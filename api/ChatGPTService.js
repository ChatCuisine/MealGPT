import axios from 'axios';

const BASE_URL = 'https://api.openai.com/v1/chat'; // Replace with the ChatGPT API base URL

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createChatCompletion = async (prompt) => {
    try {
        const response = await axiosInstance.post('/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system', content: `You are a professional and knowledgeable meal planner. 
                                            You help people create meals from ingredients they give.
                                            You can assume they have water, oil, salt, and butter.
                                            Please provide 3 meals, listed with bullets, as best as you 
                                            can given the guidelines provided by the user's prompt, including 
                                            the ingredients that they have, the nutrition guidelines they
                                            provide, and more.` },
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
