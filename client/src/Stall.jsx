import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, stallDetailState } from "./recoil/atoms/atoms";

function Stall() {
  const { stall } = useParams();
  const [stallData, setStallData] = useRecoilState(stallDetailState);
  const cart = useRecoilValue(cartState);
  const navigate = useNavigate();
  const cartItems = {};

  function handleNav() {
    cart.map((item) => {
      if (cartItems[item]) {
        cartItems[item] += 1;
      } else {
        cartItems[item] = 1;
      }
    });
    navigate("/cart", { state: { cart: cartItems } });
  }

  useEffect(() => {
    fetch(`https://ruchulu.live/api/${stall}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStallData(data.items);
      });
  }, []);
  if (cart.length == 0) {
    return (
      <div>
        <Grid
          container
          spacing={{ xs: "auto", md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {stallData.map((item) => {
            return (
              <Grid item xs={3} key={item}>
                <Item item={item} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  } else if (cart.length > 0) {
    return (
      <div>
        <Grid
          container
          spacing={{ xs: "auto", md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {stallData.map((item) => {
            return (
              <Grid item xs={3} key={item}>
                <Item item={item} />
              </Grid>
            );
          })}
        </Grid>
        <Card sx={{ maxWidth: 345, height: 75 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                cart:{cart.length}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                href="/cart"
                onClick={() => {
                  handleNav();
                }}
                size="small"
              >
                View Cart
              </Button>
            </CardActions>
          </div>
        </Card>
      </div>
    );
  }
}

function Item({ item }) {
  const [cart, setCart] = useRecoilState(cartState);
  function handleClick(item) {
    setCart([...cart, item]);
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia sx={{ height: 140 }} image="" title={item} /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            handleClick(item);
          }}
          size="small"
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default Stall;
