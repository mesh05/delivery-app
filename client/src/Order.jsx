import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function Order() {
  const [orderId, setOrderId] = useState("");
  return (
    <div>
      <h1>Search your order</h1>
      <TextField
        id="outlined-basic"
        type="text"
        label="Order Id"
        variant="outlined"
        onChange={(event) => {
          setOrderId(event.target.value);
        }}
      />
      <br></br>
      <br></br>
      <Button
        onClick={async () => {
          const res = await axios.get(
            `http://localhost:3000/api/order/${orderId}`
          );
          if (res.status === 200) {
            window.location.href = "/order/" + orderId;
          } else {
            alert("Order not found!");
          }
        }}
        variant="contained"
        color="primary"
      >
        Place Order
      </Button>
    </div>
  );
}

export default Order;
