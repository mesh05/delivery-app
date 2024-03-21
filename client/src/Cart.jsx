import { useLocation } from "react-router-dom";
// import { useRecoilState } from "recoil";
import { totalState } from "./recoil/atoms/atoms";
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
import { useRecoilValue } from "recoil";

function Cart() {
  const locs = [
    "library",
    "canteen",
    "refreshment station",
    "3rd block",
    "1st block",
  ];
  const cartItems = useLocation().state.cart;
  const total = useLocation().state.total;
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
      <h1 style ={{textAlign:"center",marginBottom:"1em", marginTop:"1em"}} >Cart</h1>
    <div style={{display:"flex",justifyContent:"space-around"}}>
      <div >
        <br></br>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          required = {true}
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
          required = {true}
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
          required = {true}
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
            required = {true}
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
            if(name == ""){
              alert("Please provide Name");
              return 
            }
            else if(roll == ""){
              alert("Please provide Roll number");
              return 
            }
            else if(phone == ""){
              alert("Please provide Phone Number for further contact");
              return 
            }
            if(location == ""){
              alert("Please provide convenient meeting point(Location)");
              return 
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
      <Card style={{width:"400px",marginLeft:"1em"}} >
        {Object.keys(cartItems).map((item) => {
          return (
            <div
              key={item}
              style={{ display: "flex", justifyContent: "space-between", padding:"1em"}}
            >
              <Typography>{item}</Typography>
              <Typography>{cartItems[item]}</Typography>
            </div>
          );
        })}
        <br/>
        <span style={{marginLeft:"1em"}}>TOTAL:{total}</span>
      </Card>
    </div>
    </div>
  );
}

export default Cart;
