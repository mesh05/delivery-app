import { Typography } from "@mui/material";
import "./Home.css";
import Marquee from "react-fast-marquee";
function Home() {
  return (
    <div>
      <Marquee>
        <Typography variant="h3" sx={{ color: "red", fontWeight: "bold" }}>
          Delivery available at Cricket Ground Entrance
        </Typography>
      </Marquee>
      <section className="header">
        <div className="image-container">
          <img src="/burger.jpg" alt="pizza-burger" />
          <div className="box">
            <div className="content">
              <h2>Delicious Pizzas and Burgers for College Events</h2>
              <p>
                Join us for a day filled with fun activities, delicious food,
                and amazing performances!
              </p>
              <div className="header-buttons">
                <a href="/menu">
                  <button type="button">Order Now</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="services">
        <h3>Services</h3>
        <div className="services-flex">
          <img src="/delivery.png" alt="" />
          <div className="services-right">
            <h4>
              Craving Foodies? <br />
              Pay When It Arrives with <strong>Cash on Delivery!</strong>
            </h4>
            <p>
              Enjoy your favorite Pizza Hut pizzas without needing a credit card
              upfront. Our convenient cash on delivery option lets you order
              online or by phone and pay in cash directly to the delivery driver
              upon receiving your piping hot pizzas!
            </p>
          </div>
        </div>
      </section>
      <footer>
        <div className="footer-flex">
          <div className="contact">
            <h4>For any further details:</h4>
            <p>Call: 8790046822</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Home;
