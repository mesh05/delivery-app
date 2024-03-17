// import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { SignIn } from "./SignIn";
import Dashboard from "./Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
