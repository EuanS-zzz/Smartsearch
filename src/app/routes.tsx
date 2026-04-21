import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import BestSellers from "./pages/BestSellers";
import Product from "./pages/Product";
import Basket from "./pages/Basket";
import Checkout from "./pages/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "categories/:category?", Component: Categories },
      { path: "best-sellers", Component: BestSellers },
      { path: "product/:id", Component: Product },
      { path: "basket", Component: Basket },
      { path: "checkout", Component: Checkout },
    ],
  },
]);
