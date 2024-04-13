// @ts-nocheck
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";

const links = [
  { name: "All Products", href: "/all_products" },
  { name: "Categories", href: "/Categories" },
  { name: "SigIn", href: "/SigIn" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Hokusai Emporium</Link>
      </p>

      <div className="flex">
        <nav className=" hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="ml-10">
          <button
            type="button"
            className="cart-icon"
            onClick={() => setShowCart(true)}
          >
            <span className="cart-item-qty">{totalQuantities}</span>
            <AiOutlineShopping />
          </button>

          {showCart && <Cart />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
