# Cognivex+

Cognivex+ is a modern AI chatbot web application powered by Groq LLM (Llama 3), built with a responsive frontend and a Node.js backend deployed using Vercel and Render.

---

## 🚀 Features

- 💬 ChatGPT-style conversational UI  
- 📱 Fully responsive (mobile + desktop)  
- 📂 Sidebar with mobile sliding support  
- ⚡ Fast AI responses using Groq API  
- 🔗 Clean frontend-backend separation  
- 🎨 Modern dark UI design  

---

## 🧠 Tech Stack

- Frontend: HTML, CSS, JavaScript (Vercel)  
- Backend: Node.js, Express (Render)  
- AI Model: Groq API (Llama 3)  
- Hosting: Vercel (frontend) + Render (backend)  

---

## 📁 Project Structure

### 🌐 Frontend (Vercel)

index.html
style.css
app.js
logo.png
favicon.ico


---

### ⚙️ Backend (Render)

server.js
package.json
.env (local only)
node_modules/


---

## 🔌 API Endpoint

### POST `/api/chat`

### Request
```json
{
  "message": "Hello"
}
Response
{
  "reply": "AI-generated response here"
}