// import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import StallList from "./StallList";
import Home from "./Home";
import Stall from "./Stall";
import Cart from "./Cart";
import Order from "./Order";
import OrderPlaced from "./OrderPlaced";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      {/* <Route path="/menu" element={<StallList />} /> */}
      <Route path="/menu" element={<Stall />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/order/:id" element={<OrderPlaced />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
