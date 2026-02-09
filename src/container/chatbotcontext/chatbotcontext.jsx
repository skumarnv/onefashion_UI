import { createContext, useState } from "react";

export const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <ChatbotContext.Provider value={{ open, setOpen }}>
      {children}
    </ChatbotContext.Provider>
  );
};
