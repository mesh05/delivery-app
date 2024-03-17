import { useLocation } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { cartState } from "./recoil/atoms/atoms";
import axios from "axios";
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function Cart() {
  const locs = [
    "library",
    "canteen",
    "refreshment station",
    "3rd block",
    "1st block",
  ];
  const cartItems = useLocation().state.cart;
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  //   const [cart, setCart] = useRecoilState(cartState);
  //   setCart(cartItems);
  //   if ("caches" in window) {
  //     caches.keys().then((names) => {
  //       // Delete all the cache files
  //       names.forEach((name) => {
  //         caches.delete(name);
  //       });
  //     });
  //     caches.open("cart").then((cache) => {
  //       cache.addAll(cartItems);
  //     });
  //   }
  return (
    <div>
      <h1>Cart</h1>
      <Card>
        {Object.keys(cartItems).map((item) => {
          return (
            <div
              key={item}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>{item}</Typography>
              <Typography>{cartItems[item]}</Typography>
            </div>
          );
        })}
      </Card>

      <div>
        <br></br>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <br></br>
        <br></br>
        <TextField
          id="outlined-basic"
          label="Roll Number"
          variant="outlined"
          onChange={(event) => {
            setRoll(event.target.value);
          }}
        />
        <br></br>
        <br></br>
        <TextField
          id="outlined-basic"
          type="number"
          label="Phone"
          variant="outlined"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />
        <br></br>
        <br></br>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Location
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={location}
            label="Age"
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          >
            {locs.map((loc) => {
              return (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <br></br>
        <br></br>
        <Button
          onClick={async () => {
            const res = await axios.post("http://localhost:3000/placeOrder", {
              name: name,
              roll: roll,
              phone: phone,
              location: location,
              cart: cartItems,
            });
            if (res.status === 200) {
              window.location.href = "/order/" + res.data.orderId;
            } else {
              alert("Order not placed!");
            }
          }}
          variant="contained"
          color="primary"
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}

export default Cart;
