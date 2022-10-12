import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useEffect } from "react";
import { useState } from "react";
import SideBar from "./SideBar";
import { FaUserCircle } from "react-icons/fa";

function Profile(props) {
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

  return (
    <div className="flex">
      <SideBar />
      <div className="w-[70%] mx-auto bg-gray-50 rounded drop-shadow-xl">
        <div className="flex items-center justify-center relative w-full h-1/4 bg-gray-50 rounded drop-shadow-xl">
          <h3 className="text-center mb-6 uppercase font-medium text-xl"> Votre profil</h3>
          <div className="absolute bottom-[-50px] inset-x-[44%]">
            <FaUserCircle fontSize="8rem" color="#27ae60" />
          </div>
        </div>

        {loggeduser && (
          <>
            <div className="flex flex-col justify-center items-center mt-[7rem] mb-6">
              <p>Email :</p>
              <p className="text-gray-500">{loggeduser[0].email}</p>
            </div>
            <div className="flex flex-col justify-center items-center mb-6">
              <p>Nom & Prénom :</p>
              <p className="text-gray-500">{loggeduser[0].lastName} {loggeduser[0].name}</p>
            </div>
            <div className="flex flex-col justify-center items-center mb-6">
              <p>Adresse :</p>
              <p className="text-gray-500">{loggeduser[0].adresse} , {loggeduser[0].city} {loggeduser[0].codePostal}</p>
            </div>
            <div className="flex flex-col justify-center items-center mb-6">
              <p>Numéro de téléphone :</p>
              <p className="text-gray-500">{loggeduser[0].numeroTel}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
