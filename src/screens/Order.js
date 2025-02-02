import React, { useState } from "react";
import ProductCategory from "./../components/layout/ProductCategory";
import Cart from "./../components/layout/Cart";
import Box from "@mui/material/Box";
import data from "./../config/config";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const drawerWidth = 500;

function Order() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { 
            ...exist, 
            qty: exist.qty >= product.quantity ? product.quantity : exist.qty + 1} : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if(exist === undefined){
      return;
    } else if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
        color="default"
        elevation={0}
      >
        <Toolbar>
        <HomeRoundedIcon color="action" style={{color: "#2E3A55", width: 50, height: 50, marginInline: 10}}/>  
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontWeight: "bold",
              color: "#2E3A55",
            }}
          >
            Lau Chay Restaurant
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", width: "100%" }}
      >
        <Toolbar />
        <ProductCategory products={products} onAdd={onAdd} onRemove={onRemove}></ProductCategory>
      </Box>
      <Drawer
        sx={{
          height: "100%",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Divider />
        <Cart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove}>
          Cart
        </Cart>
      </Drawer>
    </Box>
  );
}

export default Order;
