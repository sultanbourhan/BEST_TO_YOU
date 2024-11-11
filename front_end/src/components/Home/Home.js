import React, { useState, useEffect } from 'react';
import Axios from "axios";
import "./Home.css";

import img_hero1 from "../../image/hero1.jpg";
import img_hero2 from "../../image/hero2.jpg";
import img_hero3 from "../../image/hero3.jpg";
import img_back1 from "../../image/hero-shape-2.svg";
import img_back2 from "../../image/timeline.svg";

export default function Home() {
  const [category, setCategory] = useState([]);



  useEffect(() => {
      Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_Categorey`)
      .then(res => {
          setCategory(res.data.data);
      })
      .catch(error => {
          console.error('Error fetching data', error);
      });
  }, []);

  useEffect(() => {
      const logosSlides = document.querySelectorAll(".logos-slide");
      logosSlides.forEach(slide => {
          const copy = slide.cloneNode(true);
          document.querySelector(".logos").appendChild(copy);
      });
  }, []); // يتم التنفيذ مرة واحدة بعد تحميل المكون

  return (
    <div className='Home'>
      <div className="bac">
        <img src={img_back2} alt="" />
        <img src={img_back1} alt="" />
        <div className="container">
          <div className="hero">
            <div className="about">
              <h1>
                BEST <br />
                <span>TO YOU</span>
              </h1>
              <p>
                is a leading company, committed to providing innovative and
                efficient solutions to our clients. We always strive for
                excellence by delivering high-quality services and products that
                meet the evolving market needs. Our specialized team works with
                passion and creativity to ensure customer satisfaction and achieve
                sustainable success.
              </p>
              <button>companies</button>
            </div>
            <div className="camp">
              <div className="minecamp">
                <img src={img_hero1} alt="" />
                <div className="contentcard">
                  <h2>Best companies</h2>
                  <p>
                    These companies are distinguished by their excellent
                    reputation for delivering high-quality products and services,
                    continuous innovation, and customer satisfaction. They
                    represent the pinnacle of excellence in their respective
                    fields and serve as a model of performance and success.
                  </p>
                  <button>Visit Us</button>
                </div>
              </div>
              <div className="minecamp">
                <img src={img_hero2} alt="" />
                <div className="contentcard">
                  <h2>Best companies in Syria</h2>
                  <p>
                    These companies are among the best in Syria, distinguished by
                    their ability to deliver high-quality products and services,
                    continuous innovation, and customer satisfaction. They
                    represent the pinnacle of excellence in their respective
                    fields and serve as a model of performance and success.
                  </p>
                  <button>Visit Us</button>
                </div>
              </div>
              <div className="minecamp">
                <img src={img_hero3} alt="" />
                <div className="contentcard">
                  <h2>Best companies in dubai</h2>
                  <p>
                    These companies are among the best in dubai, distinguished by
                    their ability to deliver high-quality products and services,
                    continuous innovation, and customer satisfaction. They
                    represent the pinnacle of excellence in their respective
                    fields and serve as a model of performance and success.
                  </p>
                  <button>Visit Us</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="category">
        <div className="container">
          <h1>All Category</h1>
          <div className="cats">
            {
              category.map((cat) => (
                <div className="cat" key={cat.id}>
                  <img className="img1" src={img_back1} alt="" />
                  <div className="contantcat">
                    <img className="img2" src={`http://${cat.Categoreyimage}`} alt="" />
                    <div className="namecat">
                      <h2>{cat.name}</h2>
                      <button>Pro max</button>
                    </div>
                  </div>
                  <p>{cat.description}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <div className="carousel">
        <div className="list">
          {Array(3).fill().map((_, index) => (
            <div className="item" style={{ backgroundImage: `url(${img_back1})` }} key={index}>
              <div className="content">
                <div className="title">test title</div>
                <div className="des">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                  consequuntur laborum, placeat, magnam, neque odit nulla animi
                  cupiditate iusto minima velit? Labore aliquam repellendus impedit
                  optio modi sit sint maiores.
                </div>
                <div className="btn">
                  <button>See More</button>
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="arrows">
          <button className="prev"></button>
          <button className="next"></button>
        </div>
        <div className="timeRunning"></div>
      </div>

      <div className="slider">
        <div className="container">
          <div className="logos">
            <div className="logos-slide">
              <img src={img_hero1} alt="Logo 1" />
            </div>
            <div className="logos-slide">
              <img src={img_hero2} alt="Logo 2" />
            </div>
            <div className="logos-slide">
              <img src={img_hero3} alt="Logo 3" />
            </div>
          </div>
        </div>
      </div>

      <div className="plans">
        <div className="container">
          <div className="plan basic">
            <h1>Basic</h1>
            <h2>$10<span>/month</span></h2>
            <ul>
              <li>A simple profile page displaying the company name, logo, and contact details.</li>
              <li>Listing the company in a specific category based on its field.</li>
              <li>The company appears in search results on the website.</li>
              <li>Limited space to display a brief description of the company (up to 100 words).</li>
              <li>Ability to add a geographic location (map).</li>
            </ul>
            <button>Get started</button>
          </div>
          <div className="plan Advanced">
            <h1>Advanced</h1>
            <h2>$25<span>/month</span></h2>
            <ul>
              <li>All features of the Basic Plan.</li>
              <li>Display of specific products or services with images.</li>
              <li>A special section to showcase certificates or awards.</li>
              <li>Larger space for description (up to 300 words).</li>
              <li>Higher priority for the company in search results.</li>
              <li>Ability to add links to the company’s social media pages.</li>
            </ul>
            <button>Get started</button>
          </div>
          <div className="plan Premium">
            <h1>Premium</h1>
            <h2>$50<span>/month</span></h2>
            <ul>
              <li>All features of the Advanced Plan.</li>
              <li>Unlimited space to showcase products or services.</li>
              <li>Longer introductory video (up to 3 minutes).</li>
              <li>Highest priority in search results on the website.</li>
              <li>The company appears in a dedicated banner on the homepage.</li>
              <li>Ability to send personalized notifications to users about offers or news.</li>
              <li>Monthly report on page visits and views.</li>
              <li>Dedicated and fast support for subscribed companies.</li>
            </ul>
            <button>Get started</button>
          </div>
        </div>
      </div>
    </div>
  );
}