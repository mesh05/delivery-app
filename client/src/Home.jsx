import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
function Home() {
  return (
    <div>
      <section class="header">
        <div class="image-container">
          <img src="src/assets/burger.jpg" alt="pizza-burger" />
          <div class="box">
            <div class="content">
              <h2>Delicious Pizzas and Burgers for College Events</h2>
              <p>
                Join us for a day filled with fun activities, delicious food,
                and amazing performances!
              </p>
              <div class="header-buttons">
                <a href="/Stall">
                  <button type="button">Order Now</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="services">
        <h3>Services</h3>
        <div class="services-flex">
            <img src="./src/assets/delivery.png" alt="" srcset=""/>
            <div class="services-right">
              <h4>Craving Foodies? <br/>Pay When It Arrives with <strong>Cash on Delivery!</strong></h4>
              <p>Enjoy your favorite Pizza Hut pizzas without needing a credit card upfront. Our convenient cash on delivery option lets you order online or by phone and pay in cash directly to the delivery driver upon receiving your piping hot pizzas!</p>
            </div>

        </div>

      </section>
      <footer>
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
export default Home;
