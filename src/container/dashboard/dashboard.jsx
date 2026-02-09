import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CategoryIcon from "@mui/icons-material/Category";
import ProductList from "../product/productList";
import axios from "axios";

const drawerWidth = 260;

const DashboardLayout = ({ user, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsOpen, setProductsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 Ask me about products or categories." }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);


  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  const buildProductContext = () => {
    if (!selectedCategory) return "";

    return `
      User is browsing category: ${selectedCategory}.
      Available categories:
      - electronics
      - men's clothing
      - women's clothing
      - jewelery

      Answer based on these categories.
`;
  };

  const isNavigationIntent = (msg) => {
    return /(open|show|go to|navigate|display|take me)/i.test(msg);
  };

  const isMen = (msg) => {
    return /\bmen\b|\bmens\b|\bmen's\b/i.test(msg);
  };

  const isWomen = (msg) => {
    return /\bwomen\b|\bwomens\b|\bwomen's\b/i.test(msg);
  };

  const isElectronics = (msg) => {
    return /\belectronics?\b|\bgadgets?\b|\bdevices?\b/i.test(msg);
  };

  const isJewelry = (msg) => {
    return /\bjewel(l)?ery\b|\bjewels?\b|\bornaments?\b/i.test(msg);
  };


  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    const msg = userMessage.toLowerCase();

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
    ]);

    setInput("");

    // 🧠 STEP 1: HANDLE NAVIGATION INTENT (NO AI)
    if (isNavigationIntent(msg)) {

      if (isMen(msg)) {
        setSelectedCategory("men's clothing");
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: "👔 Opening Men's Clothing for you!" }
        ]);
        return;
      }

      if (isWomen(msg)) {
        setSelectedCategory("women's clothing");
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: "👗 Opening Women's Clothing for you!" }
        ]);
        return;
      }

      if (isElectronics(msg)) {
        setSelectedCategory("electronics");
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: "📱 Opening Electronics!" }
        ]);
        return;
      }

      if (isJewelry(msg)) {
        setSelectedCategory("jewelery"); // fakestore spelling
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: "💍 Opening Jewelry!" }
        ]);
        return;
      }
    }


    // 🤖 STEP 2: AI RESPONSE (NO NAVIGATION)
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "🤖 Thinking..." },
    ]);

    setTyping(true);

    try {
      const res = await axios.post("https://localhost:7236/api/ai/ask", {
        message: buildProductContext() + "\nUser question: " + userMessage,
      });

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "bot", text: res.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "bot", text: "⚠️ Something went wrong." },
      ]);
    }

    setTyping(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "var(--app-gradient)" }}>
      {/* TOP BAR */}
      <AppBar
        position="fixed"
        sx={{
          height: 64,
          background: "var(--app-gradient)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        <Toolbar>
          {/* MENU ICON */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, ml: 2, fontWeight: 600 }}
          >
            My Dashboard
          </Typography>

          <Typography sx={{ mr: 2 }}>
            Welcome, <strong>{user?.name ?? "Santhanam"}</strong>
          </Typography>

          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={onLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR (TEMPORARY) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)} // 👈 click outside closes
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "var(--app-gradient)",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Menu
          </Typography>

          <List>
            {/* PRODUCTS */}
            <ListItemButton
              onClick={() => setProductsOpen(!productsOpen)}
            >
              <ListItemIcon>
                <ShoppingBagIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>

            <Collapse in={productsOpen}>
              <List disablePadding>
                {categories.map((cat) => (
                  <ListItemButton
                    key={cat}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setDrawerOpen(false); // close sidebar after click
                    }}
                  >
                    <ListItemIcon>
                      <CategoryIcon sx={{ color: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={cat.charAt(0).toUpperCase() + cat.slice(1)}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            {/* CHATBOT */}
            <ListItemButton
              onClick={() => {
                setChatbotOpen(true);
                setDrawerOpen(false); // close left sidebar
              }}
            >
              <ListItemIcon>
                <SmartToyIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Chatbot" />
            </ListItemButton>

          </List>
        </Box>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box
        sx={{
          pt: "64px",
          minHeight: "100vh",
          color: "#fff",
          px: 4,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
          {selectedCategory ? (
            <>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                {selectedCategory.toUpperCase()}
              </Typography>

              <ProductList category={selectedCategory} />
            </>
          ) : (
            <Box sx={{ textAlign: "center", mt: 10 }}>
              <Typography variant="h3" fontWeight={600}>
                Dashboard Home
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.85, mt: 2 }}>
                Choose a product category from the menu to view products
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      {/* CHATBOT DRAWER (RIGHT) */}
      <Drawer
        anchor="right"
        open={chatbotOpen}
        onClose={() => setChatbotOpen(false)} // outside click closes
        sx={{
          "& .MuiDrawer-paper": {
            width: 380,
            background: "#0f172a",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>

          {/* HEADER */}
          <Tooltip title="Clear chat">
            <IconButton
              sx={{ color: "#fff" }}
              onClick={() =>
                setMessages([
                  { sender: "bot", text: "👋 Chat cleared. Ask me again!" },
                ])
              }
            >
              🧹
            </IconButton>
          </Tooltip>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">AI Assistant</Typography>
            <IconButton onClick={() => setChatbotOpen(false)} sx={{ color: "#fff" }}>
              ✖
            </IconButton>
          </Box>

          {/* CHAT MESSAGES */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              pr: 1,
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "75%",
                    p: 1.5,
                    borderRadius: 2,
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(135deg,#3b82f6,#2563eb)"
                        : "rgba(255,255,255,0.08)",
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* INPUT */}
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
              }}
            />

            <IconButton onClick={handleSend} sx={{ color: "#fff" }}>
              ➤
            </IconButton>
          </Box>

        </Box>

      </Drawer>
    </Box>
  );
};

export default DashboardLayout;
