import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRecoilState } from "recoil";
import { totalState, cartState, stallDetailState } from "./recoil/atoms/atoms";
// import burger from "./burger.jpg"

export default function Cards({ items }) {
  let [cart, setCart] = useRecoilState(cartState);
  const [total, setTotal] = useRecoilState(totalState);
  function handleClick(item) {
    setTotal(total + item.Price);
    setCart([...cart, item.Name]);
  }
  function handleRemove(item) {
    let cnt = 0;
    let x = cart.length;
    cart = cart.filter((name) => {
      if (name == item.Name) cnt += 1;
      return item.Name != name || cnt >= 2;
    });
    console.log(cart);
    setCart([...cart]);
    if (x != cart.length) setTotal(total - item.Price);
  }
  return (
    <div>
      <Card sx={{ maxWidth: 345, padding: "5px" }}>
        <CardMedia
          sx={{ height: 200 }}
          image={items.image}
          title={items.Name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {items.Name}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            ₹ {items.Price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={() => {
              handleClick(items);
            }}
            size="small"
          >
            +
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleRemove(items);
            }}
            size="small"
          >
            -
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
