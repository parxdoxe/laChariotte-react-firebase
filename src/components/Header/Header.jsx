import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { GiFoodTruck } from "react-icons/gi";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import IconCart from "../Cart/IconCart";

function Header() {
  const { admin, logout, cart} = useUserAuth();
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
 
 



  return (
    <header className="flex justify-around items-center h-[80px] text-[#192a56]">
      <div className="flex items-end w-1/4 text-[2rem] font-medium">
        <NavLink
          to="/"
          style={{ display: "flex", color: "#27ae60", alignItems: "center" }}
        >
          <GiFoodTruck fontSize="3rem" style={{ color: "#192a56", marginBottom: "1rem" }} />
          <p className="ml-1 skew-x-[-15deg]"> .LaChariotte</p>
        </NavLink>
      </div>
      <ul className="w-1/3 flex justify-between ">
        <li className="border-b border-[#FFFFFF] duration-75 hover:border-b-2 hover:border-[#27ae60]">
          <NavLink className={({isActive}) => (isActive ? "border-b-2 border-[#27ae60]" : "")} to="/" >Accueil</NavLink>
        </li>
        <li className="border-b border-[#FFFFFF] duration-75 hover:border-b-2 hover:border-[#27ae60]">
          <NavLink className={({isActive}) => (isActive ? "border-b-2 border-[#27ae60]" : "")} to="/menu/tout">Menu</NavLink>
        </li>
        <li className="border-b border-[#FFFFFF] duration-75 hover:border-b-2 hover:border-[#27ae60]">
          <NavLink className={({isActive}) => (isActive ? "border-b-2 border-[#27ae60]" : "")} to="/a-propos">A propos</NavLink>
        </li>
        <li className="border-b border-[#FFFFFF] duration-75 hover: hover:border-[#27ae60]">
          <NavLink className={({isActive}) => (isActive ? "border-b-2 border-[#27ae60]" : "")} to="/contact">Contact</NavLink>
        </li>
      </ul>
      {admin ? (
        <ul className="w-1/4 flex justify-center items-center">
          <li className="mr-4 text-[#192a56] duration-75 hover:text-[#27ae60]">
            <NavLink to="/mon-compte">
              <FaUserCircle fontSize="2rem" />
            </NavLink>
          </li>
          <li className="mr-4 text-[#192a56] duration-75 hover:text-[#27ae60] relative">
            <NavLink to="/mon-panier">
            <IconCart cart={cart} />
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
