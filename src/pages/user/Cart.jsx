import React from "react";
import SectionCart from "../../components/Cart/SectionCart";
import Header from "../../components/Header/Header";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
  query,
  onSnapshot
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { useUserAuth } from "../../context/UserAuthContext";

function Cart() {

  const [products, setProducts] = useState([]);

  

  useEffect(() => {
    auth.onAuthStateChanged((userlogged) => {
      
        const getCart = () => {
          const q = query(
            collection(db, `cart-${userlogged.uid}`),
          );
          onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
              data.push(doc.data());
              setProducts(data);
            });
          });
        };
        getCart();
      
    });
  }, [])



  return (
    <>
      
      <SectionCart products={products} />
    </>
  );
}

export default Cart;
