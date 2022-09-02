import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase-config";
import Card from "./Card";
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function Results(props) {
  const [menus, setMenus] = useState([]);
  const [allMenus, setAllMenus] = useState([]);
  const [loader, setLoader] = useState(true)


  useEffect(() => {
    if (typeof props.type === "string") {
      const getMenus = async () => {
        const q = query(
          collection(db, "produits"),
          where("type", "==", props.type)
        );
        const data = await getDocs(q);
        setMenus(data.docs.map((doc) => ({ ...doc.data() })));
      };
      getMenus();
    } else {
      const getAll = async () => {
        const q = query(collection(db, "produits"));
        const data = await getDocs(q);
        setAllMenus(data.docs.map((doc) => ({ ...doc.data() })));
      };
      getAll();
    }
  }, []);

  const toggleTab = () => {
    setInterval(() => {
        window.location.reload()
    }, 100);
  }


  return  (
    <>
      <div className="flex justify-center items-center flex-col w-full flex-wrap mt-10 mb-20">
        <h2 className="font-bold text-[#192a56] text-2xl uppercase mb-4 skew-x-[-15deg]">
          Menu Chariotte :
        </h2>
        <ul className="flex justify-between text-xl text-[#fff] bg-[#27ae60] skew-x-[-15deg] cursor-pointer border border-[#192a56] mb-4">
          <li onClick={toggleTab} className="py-2">
            <NavLink to="/menu/tout" className={({isActive}) => (isActive ? "bg-[#192a56] p-2" : "p-2")}>Tout</NavLink>
          </li>
          <li onClick={toggleTab} className="py-2">
            <NavLink to="/menu/type-plats" className={({isActive}) => (isActive ? "bg-[#192a56] p-2" : "p-2")}>Plats</NavLink>
          </li>
          <li onClick={toggleTab} className="py-2">
            <NavLink to="/menu/type-burgers" className={({isActive}) => (isActive ? "bg-[#192a56] p-2" : "p-2")}>Burgers</NavLink>
          </li>
          <li onClick={toggleTab} className="py-2">
            <NavLink to="/menu/type-boissons" className={({isActive}) => (isActive ? "bg-[#192a56] p-2" : "p-2")}>Boissons</NavLink>
          </li>
          <li onClick={toggleTab} className="py-2">
            <NavLink to="/menu/type-sauces" className={({isActive}) => (isActive ? "bg-[#192a56] p-2" : "p-2")}>Sauces</NavLink>
          </li>
        </ul>
      </div>

      {typeof props.type === "string" ? (
        <div className="flex justify-center flex-wrap">
          {menus.map((product) => (
            <Card product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center flex-wrap">
          {allMenus.map((product) => (
            <Card product={product} key={product.id}/>
          ))}
        </div>
      )}
    </>
  );
}

export default Results;
