// @ts-nocheck
import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/sanity";
import getStripe from "../lib/getStripe";
import handler from "../api/stripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    console.log(cartItems);
    const stripe = await getStripe();
    let req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: cartItems,
    };
    const response: any = await handler(req, {});

    if (response.statusCode === 500) return;
    toast.loading("Redirecting...");
    stripe?.redirectToCheckout({ sessionId: response.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container pb-20">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.images[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc flex flex-row max-w-[150px]">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num" onClick="">
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom mt-50">
            <div className="btn-container">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
