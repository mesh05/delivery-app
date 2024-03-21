import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Paper } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, stallDetailState } from "./recoil/atoms/atoms";

function Stall() {
  const stallData = useRecoilValue(stallDetailState);
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

  // useEffect(() => {
  //   fetch(`https://ruchulu.live/api/${stall}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setStallData(data.items);
  //     });
  // }, [setStallData, stall]);
  if (cart.length == 0) {
    return (
      <div
        style={{
          paddingLeft: "10px",
          paddingTop: "30px",
          paddingBottom: "100px",
        }}
      >
        <Grid
          container
          spacing={{ xs: "auto", md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {stallData.map((item) => {
            return (
              <Grid item xs={3} key={item}>
                <Item img={item.image} price={item.price} name={item.name} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  } else if (cart.length > 0) {
    return (
      <div
        style={{
          paddingLeft: "10px",
          paddingTop: "30px",
          paddingBottom: "100px",
        }}
      >
        <Grid
          container
          spacing={{ xs: "auto", md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {stallData.map((item) => {
            return (
              <Grid item xs={3} key={item}>
                <Item img={item.image} price={item.price} name={item.name} />
              </Grid>
            );
          })}
        </Grid>

        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            maxWidth: 500,
            height: 75,
            margin: "10px",
            padding: "15px",
          }}
          elevation={3}
        >
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Typography gutterBottom variant="h5" component="div">
              cart:{cart.length}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              cart:{cart.length}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleNav();
              }}
            >
              View Cart
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

function Item(props) {
  const [cart, setCart] = useRecoilState(cartState);
  function handleClick(item) {
    setCart([...cart, item]);
  }
  function handleRemove(name) {
    let cnt = 0;
    let c = cart.filter((items) => {
      if (items === name) cnt += 1;
      return items !== name || cnt >= 2;
    });
    setCart([...c]);
  }
  return (
    <Card sx={{ maxWidth: 345, padding: "5px" }}>
      <CardMedia sx={{ height: 200 }} image={props.img} title={props.name} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.name}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          ₹ {props.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={() => {
            handleClick(props.name);
          }}
          size="small"
        >
          +
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleRemove(props.name);
          }}
          size="small"
        >
          -
        </Button>
      </CardActions>
    </Card>
  );
}

export default Stall;
