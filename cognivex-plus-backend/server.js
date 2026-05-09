import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ IMPORTANT FIXES
app.use(cors());
app.use(express.json()); // REQUIRED or req.body = {}

const PORT = process.env.PORT || 10000;

// Health route (fixes / 404 confusion)
app.get("/", (req, res) => {
  res.send("Cognivex backend is running 🚀");
});

// Chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    console.log("🔥 HIT /api/chat");
    console.log("BODY:", req.body);

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    // 🔁 TEMP RESPONSE (replace with Groq later)
    const reply = `You said: ${message}`;

    return res.json({
      reply,
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});