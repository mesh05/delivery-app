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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="stalls" element={<StallList />} />
      <Route path="/:stall" element={<Stall />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
