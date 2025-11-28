import React from "react";
import { Helmet } from "react-helmet-async";
import "./Mainpage.css";

import Header from "../Component/Header";
import Footer from "../Component/Footer";

import rocket from "../assets/rocket.png";

export default function Merchandise() {
  return (
    <div className="mainpage-container">
      <Helmet>
        <title>Merchandise | Soaron</title>
        <meta
          name="description"
          content="Soaron merchandise — coming soon with premium aerospace-themed products."
        />
        <meta
          name="keywords"
          content="Soaron merchandise, Soaron store, aerospace merch, drone products"
        />
      </Helmet>

      <Header />

      <main className="mainpage-main-content">
        <img
          src={rocket}
          alt="Merchandise coming soon illustration"
          className="mainpage-img"
        />
        <h1 className="mainpage-title">MERCHANDISE — COMING SOON</h1>
        <p className="mainpage-subtitle">
          Our official Soaron merchandise store is on the way!
          Stay tuned for premium aerospace-themed apparel, accessories, and more.
        </p>
      </main>

      <Footer />
    </div>
  );
}
