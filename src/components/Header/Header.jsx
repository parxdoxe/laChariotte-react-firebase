import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { GiFoodTruck } from "react-icons/gi";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

function Header({quantity}) {
  const { admin, logout } = useUserAuth();
  const [ user, setUser ] = useState()
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

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
  }, []);

  const test = "absolute top-[-10px] text-red-600 z-1 right-[-10px] font-bold";
  const test2 =
    "absolute top-[-10px] text-green-600 z-1 right-[-10px] font-bold";

  return (
    <header className="flex justify-around items-center h-[80px] text-[#192a56]">
      <div className=" w-1/4 text-[2rem] font-medium">
        <NavLink
          to="/"
          style={{ display: "flex", color: "#27ae60", alignItems: "center" }}
        >
          <GiFoodTruck fontSize="2rem" style={{ color: "#192a56" }} />
          .La Chariotte
        </NavLink>
      </div>
      <ul className="w-1/3 flex justify-between items-center">
        <li className="border-b border-[#F6F6F6] duration-75 hover:border-b-2 hover:border-[#27ae60]">
          <NavLink to="/">Accueil</NavLink>
        </li>
        <li className="border-b border-[#F6F6F6] duration-75 hover:border-b-2 hover:border-[#27ae60]">
          <NavLink to="/menu">Menu</NavLink>
        </li>
        <li className="border-b border-[#F6F6F6] duration-75 hover:border-b-2 hover:border-[#27ae60]">
          <a href="/#about">A propos</a>
        </li>
        <li className="border-b border-[#F6F6F6] duration-75 hover:border-b-2 hover:border-[#27ae60]">
          <a href="/#contact">Contact</a>
        </li>
      </ul>
      {admin ? (
        <ul className="w-1/4 flex justify-center items-center">
          <li className="mr-4 text-[#192a56] duration-75 hover:text-[#27ae60]">
            <NavLink to="/Account">
              <FaUserCircle fontSize="2rem" />
            </NavLink>
          </li>
          <li className="mr-4 text-[#192a56] duration-75 hover:text-[#27ae60] relative">
            <NavLink to="/commande">
              <FaShoppingCart fontSize="1.5rem" />
              <span className={products.length === 0 ? test : test2}>
                {products.length}
              </span>
            </NavLink>
          </li>
          <li>
            <button
              className="border-b border-[#F6F6F6] duration-75 hover:border-b-2 hover:border-[#27ae60]"
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          </li>
        </ul>
      ) : (
        <ul className="w-1/4 flex justify-center items-center">
          <li>
            <a className="mr-4 bg-[#27ae60] text-white py-2 px-5 rounded-lg cursor-pointer duration-75 hover:bg-[#192a56]" href="/login">Connexion</a>
          </li>
          <li>
            <a className="mr-4 bg-[#192a56] text-white py-2 px-5 rounded-lg cursor-pointer duration-75 hover:bg-[#27ae60]" href="/signup">Inscription</a>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;