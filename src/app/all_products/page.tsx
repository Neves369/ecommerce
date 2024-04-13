// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";

import { client } from "../lib/sanity";
import { Product, FooterBanner } from "../components";
import { PaginationNav1Presentation } from "../components/Pagination";

const AllProducts = () => {
  const [banner, setBanner] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(10);

  const getBanner = async () => {
    const bannerQuery = '*[_type == "banner"]';
    let banner = await client.fetch(bannerQuery);
    setProducts(products);
    setBanner(banner);
  };

  useEffect(() => {
    // Função para buscar os produtos iniciais
    const fetchInitialProducts = async () => {
      const initialProducts = await client.fetch(
        `*[_type == "product"] | order(_createdAt desc) [0...${visibleProducts}]`
      );
      setProducts(initialProducts);

      // Busca a quantidade total de produtos
      const totalProductsCount = await client.fetch(
        `count(*[_type == "product"])`
      );
      setTotalProducts(totalProductsCount);
    };

    getBanner();
    fetchInitialProducts();
  }, []);

  const loadMoreProducts = async () => {
    const moreProducts = await client.fetch(
      `*[_type == "product"] | order(_createdAt desc) [${visibleProducts}...${
        visibleProducts + 9
      }]`
    );
    setProducts([...products, ...moreProducts]);
    setVisibleProducts(visibleProducts + 10);
  };

  return (
    <div>
      {banner.length > 0 && <FooterBanner footerBanner={banner && banner[0]} />}
      <div className="products-container">
        {products.length > 0 &&
          products?.map((product: any) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
      <div className="w-full flex justify-center mt-6">
        <button
          disabled={products.length == totalProducts ? true : false}
          type="button"
          className="px-[20px] py-[10px] border-[1px] border-[solid] border-[#f02d34] mt-[40px] text-[18px] font-medium bg-[white] text-[#f02d34] cursor-pointer w-[200px] scale-100 [transition:transform_0.5s_ease]"
          onClick={() => loadMoreProducts()}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
