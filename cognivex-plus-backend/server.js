import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Groq safely
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Health check route
app.get("/", (req, res) => {
    res.send("Cognivex+ backend running 🚀");
});

// Chat route
app.post("/api/chat", async (req, res) => {
    try {
        console.log("🔥 HIT /api/chat");
        console.log("BODY:", req.body);

        const message = req.body?.message;

        if (!message || message.trim() === "") {
            return res.status(400).json({
                error: "Message is required"
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

        return res.json({
            reply: completion.choices[0].message.content
        });

    } catch (error) {
        console.error("❌ Backend Error:", error);
        return res.status(500).json({
            error: error.message
        });
    }
});

// Use Render port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});