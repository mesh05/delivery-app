import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function OrderPlaced() {
  const [orderDetails, setOrderDetails] = useState({});
  const orderId = useParams().id;
  useEffect(() => {
    axios.get(`http://localhost:3000/api/order/${orderId}`).then((res) => {
      console.log(res);
      setOrderDetails(res.data.orderDetails);
    });
  }, []);
  return (
    <div>
      <h1>Order Placed</h1>
      <h2>Order id: {orderDetails.orderId}</h2>
      <h2>Name: {orderDetails.name}</h2>
      <h2>Roll no: {orderDetails.roll}</h2>
      <h2>Phone: {orderDetails.phone}</h2>
      <h2>Location: {orderDetails.location}</h2>
    </div>
  );
}

export default OrderPlaced;
