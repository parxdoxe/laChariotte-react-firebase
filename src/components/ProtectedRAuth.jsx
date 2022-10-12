import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from "../context/UserAuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useEffect } from "react";
import { useState } from "react";


function ProtectedRAuth({children}) {
    const { admin } = useUserAuth();

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

    if (loggeduser) {
     return <Navigate to="/" />
    }
     return children;
}

export default ProtectedRAuth;