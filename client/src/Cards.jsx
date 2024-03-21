import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRecoilState } from 'recoil';
import { totalState,cartState, stallDetailState } from "./recoil/atoms/atoms";
// import burger from "./burger.jpg"

export default function Cards({items}) {
  let [cart, setCart] = useRecoilState(cartState);
  const [total,setTotal] = useRecoilState(totalState)
  function handleClick(item) {
    setTotal(total+item.Price)
    setCart([...cart, item.Name]);
  }
  function handleRemove(item){
    let cnt = 0
    let x = cart.length
    cart = cart.filter((name)=>{
      if(name==item.Name)
        cnt +=1
      return item.Name!=name || cnt>=2
    })
    console.log(cart)
    setCart([...cart])
    if(x != cart.length)  
    setTotal(total-item.Price)
  };
  return (
    <div>
    <Card sx={{ marginLeft:0,maxWidth: 345,padding:"5px" }}>
      <CardMedia
        sx={{ height: 160 ,width:250,marginLeft:5}}
        image= {items.image}
      />
      <CardContent style={{marginLeft:5}}>
        <Typography gutterBottom variant="h5" component="div">
        {items.Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price : {"Rs. "+items.Price}
        </Typography>
      </CardContent>
      <CardActions >
        <Button variant='outlined' size="medium" onClick={() => {
          handleClick(items)
        }}>+</Button>
        <Button variant='outlined' size="medium" onClick={() => {
          handleRemove(items)
        }}>-</Button>
      </CardActions>
    </Card>
    </div>
  );
} 