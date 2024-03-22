import { useLocation } from "react-router-dom";
// import { useRecoilState } from "recoil";
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
    "Canteen",
    "5th Block",
    "Library Ground Floor",
    "3rd Block",
    "1st Block",
    "Refreshment Center",
    "Cricket Ground Gate",
  ];
  const cartItems = useLocation().state.cart;
  const total = useLocation().state.total;
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [NameState, setState] = useState(false);
  const [RollState, setStateR] = useState(false);
  const [PhoneState, setStateP] = useState(false);
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
      <h1
        style={{ textAlign: "center", marginBottom: "1em", marginTop: "1em" }}
      >
        Cart
      </h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <br></br>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            required={true}
            onChange={(event) => {
              const reg = /^[\p{L} ,.'-]+$/u;
              if (event.target.value.match(reg)) {
                setName(event.target.value);
                setState(false);
              } else {
                setState(true);
              }
            }}
          />
          <br />
          {NameState ? (
            <span
              style={{
                display: "inline",
                fontSize: "15px",
                margin: 0,
                color: "red",
                font: "small-caption",
              }}
            >
              *Enter Valid Name <br />{" "}
            </span>
          ) : (
            <span></span>
          )}
          <br></br>
          <TextField
            id="outlined-basic"
            label="Roll Number"
            variant="outlined"
            required={true}
            onChange={(event) => {
              const reg = /^[0-9a-zA-Z]+$/;
              if (event.target.value.match(reg)) {
                setRoll(event.target.value);
                setStateR(false);
              } else {
                setStateR(true);
              }
            }}
          />
          <br></br>
          {RollState ? (
            <span
              style={{
                display: "inline",
                fontSize: "15px",
                margin: 0,
                color: "red",
                font: "small-caption",
              }}
            >
              *Enter Valid Roll Number <br />{" "}
            </span>
          ) : (
            <span></span>
          )}
          <br></br>
          <TextField
            id="outlined-basic"
            type="number"
            label="Phone"
            variant="outlined"
            required={true}
            onChange={(event) => {
              const reg =
                /^[9|6|8|7][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;
              if (event.target.value.match(reg)) {
                setPhone(event.target.value);
                setStateP(false);
              } else {
                setStateP(true);
              }
            }}
          />
          <br></br>
          {PhoneState ? (
            <span
              style={{
                display: "inline",
                fontSize: "15px",
                margin: 0,
                color: "red",
                font: "small-caption",
              }}
            >
              *Enter Valid Phone Number <br />{" "}
            </span>
          ) : (
            <span></span>
          )}
          <br></br>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Location
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              required={true}
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
          {/* <Typography sx={{ fontWeight: "bold" }}>
            You will be able to place orders when the stall starts. A button
            will appear instead of this text
          </Typography> */}
          <Button
            onClick={async () => {
              if (NameState || RollState || PhoneState) {
                alert("Please provide Valid information");
                return;
              }
              if (name == "") {
                alert("Please provide Name");
                return;
              } else if (roll == "") {
                alert("Please provide Roll number");
                return;
              } else if (phone == "") {
                alert("Please provide Phone Number for further contact");
                return;
              }
              if (location == "") {
                alert("Please provide convenient meeting point(Location)");
                return;
              }
              const res = await axios.post(
                "https://ruchulu.live/api/placeOrder",
                {
                  name: name,
                  roll: roll,
                  phone: phone,
                  location: location,
                  cart: cartItems,
                }
              );
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
        <Card style={{ width: "400px", marginLeft: "1em", padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>ITEM</Typography>
            <Typography sx={{ fontWeight: "bold" }}>QUANTITY</Typography>
          </div>
          {Object.keys(cartItems).map((item) => {
            return (
              <div
                key={item}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1em",
                }}
              >
                <Typography>{item}</Typography>
                <Typography>{cartItems[item]}</Typography>
              </div>
            );
          })}
          <br />
          <span style={{ marginLeft: "1em" }}>TOTAL: ₹{total}</span>
        </Card>
      </div>
    </div>
  );
}

export default Cart;
