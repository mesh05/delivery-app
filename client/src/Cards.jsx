import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRecoilState } from 'recoil';
import { cartState, stallDetailState } from "./recoil/atoms/atoms";
// import burger from "./burger.jpg"

export default function Cards({items}) {
  const [stallData,setStallData] = useRecoilState(stallDetailState);
  const [cart, setCart] = useRecoilState(cartState);
  function handleClick(items) {
    setCart([...cart, items]);
  }
  function handleRemove(items){
    cart.pop(items)
    setCart([...cart])
  };
  return (
    <div>
    <Card sx={{ marginLeft:0,maxWidth: 345,padding:"5px" }}>
      <CardMedia
        sx={{ height: 140 }}
        image= {items.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {items.Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price : {items.Price}
        </Typography>
      </CardContent>
      <CardActions >
        <Button variant='outlined' size="medium" onClick={() => {
          handleClick(items.Name)
        }}>+</Button>
        <Button variant='outlined' size="medium" onClick={() => {
          handleRemove(items.Name)
        }}>-</Button>
      </CardActions>
    </Card>
    </div>
  );
} 