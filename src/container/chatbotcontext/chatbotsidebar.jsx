import { useContext } from "react";
import { ChatbotContext } from "../chatbotcontext/chatbotcontext.jsx";

const Sidebar = () => {
  const { setOpen } = useContext(ChatbotContext);

  return (
    <li onClick={() => setOpen(true)}>
      🤖 Chatbot
    </li>
  );
};
