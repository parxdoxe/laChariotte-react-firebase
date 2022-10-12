import React from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { useUserAuth } from "../../context/UserAuthContext";
import Header from "../../components/Header/Header";
import ProductTab from "./ProductTab";

function SectionCart(props) {
  const standard = 0;

  const [products, setProducts] = useState([]);

useEffect(() => {
  auth.onAuthStateChanged((userlogged) => {
    if (userlogged) {
      const getCart = async () => {
        let list = [];
        const querySnapshot = await getDocs(
          collection(db, `cart-${userlogged.uid}`)
        );
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data() });
        });
        setProducts(list);
      };
      getCart();
    }
  });
}, [])

  function total() {
    let x = 0;
    products.map((i) => {
      x += i.price * i.quantity;
    });
    return x;
  }



  return (
    <>
      <div>
        <Header quantity={products.length} />
      </div>

      <div className="container mx-auto mt-10 h-[80vh]">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Panier</h1>
              <h2 className="font-semibold text-2xl">
                {products.length} Articles
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Details du produit
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Quantitée
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Prix
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>

            {products.map((product) => (
              <ProductTab
                product={product}
              />
            ))}

            <a
              href="/menu/tout"
              className="flex font-semibold text-[#27ae60] text-sm mt-10 hover:opacity-80"
            >
              <svg
                className="fill-current mr-2 text-[#27ae60] w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continuer votre menu
            </a>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Récapitulatif de la commande
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                {products.length} articles
              </span>
              <span className="font-semibold text-sm">{total()}€</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Mode de livraison
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Livraison standard : {standard}€</option>
              </select>
            </div>
            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Code Promo
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Entrez votre code"
                className="p-2 text-sm w-full"
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Appliquer
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total :</span>
                <span>{total()}€</span>
              </div>
              <a
                href="/commande/checkout"
                className="block text-center bg-[#27ae60] font-semibold  py-3 text-sm text-white uppercase w-full hover:bg-[#192a56] duration-75"
              >
                Paiement
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionCart;
