require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS middleware

const app = express();
const port = 3003;

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Endpoint to handle chat messages
app.post('/message', async (req, res) => {
    const messages = req.body.message;

    try {
        // const response = await fetch('https://api.perplexity.ai/v1/query', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ prompt: userMessage }),
        // });
        // res.json({ response });

        // if (!response.ok) {
        //     throw new Error(`Error: ${response.statusText}`);
        // }

        // const data = await response.json();
        // const botMessage = data.response; // Adjust based on the actual response structure from Perplexity
        // res.json({ reply: botMessage });

        const options = {
            method: 'POST',
            headers: {Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({ messages, model:"llama-3.1-sonar-small-128k-online" })
        };
          
        await fetch('https://api.perplexity.ai/chat/completions', options)
            .then(response => response.json())
            .then(response => res.json({ response }))
            .catch(err => console.error(err));
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
