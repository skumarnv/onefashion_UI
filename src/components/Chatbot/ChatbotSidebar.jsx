import { useContext } from "react";
import { ChatbotContext } from "../../context/ChatbotContext.jsx";

const Sidebar = () => {
  const { setOpen } = useContext(ChatbotContext);

  return (
    <li onClick={() => setOpen(true)}>
      🤖 Chatbot
    </li>
  );
};

export default Sidebar;
