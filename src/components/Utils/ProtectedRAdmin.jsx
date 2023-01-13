import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from "../../context/UserAuthContext";
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useEffect } from "react";
import { useState } from "react";


function ProtectedRAdmin({children}) {
  
 
  
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

  const roleConvert = currentUser?.map((u) => u.role);
  const role = (roleConvert?.toString());

  console.log(role);













  if (role && role !== "admin" || !admin ) {
      return <Navigate to="/admin/login" />
  } 
  
   return children;
}

export default ProtectedRAdmin;