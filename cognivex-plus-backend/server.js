import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import Groq from "groq-sdk";

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.get("/", (req, res) => {
    res.send("Cognivex+ backend running 🚀");
	console.log("Message received:", message);
	console.log(response);
});

app.post("/api/chat", async (req, res) => {
    try {

        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "No message provided"
            });
        }

        const completion = await groq.chat.completions.create({
            model: "llama3-8b-8192",
            messages: [
                {
                    role: "system",
                    content: "You are Cognivex+, a helpful AI assistant."
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });

        res.json({
            reply: completion.choices[0].message.content
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});