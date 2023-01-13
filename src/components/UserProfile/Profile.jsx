import React from "react";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useEffect } from "react";
import { useState } from "react";
import SideBar from "./SideBar";
import { FaUserCircle } from "react-icons/fa";
import { useUserAuth } from "../../context/UserAuthContext";

function Profile(props) {
  const { admin } = useUserAuth();

  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    if (admin) {
      const getCurrentUser = () => {
        const q = query(
          collection(db, "users"),
          where("email", "==", admin.email)
        );

        onSnapshot(q, (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
            setCurrentUser(data);
          });
        });
      };

      getCurrentUser();
    } 
  }, []);

  console.log(currentUser);

  return (
    <div className="flex">
      <SideBar />
      <div className="w-[70%] mx-auto bg-gray-50 rounded drop-shadow-xl">
        <div className="flex items-center justify-center relative w-full h-1/4 bg-gray-50 rounded drop-shadow-xl">
          <h3 className="text-center mb-6 uppercase font-medium text-xl">
            {" "}
            Votre profil
          </h3>
          <div className="absolute bottom-[-50px] inset-x-[46%]">
            <FaUserCircle fontSize="8rem" color="#27ae60" />
          </div>
        </div>

        {currentUser && (
          <>
            {currentUser?.map((user) => (
              <>
                <div className="flex flex-col justify-center items-center mt-[7rem] mb-6">
                  <p>Email :</p>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                <div className="flex flex-col justify-center items-center mb-6">
                  <p>Nom & Prénom :</p>
                  <p className="text-gray-500">
                    {user.lastName} {user.name}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center mb-6">
                  <p>Adresse :</p>
                  <p className="text-gray-500">
                    {user.adresse} , {user.city}{" "}
                    {user.codePostal}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center mb-6">
                  <p>Numéro de téléphone :</p>
                  <p className="text-gray-500">{user.numeroTel}</p>
                </div>
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
