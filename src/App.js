import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Product from "./pages/Product";
import About from "./pages/About";
import Header from "./layout/Header";
import NoMatch from "./pages/NoMatch";
import ProductDetails from "./pages/ProductDetails";
function App() {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/products");
  };
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/products" Component={Product} />
        <Route path="/About" Component={About} />
        <Route path="/products/:slug" Component={ProductDetails} />
        <Route path="*" Component={NoMatch} />
      </Routes>
    </>
  );
}

export default App;
