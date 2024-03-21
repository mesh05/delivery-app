import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function OrderPlaced() {
  const [orderDetails, setOrderDetails] = useState({});
  const orderId = useParams().id;
  useEffect(() => {
    axios.get(`https://ruchulu.live/api/order/${orderId}`).then((res) => {
      console.log(res);
      setOrderDetails(res.data.orderDetails);
    });
  }, []);
  return (
    <div style={{display:"grid",justifyContent:"center" }}>
      <div style={{width:"400px",alignItems:"center",padding:"1em",margin:"1em",borderRadius:"20px",backgroundColor:"white"}}>
        <h1>Order Placed</h1>
        <h2>Order id: {orderDetails.orderId}</h2>
        <h2>Name: {orderDetails.name}</h2>
        <h2>Roll no: {orderDetails.roll}</h2>
        <h2>Phone: {orderDetails.phone}</h2>
        <h2>Location: {orderDetails.location}</h2>
      </div>
      <footer style={{marginTop:"7em"}}>
        <div class="footer-flex">
          <div class="contact">
            <h4>For any further details:</h4>
            <p>Call: 8790046822</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default OrderPlaced;
