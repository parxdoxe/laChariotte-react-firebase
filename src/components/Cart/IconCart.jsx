import React from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function IconCart({cart}) {

    const styleCart =
    "absolute top-[-10px] text-green-600 z-1 right-[-10px] font-bold";

  return (
    <>
      <FaShoppingCart fontSize="1.5rem" />
      <span className={cart.length === 0 ? "" : styleCart}>
        {cart.length === 0 ? "" : cart.length}
      </span>
    </>
  );
}
