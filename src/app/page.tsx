"use client";
import React, { useEffect, useState } from "react";

import { client } from "./lib/sanity";
import { HeroBanner, Product, FooterBanner } from "./components";

const Home = () => {
  const query = '*[_type == "product"] | order(_createdAt desc) [0...10]';
  const bannerQuery = '*[_type == "banner"]';
  const [banner, setBanner] = useState([]);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let products = await client.fetch(query);
    let banner = await client.fetch(bannerQuery);
    setProducts(products);
    setBanner(banner);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {banner.length > 0 && (
        <HeroBanner heroBanner={banner.length && banner[1]} />
      )}
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>Find the best products here</p>
      </div>

      <div className="products-container">
        {products.length > 0 &&
          products?.map((product: any) => (
            <Product key={product._id} product={product} />
          ))}
      </div>

      {banner.length > 0 && <FooterBanner footerBanner={banner && banner[0]} />}
    </div>
  );
};

export default Home;
