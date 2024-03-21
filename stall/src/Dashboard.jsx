import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { Button, Typography } from "@mui/material";
import io from "socket.io-client";
const socket = io.connect("https://ruchulu.live");

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // Have to hit api that makes DB calls for initial orders
    axios
      .get("https://ruchulu.live/api/stall/orders")
      .then((response) => {
        setOrders(response.data.placedOrders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    socket.on("new_order", (data) => {
      setOrders([...orders, data.order]);
    });

    socket.on("order_cancelled", (data) => {
      console.log(data);
      // setOrders(
      //   orders.map((order) => {
      //     if (order.orderId === data.order.orderId) {
      //       return data.order;
      //     }
      //     return order;
      //   })
      // );
    });

    socket.on("order_delivered", (data) => {
      console.log(data);
      // setOrders(
      //   orders.map((order) => {
      //     if (order.orderId === data.order.orderId) {
      //       return data.order;
      //     }
      //     return order;
      //   })
      // );
    });
    // socket.on("order", (data) => {
    //   setText(data.message);
    // });
  }, [orders]);
  return (
    <div>
      <h1>Dashboard</h1>
      {orders.map((order) => (
        <Card key={order.id}>
          <Typography variant="h5">Order ID: {order.orderId}</Typography>
          <br></br>
          <Typography variant="h5">Name: {order.name}</Typography>
          <br></br>
          <br></br>
          <Typography variant="h5">Status: {order.status}</Typography>
          <br></br>
          <Button
            onClick={() => {
              socket.emit("order_delivered", {
                orderId: order.orderId,
                status: "delivered",
              });
            }}
            variant="contained"
            sx={{ backgroundColor: "green" }}
          >
            delivered
          </Button>
          <br></br>
          <br></br>
          <Button
            onClick={() => {
              axios
                .put("https://ruchulu.live/api/orderCancelled", {
                  orderId: order.orderId,
                  status: "cancelled",
                })
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            variant="contained"
            sx={{ backgroundColor: "red" }}
          >
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
