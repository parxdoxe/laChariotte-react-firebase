import React from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db, auth } from "../../firebase-config";
import { Link } from "react-router-dom";
import Card from "./Card";
import CardSauce from "./CardSauce";
import CardPlats from "./CardPlats";
import { useUserAuth } from "../../context/UserAuthContext";

function Results(props) {
  const [menus, setMenus] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [plats, setPlats] = useState([]);
  const [toggleTab, setToggleTab] = useState(0);
  const { admin } = useUserAuth();

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "burgers"));
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data() });
        });
        setMenus(list);
      } catch (err) {
        console.log(err);
      }
    };
    const getSauces = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "sauces"));
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data() });
        });
        setSauces(list);
      } catch (err) {
        console.log(err);
      }
    };
    const getPlats = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "plats"));
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data() });
        });
        setPlats(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    getSauces();
    getPlats()
  }, []);

  function GetCart() {
    const [item, setItem] = useState("");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        const getCart = async () => {
          const q = query(collection(db, `cart-${userlogged.uid}`));
          const data = await getDocs(q);
          setItem(data.docs.map((doc) => ({ ...doc.data() })));
        };
        getCart();
      });
    }, []);
    return item;
  }

  const items = GetCart();

  const listBurgers = menus.map((burger, index) => (
    <Card burger={burger} key={index} />
  ));

  const listSauces = sauces.map((sauce, index) => (
    <CardSauce sauce={sauce} cart={items} key={index} />
  ));

  const listPlats = plats.map((plat, index) => (
    <CardPlats plat={plat}  key={index} />
  ));


  const toggleTabs = (index) => {
    setToggleTab(index);
  };



  return (
    <>
      <div className="flex justify-center items-center w-full flex-wrap mt-10 mb-20">
        <h2 className="font-bold text-[#192a56] text-2xl uppercase mr-4 skew-x-[-15deg]">
          Menu Chariotte :
        </h2>
        <ul className="flex justify-between text-xl text-[#fff] bg-[#27ae60] skew-x-[-15deg] cursor-pointer border border-[#192a56]">
          <li
            className={toggleTab === 0 ? "bg-[#192a56] p-2" : "p-2"}
            onClick={() => toggleTabs(0)}
          >
            Tout
          </li>
          <li
            className={toggleTab === 1 ? "bg-[#192a56] p-2" : "p-2"}
            onClick={() => toggleTabs(1)}
          >
            Plats
          </li>
          <li
            className={toggleTab === 2 ? "bg-[#192a56] p-2" : "p-2"}
            onClick={() => toggleTabs(2)}
          >
            Burgers
          </li>
          <li
            className={toggleTab === 3 ? "bg-[#192a56] p-2" : "p-2"}
            onClick={() => toggleTabs(3)}
          >
            Boissons
          </li>
          <li
            className={toggleTab === 4 ? "bg-[#192a56] p-2" : "p-2"}
            onClick={() => toggleTabs(4)}
          >
            Sauces
          </li>
        </ul>
      </div>
      <div className="flex justify-center flex-wrap">
        {toggleTab === 0 ? (
          <>
            {" "}
            <> {listPlats} {listBurgers}</> {listSauces} 
          </>
        ) : (
          ""
        )}
        {toggleTab === 1 ? listPlats : ""}
        {toggleTab === 2 ? listBurgers : ""}
        {toggleTab === 3 ? listSauces : ""}
        {toggleTab === 4 ? listSauces : ""}
      </div>
    </>
  );
}

export default Results;
