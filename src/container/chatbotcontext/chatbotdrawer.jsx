import { useContext } from "react";
import { ChatbotContext } from "../chatbotcontext/chatbotcontext.jsx";

const ChatbotDrawer = () => {
  const { open, setOpen } = useContext(ChatbotContext);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 100
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          height: "100vh",
          width: "380px",
          background: "#0f172a",
          color: "white",
          zIndex: 101,
          padding: "16px",
          transition: "0.3s"
        }}
      >
        <header style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>AI Assistant</h3>
          <button onClick={() => setOpen(false)}>✖</button>
        </header>

        {/* Chat Body */}
        <div style={{ marginTop: 16, height: "80%", overflowY: "auto" }}>
          <p>👋 Hi! Ask me about products.</p>
        </div>

        {/* Input */}
        <input
          placeholder="Ask something..."
          style={{ width: "100%", padding: 8 }}
        />
      </div>
    </>
  );
};

export default ChatbotDrawer;
