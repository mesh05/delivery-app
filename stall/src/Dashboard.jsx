import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [orders, setOrders] = useState([]);

  // const updateOrders = (data) => {
  //   const parsedData = JSON.parse(data);
  //   setOrders((orders) =>
  //     [...orders].map((order) => {
  //       if (order.id === parsedData.id) {
  //         return parsedData;
  //       }
  //       return order;
  //     })
  //   );
  // };

  
  useEffect(() => {
    axios.get("http://localhost:3000/stall/realtime_orders")
    .then((response) => {
      // console.log(response.data.placedOrders);
      setOrders(response.data.placedOrders);
      // const eventSource = new EventSource(`http://localhost:3000/stall/realtime_orders`);
      // eventSource.onmessage = (e) => updateOrders(e.data);
      // return () => {
      //   eventSource.close();
      // }
    })
    .catch((error) => {
      console.log(error);
    });
    
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      {JSON.stringify(orders)}
    </div>
  );
}

export default Dashboard;
