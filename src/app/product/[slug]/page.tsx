// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Image } from "next-sanity/image";
import { client, urlFor } from "../../lib/sanity";
import { useStateContext } from "../../context/StateContext";
import { Product } from "@/app/components";

export const dynamic = "force-dynamic";

const ProductDetails = ({ params }: { params: { slug: string } }) => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState<any>({});
  const [products, setProducts] = useState<any>([]);
  const { decQty, incQty, qty, onAdd, setShowCart }: any = useStateContext();

  async function getData(slug: string) {
    const productsQuery = '*[_type == "product"] | order(_createdAt desc)';
    const query = `*[_type == "product" && slug.current == "${slug}"][0] {
      _id,
      images,
      price,
      name,
      description,
      "slug": slug.current,
      "categoryName": category->name,
    }`;

    const data = await client.fetch(query);
    const products = await client.fetch(productsQuery);
    setData(data);
    setProducts(products);
  }

  const handleBuyNow = () => {
    onAdd(data, qty);
    setShowCart(true);
  };

  useEffect(() => {
    getData(params.slug);
  }, []);

  return (
    <div>
      {data.slug && (
        <div>
          <div className="product-detail-container">
            <div>
              <div className="image-container">
                <Image
                  alt="product"
                  width={400}
                  height={400}
                  src={urlFor(data.images && data.images[index])}
                  className="product-detail-image"
                />
              </div>
              <div className="small-images-container">
                {data.images?.map((item, i) => (
                  <Image
                    alt="product-small"
                    key={i}
                    width={400}
                    height={400}
                    src={urlFor(item)}
                    className={
                      i === index ? "small-image selected-image" : "small-image"
                    }
                    onMouseEnter={() => setIndex(i)}
                  />
                ))}
              </div>
            </div>

            <div className="product-detail-desc">
              <h1>{data.name}</h1>
              <div className="reviews">
                <div className="flex">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
                <p>(20)</p>
              </div>
              <h4>Details: </h4>
              <p className="max-w-[800px]">{data.description}</p>
              <p className="price">${data.price}</p>
              <div className="quantity">
                <h3>Quantity:</h3>
                <p className="quantity-desc flex">
                  <span className="minus" onClick={decQty}>
                    <AiOutlineMinus />
                  </span>
                  <span className="num">{qty}</span>
                  <span className="plus" onClick={incQty}>
                    <AiOutlinePlus />
                  </span>
                </p>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  className="add-to-cart"
                  onClick={() => onAdd(data, qty)}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="buy-now"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className="maylike-products-wrapper">
            <h2>You may also like</h2>
            <div className="marquee">
              <div className="maylike-products-container track">
                {products.map((item) => (
                  <Product key={item._id} product={item} />
                ))}
              </div>
            </div>
            <div className="marquee">
              <div className="maylike-products-container track">
                {products.reverse().map((item) => (
                  <Product key={item._id} product={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
