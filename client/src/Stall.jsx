import { useNavigate } from "react-router-dom";

// import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Paper } from "@mui/material";
import { useRecoilValue } from "recoil";
import { totalState, cartState, stallDetailState } from "./recoil/atoms/atoms";
import Cards from "./Cards";
function Stall() {
  const stallData = useRecoilValue(stallDetailState);
  const cart = useRecoilValue(cartState);
  const navigate = useNavigate();
  const cartItems = {};
  const total = useRecoilValue(totalState);
  function handleNav() {
    cart.map((item) => {
      if (cartItems[item]) {
        cartItems[item] += 1;
      } else {
        cartItems[item] = 1;
      }
    });
    navigate("/cart", { state: { cart: cartItems, total: total } });
  }
  if (cart.length == 0) {
    return (
      <div style={{ marginBottom: "100px" }}>
        <Grid
          container
          spacing={{ xs: "auto", md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {stallData.map((item) => {
            return (
              <Grid item xs={3} key={item.id} margin>
                <Cards items={item} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  } else if (cart.length > 0) {
    return (
      <div style={{ marginBottom: "100px" }}>
        <Grid
          container
          spacing={{ xs: "auto", md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {stallData.map((item) => {
            return (
              <Grid item xs={3} key={item.id} margin>
                <Cards items={item} />
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
              Total: ₹{total}
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

export default Stall;
