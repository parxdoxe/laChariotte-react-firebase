import { doc, updateDoc, setDoc, increment } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase-config";
import { AiOutlineHeart, AiFillHeart, AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Card({ product }) {
  const { admin } = useUserAuth();
  const [success, setSuccess] = useState(false);
  const [event, setEvent] = useState(true);
  const [click, setClick] = useState();
  const navigate = useNavigate();

  const addToCart = () => {
    if (admin) {
      const test = doc(db, `cart-${admin.uid}`, `article-${product.id}`);

      setDoc(test, product, { merge: true }).then(() => {
        setSuccess(true);
      });

      const updateTest = async () => {
        await updateDoc(test, {
          cart: true,
          quantity: increment(1),
        });
      };
      updateTest();
      setClick(!click);
      setTimeout(() => {
        window.location.reload()
      }, 400);
      setTimeout(() => {
        setClick(false);
      }, 1000);
      
    } else {
      navigate("/login");
    }
  };

  const changHeart = () => {
    setEvent(!event);
  };

  return (
    <div className="flex flex-col items-center relative justify-end relative w-1/4 h-[250px] bg-[#fff] shadow-xl  rounded-xl mr-4 mb-20">
      
      <img
        className="rounded-[100%] w-[150px] absolute z-1 top-[-20%] rigth-[25%]"
        src={product.images}
        alt={product.name}
      />
      
        <>
          <div className="text-center my-5 px-4">
            <h4 className="text-lg font-medium mb-2">{product.name}</h4>
            <p className="overflow text-sm text-gray-400">{product.description}</p>
          </div>

          {click ? (
            <div className="absolute top-[-15px] right-[-5px]">
              <AiFillCheckCircle color="#192a56" fontSize="2rem" />
            </div>
          ) : (
            ""
          )}

          <div className="flex justify-between w-[85%]">
            <span className="font-bold">{product.price}€</span>
            <span className="cursor-pointer" onClick={changHeart}>
              {event ? (
                <AiOutlineHeart color="#EBD671" fontWeight="bold" />
              ) : (
                <AiFillHeart color="#EBD671" />
              )}{" "}
            </span>
          </div>

          {!click ? (
          <button
            className="my-3  w-[85%] rounded-md text-[#fff] bg-[#27ae60] py-2 px-4 hover:bg-[#192a56] duration-75"
            onClick={addToCart}
          >
            Ajouter au panier
          </button>
        ) : (
          (<button className="flex items-center justify-center my-3  w-[85%] rounded-md text-[#fff] bg-[#27ae60] py-2 px-4 cursor-not-allowed opacity-80">
            Ajouté <AiFillCheckCircle color="#192a56" fontSize="1rem" style={{ marginLeft: "5px" }} />
          </button>)
        )}
          
        </>
      
    </div>
  );
}

export default Card;
