"use client";
import React, { useState } from "react";
import Link from "next/link";
import { urlFor } from "../lib/sanity";
import { Image } from "next-sanity/image";
import { motion } from "framer-motion";

const Product = ({ product: { images, name, slug, price } }) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            alt="product"
            src={urlFor(images && images[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <motion.img
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            alt="product"
            src={urlFor(images && images[1])}
            width={250}
            height={250}
            className="product-image absolute top-0"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
