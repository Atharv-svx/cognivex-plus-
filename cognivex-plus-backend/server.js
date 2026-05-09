import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔐 Safe Groq initialization
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// ✅ Health check route
app.get("/", (req, res) => {
    res.send("Cognivex+ backend running 🚀");
});

// 🤖 Chat endpoint
app.post("/api/chat", async (req, res) => {
    try {
        console.log("🔥 HIT /api/chat");
        console.log("BODY:", req.body);

        // ✅ Safe message extraction
        const message = req.body?.message;

        if (!message || message.trim() === "") {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        // 🤖 Call Groq API
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
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

        // ✅ Send response
        return res.json({
            reply: completion.choices[0].message.content
        });

    } catch (error) {
        console.error("❌ Backend Error:", error);

        return res.status(500).json({
            error: error.message || "Internal Server Error"
        });
    }
});

// 🌐 Port binding for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});