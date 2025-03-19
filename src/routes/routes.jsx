import { patch } from "@mui/material";
import Dashboard from "../page/Dashboard";
import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";
import ProductsPage from "../page/product/Products";
import ProductDetails from "../page/product/ProductDetails";
import { ProductProvider } from "../context/ProductContext";

export const routes = [
  {
    path: "/",
    element: <Home/>,
    isPublic: true, // Catch-all route
  },
  {
    path: "/login",
    element: <Login/>,
    isPublic: true, // Accessible without auth
  },
  {
    path:"/register", 
    element : <Register/>,
    isPublic : true,
  }
  ,
  {
    path: "/dashboard",
    element: <Dashboard/>,
    isProtected: true, // Requires auth
  },
  {
    path : "/product", 
    element: 
           <ProductProvider>
           <ProductsPage/>
          </ProductProvider>, 
    isPublic: true
  },
  {
    path : "/product/:id",
    element : <ProductDetails/>,
    isPublic: true
  }
];
