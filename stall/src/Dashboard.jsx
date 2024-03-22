import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { Button, Typography } from "@mui/material";
import io from "socket.io-client";
const socket = io.connect("https://ruchulu.live");

function Dashboard() {
  const [orders, setOrders] = useState([]);

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
      setOrders(
        orders.map((order) => {
          if (order.orderId === data.order.orderId) {
            const new_data = { ...order, status: "cancelled" };
            return new_data;
          }
          return order;
        })
      );
    });

    socket.on("order_delivered", (data) => {
      console.log(data);
      setOrders(
        orders.map((order) => {
          if (order.orderId === data.order.orderId) {
            const new_data = { ...order, status: "delivered" };
            return new_data;
          }
          return order;
        })
      );
    });

    // socket.on("order", (data) => {
    //   setText(data.message);
    // });
  }, [orders]);

  return (
    <div>
      <h1>Dashboard</h1>
      {orders.map((order) => (
        <Card
          key={order.id}
          sx={{ width: "500px", margin: "10px", padding: "10px" }}
        >
          <Typography variant="h5">Order ID: {order.orderId}</Typography>
          <br></br>
          <Typography variant="h5">Name: {order.name}</Typography>
          <br></br>
          <Typography variant="h5">Roll: {order.roll}</Typography>
          <br></br>
          <Status status={order.status}></Status>
          <br></br>
          <Typography variant="h5">Number: {order.phone}</Typography>
          <br></br>
          <Typography variant="h5">Location: {order.location}</Typography>
          <br></br>
          {/* {order.cart.map((item) => {
            return (
              <div key={item.id}>
                <Typography variant="h5">
                  {item.name} - {item.quantity}
                </Typography>
              </div>
            );
          })} */}
          <Typography variant="h5">Cart:</Typography>
          {Object.keys(order.cart).map((key) => {
            return (
              <div key={key}>
                <Typography variant="h6">
                  {key} - {order.cart[key]}
                </Typography>
              </div>
            );
          })}
          <br></br>
          <br></br>
          <Button
            onClick={() => {
              axios
                .put("https://ruchulu.live/api/orderDelivered", {
                  orderId: order.orderId,
                  status: "delivered",
                })
                .then((response) => {
                  console.log(response);
                  socket.on("order_cancelled", (data) => {
                    console.log(data);
                    setOrders(
                      orders.map((order) => {
                        if (order.orderId === data.order.orderId) {
                          return data.order;
                        }
                        return order;
                      })
                    );
                  });
                })
                .catch((error) => {
                  console.log(error);
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
    </div>
  );
}

function Status({ status }) {
  if (status === "pending") {
    return (
      <Typography sx={{ color: "orange" }} variant="h5">
        Status: pending
      </Typography>
    );
  }
  if (status === "delivered") {
    return (
      <Typography sx={{ color: "green" }} variant="h5">
        Status: delivered
      </Typography>
    );
  }
  if (status === "cancelled") {
    return (
      <Typography sx={{ color: "red" }} variant="h5">
        Status: cancelled
      </Typography>
    );
  }
}

export default Dashboard;
