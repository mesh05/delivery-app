import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { Button, Typography } from "@mui/material";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [text, setText] = useState("");

  // const updateOrders = (data) => {
  //   const parsedData = JSON.parse(data);
  //   setOrders((orders) =>
  //     [...orders].map((order) => {
  //       if (order.id === parsedData.id) {
  //         return parsedData;
  //       }
  //       return order;
  //     })
  //   );
  // };

  useEffect(() => {
    // Have to hit api that makes DB calls for initial orders
    socket.on("new_order", (data) => {
      setOrders(data.placedOrders);
    });
    socket.on("order", (data) => {
      setText(data.message);
    });
    axios
      .get("http://ruchulu.live:3000/api/stall/orders")
      .then((response) => {
        console.log(response.data.placedOrders);
        setOrders(response.data.placedOrders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [socket]);
  return (
    <div>
      <h1>Dashboard</h1>
      {orders.map((order) => (
        <Card key={order.id}>
          <Typography variant="h5">Order ID: {order.orderId}</Typography>
          <br></br>
          <Typography variant="h5">Name: {order.name}</Typography>
          <br></br>
          <Button variant="contained" sx={{ backgroundColor: "green" }}>
            delivered
          </Button>
          <br></br>
          <br></br>
          <Button variant="contained" sx={{ backgroundColor: "red" }}>
            Cancel order
          </Button>
        </Card>
      ))}
      {/* <Button
        onClick={() => {
          socket.emit("order", { message: "hello" });
        }}
      >
        Click
      </Button> */}
      {text}
    </div>
  );
}

export default Dashboard;
