
/* ================= SIDEBAR ================= */
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

/* close sidebar on outside click */
document.addEventListener("click", function (e) {
    const sidebar = document.getElementById("sidebar");
    const btn = document.querySelector(".menu-btn");

    if (window.innerWidth <= 768) {
        if (
            sidebar.classList.contains("active") &&
            !sidebar.contains(e.target) &&
            !btn.contains(e.target)
        ) {
            sidebar.classList.remove("active");
        }
    }
});

/* ================= NEW CHAT ================= */
function newChat() {
    document.getElementById("chat-area").innerHTML = "";
}

/* ================= SEND MESSAGE ================= */
async function sendMessage() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();

    if (!text) return;

    addMessage("user", text);
    input.value = "";
    autoResize();

    try {
        const res = await fetch("https://cognivex-plus-1.onrender.com/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: text })
        });

        const data = await res.json();

        addMessage("bot", data.reply || "No response");

    } catch (error) {
        addMessage("bot", "Error connecting to server ?");
    }
}

/* ================= ADD MESSAGE ================= */
function addMessage(type, text) {
    const chat = document.getElementById("chat-area");

    const msg = document.createElement("div");
    msg.className = "message " + type;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    msg.appendChild(bubble);
    chat.appendChild(msg);

    chat.scrollTop = chat.scrollHeight;
}

/* ================= EVENTS ================= */
document.getElementById("send-btn").addEventListener("click", sendMessage);

const input = document.getElementById("user-input");

function autoResize() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 140) + "px";
}

input.addEventListener("input", autoResize);

/* desktop: enter sends, mobile: newline only */
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {

        if (window.innerWidth > 768) {
            e.preventDefault();
            sendMessage();
        }
    }
});