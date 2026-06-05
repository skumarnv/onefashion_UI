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
  Grid,
  Card,
  CardContent,
  Button,
  Zoom,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import DevicesIcon from "@mui/icons-material/Devices";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DiamondIcon from "@mui/icons-material/Diamond";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ProductList from "../../components/Product/ProductList";
import axios from "axios";
import robotImage from "../../assets/jpg/friendly-robot.jpg";
import "./Dashboard.css";

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
      const res = await axios.post("https://ethical-twyla-skumarnv-org-914372d4.koyeb.app/api/ai/ask", {
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

  const getCategoryIcon = (category) => {
    switch (category) {
      case "electronics":
        return <DevicesIcon sx={{ fontSize: 40 }} />;
      case "men's clothing":
        return <CheckroomIcon sx={{ fontSize: 40 }} />;
      case "women's clothing":
        return <ShoppingBagIcon sx={{ fontSize: 40 }} />;
      case "jewelery":
        return <DiamondIcon sx={{ fontSize: 40 }} />;
      default:
        return <CategoryIcon sx={{ fontSize: 40 }} />;
    }
  };

  const getCategoryGradient = (category) => {
    switch (category) {
      case "electronics":
        return "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)";
      case "men's clothing":
        return "linear-gradient(135deg, #581c87 0%, #8b5cf6 100%)";
      case "women's clothing":
        return "linear-gradient(135deg, #831843 0%, #ec4899 100%)";
      case "jewelery":
        return "linear-gradient(135deg, #78350f 0%, #f59e0b 100%)";
      default:
        return "linear-gradient(135deg, #1e293b 0%, #475569 100%)";
    }
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
            onClick={() => setSelectedCategory(null)}
            sx={{ flexGrow: 1, ml: 2, fontWeight: 600, cursor: "pointer" }}
          >
            OneFashion
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
            {/* HOME LINK */}
            <ListItemButton
              onClick={() => {
                setSelectedCategory(null);
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>

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
          pb: 6,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
          {selectedCategory ? (
            <>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setSelectedCategory(null)}
                sx={{ mb: 3 }}
              >
                ← Back to Dashboard Home
              </Button>
              
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {selectedCategory}
              </Typography>

              <ProductList category={selectedCategory} />
            </>
          ) : (
            // Upgraded Premium E-Commerce Dashboard Home
            <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
              
              {/* HERO GREETING BANNER */}
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "24px",
                  p: { xs: 4, md: 6 },
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Visual glow circles in the background */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "250px",
                    height: "250px",
                    background: "rgba(99, 102, 241, 0.2)",
                    borderRadius: "50%",
                    filter: "blur(60px)",
                    zIndex: 0,
                  }}
                />
                
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 2,
                    }}
                  >
                    Welcome Back, {user?.name ?? "Guest"}!
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.85, fontWeight: 400, maxWidth: "600px", lineHeight: 1.6 }}>
                    Explore today's handpicked collections, keep track of your favorite styles, and use our AI Assistant to find matching outfits.
                  </Typography>
                </Box>
              </Box>

              {/* QUICK SHOPPING STATS */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(8px)",
                      color: "#fff",
                      borderRadius: "16px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-4px)" }
                    }}
                  >
                    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ background: "rgba(59, 130, 246, 0.15)", p: 1.5, borderRadius: "12px", display: "flex" }}>
                        <ShoppingBagIcon sx={{ color: "#3b82f6", fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography variant="h5" fontWeight={700}>3 Items</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>Currently in Cart</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(8px)",
                      color: "#fff",
                      borderRadius: "16px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-4px)" }
                    }}
                  >
                    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ background: "rgba(236, 72, 153, 0.15)", p: 1.5, borderRadius: "12px", display: "flex" }}>
                        <FavoriteIcon sx={{ color: "#ec4899", fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography variant="h5" fontWeight={700}>12 Items</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>Saved in Wishlist</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(8px)",
                      color: "#fff",
                      borderRadius: "16px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-4px)" }
                    }}
                  >
                    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ background: "rgba(245, 158, 11, 0.15)", p: 1.5, borderRadius: "12px", display: "flex" }}>
                        <LocalOfferIcon sx={{ color: "#f59e0b", fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography variant="h5" fontWeight={700}>2 Active</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>Promo Coupons Available</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* DYNAMIC CATEGORY EXPLORER */}
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, opacity: 0.9 }}>
                  Explore Collections
                </Typography>
                
                <Grid container spacing={3}>
                  {categories.map((cat) => (
                    <Grid item xs={12} sm={6} md={3} key={cat}>
                      <Card
                        onClick={() => setSelectedCategory(cat)}
                        sx={{
                          height: "180px",
                          background: getCategoryGradient(cat),
                          color: "#fff",
                          borderRadius: "20px",
                          cursor: "pointer",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 20px 35px rgba(0,0,0,0.35)",
                            "& .category-icon-bg": {
                              transform: "scale(1.2) rotate(10deg)",
                              opacity: 0.25,
                            }
                          }
                        }}
                      >
                        <CardContent
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            p: 3,
                          }}
                        >
                          {/* Absolute Icon Background decoration */}
                          <Box
                            className="category-icon-bg"
                            sx={{
                              position: "absolute",
                              right: "-10px",
                              bottom: "-10px",
                              opacity: 0.12,
                              transition: "transform 0.4s",
                              "& svg": { fontSize: 100 }
                            }}
                          >
                            {getCategoryIcon(cat)}
                          </Box>

                          <Box sx={{ display: "flex" }}>
                            {getCategoryIcon(cat)}
                          </Box>

                          <Box sx={{ zIndex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                textTransform: "capitalize",
                                letterSpacing: "0.05em"
                              }}
                            >
                              {cat}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>
                              Explore items →
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

            </Box>
          )}
        </Box>
      </Box>
      
      {/* CHATBOT POPUP (SQUARE STYLE WINDOW) */}
      <Zoom in={chatbotOpen}>
        <Card
          sx={{
            position: "fixed",
            bottom: 110,
            top: 52,
            right: 85,
            width: 380,
            height: 500,
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "20px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
            zIndex: 1400,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>

            {/* HEADER */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                pb: 1.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <img
                  src={robotImage}
                  alt="Helper"
                  style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
                />
                <Typography variant="h6" fontWeight={600}>AI Assistant</Typography>
              </Box>
              
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <Tooltip title="Clear chat">
                  <IconButton
                    size="small"
                    sx={{ color: "rgba(255, 255, 255, 0.6)", "&:hover": { color: "#fff" } }}
                    onClick={() =>
                      setMessages([
                        { sender: "bot", text: "👋 Chat cleared. Ask me again!" },
                      ])
                    }
                  >
                    🧹
                  </IconButton>
                </Tooltip>
                
                <IconButton
                  size="small"
                  onClick={() => setChatbotOpen(false)}
                  sx={{ color: "rgba(255, 255, 255, 0.6)", "&:hover": { color: "#fff" } }}
                >
                  ✖
                </IconButton>
              </Box>
            </Box>

            {/* CHAT MESSAGES */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                pr: 0.5,
                mb: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                // Custom thin scrollbar
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "rgba(255, 255, 255, 0.25)",
                },
              }}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "80%",
                      p: 1.5,
                      borderRadius: "16px",
                      borderTopRightRadius: msg.sender === "user" ? "2px" : "16px",
                      borderTopLeftRadius: msg.sender !== "user" ? "2px" : "16px",
                      background:
                        msg.sender === "user"
                          ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                          : "rgba(30, 41, 59, 0.95)",
                      border: msg.sender === "user" ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                      color: "#fff",
                      wordBreak: "break-word",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                      {msg.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* INPUT */}
            <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#fff",
                  outline: "none",
                }}
              />

              <IconButton
                onClick={handleSend}
                sx={{
                  background: "#3b82f6",
                  color: "#fff",
                  "&:hover": { background: "#2563eb" }
                }}
              >
                ➤
              </IconButton>
            </Box>

          </Box>
        </Card>
      </Zoom>
      {/* FLOATING WELCOME SPEECH BUBBLE */}
      {!chatbotOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 108,
            right: 32,
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            px: 1.8,
            py: 1.2,
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: 500,
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
            zIndex: 1400,
            animation: "pulseBubble 3s infinite ease-in-out",
            pointerEvents: "none",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-6px",
              right: "24px",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid rgba(15, 23, 42, 0.95)",
            }
          }}
        >
          Hi, how can I help you?
        </Box>
      )}

      {/* FLOATING ACTION CHATBOT ROBOT BUTTON */}
      <IconButton
        onClick={() => setChatbotOpen(!chatbotOpen)}
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          width: 64,
          height: 64,
          zIndex: 1400,
          p: 0,
          overflow: "hidden",
          border: "2px solid #3b82f6",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: "0 15px 30px rgba(59, 130, 246, 0.5)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        <img
          src={robotImage}
          alt="Chatbot Helper"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </IconButton>
    </Box>
  );
};

export default DashboardLayout;
