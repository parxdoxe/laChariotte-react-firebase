import React from "react";
import { collection, getDocs, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useEffect } from "react";
import { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import SideBar from "./SideBar";
import Header from "../Header/Header";

function Update(props) {
  const [error, setError] = useState(false);
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [adress, setAdress] = useState();
  const [lastName, setLastName] = useState();
  const [postal, setPostal] = useState();
  const [tel, setTel] = useState();
  const [close, setClose] = useState(true);
  const {admin, upEmail} = useUserAuth()

  const commune = [
    "Marconne",
    "Verquin",
    "Béthune",
    "Anzin-Saint-Aubin",
    "Arras",
    "Locon",
  ];

  function GetUser() {
    const [user, setUser] = useState("");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUser = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUser();
        }
      });
    }, []);
    return user;
  }

  const loggeduser = GetUser();

  const updateProfil = () => {
    const ref = doc(db, "users", admin.uid)

    const update = async () => {
      await updateDoc(ref, {
        name: name,
        lastName: lastName,
        city: city,
        adresse: adress,
        codePostal: postal,
        numeroTel: tel,
      })
    }
    update()
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }

  

  return (
    <div>
      
      <div className="flex">
      <SideBar />
      {loggeduser ? (
        <>
          <div className="flex justify-center items-center block p-6 rounded-lg shadow-lg bg-white w-[70%] mx-auto">
        <form onSubmit={updateProfil}>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-describedby="emailHelp123"
                placeholder="Votre nom"
                defaultValue={loggeduser[0].lastName}
                onChange={(e)=>setLastName(e.target.value)}
              />
            </div>
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Votre prenom"
                defaultValue={loggeduser[0].name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <select
                className="form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              defaultValue={loggeduser[0].city}
                name="city"
                id="city"
                onChange={(e)=>setCity(e.target.value)}
                
              >
                <option disabled value="votre ville">
                  Votre ville
                </option>
                {commune.map((c, index) => (
                  <option key={index} >
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Votre adresse"
                onChange={(e)=>setAdress(e.target.value)}
                defaultValue={loggeduser[0].adress}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <input
                type="text"
                defaultValue={loggeduser[0].postal}
                onChange={(e)=>setPostal(e.target.value)}
                className="form-control
                
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-describedby="emailHelp123"
                placeholder="Votre code postal"
                
              />
            </div>
            <div className="form-group mb-6">
            <div class="relative">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="4cm"
                  viewBox="-10 -10 3020 2020"
                >
                  <g id="French_Flag_by_Adam_Stanislav">
                    <title>Flag of France, by Adam Stanislav</title>
                    <rect
                      fill="rgb(0%,14%,58%)"
                      x="0"
                      y="0"
                      width="1010"
                      height="2000"
                    />
                    <rect
                      fill="rgb(97%,97%,97%)"
                      x="1000"
                      y="0"
                      width="1010"
                      height="2000"
                    />
                    <rect
                      fill="rgb(93%,16%,22%)"
                      x="2000"
                      y="0"
                      width="1000"
                      height="2000"
                    />
                    <rect
                      fill="none"
                      stroke="rgb(55%,55%,55%)"
                      stroke-width="10"
                      x="0"
                      y="0"
                      width="3000"
                      height="2000"
                    />
                  </g>
                </svg>
              </div>
              <input
                type="text"
                class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Numéro de téléphone"
                defaultValue={loggeduser[0].tel}
                onChange={(e)=>setTel(e.target.value)}
              />
            </div>
          </div>
          </div>
          
          <button
            type="submit"
            className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            Modifier
          </button>
        </form>
      </div>
        </>
      ) : (
        ""
      )}
    </div>
    </div>
  );
}

export default Update;
