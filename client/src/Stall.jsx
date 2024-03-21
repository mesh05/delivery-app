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
import { totalState,cartState, stallDetailState } from "./recoil/atoms/atoms";
import Cards from './Cards'
function Stall() {
  const stallData  = useRecoilValue(stallDetailState);
  const cart = useRecoilValue(cartState);
  const navigate = useNavigate();
  const cartItems = {};
  const total = useRecoilValue(totalState)
  function handleNav() {
    cart.map((item) => {
      if (cartItems[item]) {
        cartItems[item] += 1;
      } else {
        cartItems[item] = 1;
      }
    });
    navigate("/cart", { state: { cart: cartItems,total:total } });
  }
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
              <Grid item xs={3} key={item.id} margin >
                <Cards items = {item}/>
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
              <Grid item xs={3} key={item.id} margin>
                <Cards items = {item}/>
              </Grid>
            );
          })}
        </Grid>
        <Card sx={{ maxWidth: 345, height: 75, marginBottom:"1em" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                cart:{cart.length} <br />
                Total Price : {total}
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


export default Stall;
