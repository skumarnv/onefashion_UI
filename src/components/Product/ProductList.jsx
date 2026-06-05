import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  CircularProgress,
} from "@mui/material";

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        const filtered = data.filter(
          (item) => item.category === category
        );

        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (!category) {
    return (
      <Typography variant="h6" sx={{ opacity: 0.8 }}>
        Select a product category from the sidebar
      </Typography>
    );
  }

  if (loading) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 3,
        width: "100%",
      }}
    >
      {products.map((product) => (
        <Card
          key={product.id}
          sx={{
            height: "100%",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(6px)",
            color: "#fff",
            borderRadius: 3,
            transition: "transform .25s",
            "&:hover": {
              transform: "translateY(-6px)",
            },
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{
              height: 200,
              objectFit: "contain",
              background: "#fff",
              p: 2,
            }}
          />

          <CardContent>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {product.title}
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.85, mt: 1 }}>
              ₹ {product.price}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Rating
                value={product.rating.rate}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography variant="caption" sx={{ ml: 1 }}>
                ({product.rating.count})
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ProductList;
