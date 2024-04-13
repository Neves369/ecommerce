"use client";
import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/sanity";
import { motion } from "framer-motion";

const HeroBanner = ({ heroBanner }: any) => {
  return (
    <div className="hero-banner-container">
      <div>
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="beats-solo"
        >
          {heroBanner.smallText}
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {heroBanner.midText}
        </motion.h3>
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          {heroBanner.largeText1}
        </motion.h1>
        <motion.img
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1 }}
          width={450}
          height={450}
          src={urlFor(heroBanner.image)}
          alt="banner"
          className="hero-banner-image"
        />

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              type="button"
            >
              {heroBanner.buttonText}
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
