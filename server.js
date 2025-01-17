require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Use fetch for making API calls

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

// Endpoint to handle chat messages
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://api.perplexity.ai/v1/query', { // Adjust the endpoint as necessary
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`, // Use your Perplexity API key
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: userMessage }), // Adjust the payload as necessary
        });

        console.log("response", response)

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        const botMessage = data.response; // Adjust based on the actual response structure from Perplexity
        res.json({ reply: botMessage });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' }); // Respond with a JSON error message for 404
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
