import React from "react";
import Header from "../../components/Header/Header";
import { useUserAuth } from "../../context/UserAuthContext";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  Firestore,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useEffect } from "react";
import { useState } from "react";

function Account() {
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

  console.log(loggeduser);

  return (
    <div>
      <Header></Header>
      {loggeduser ? (
        <div>
          <div>{loggeduser[0].email}</div>
          <div>{loggeduser[0].lastName} {loggeduser[0].name}</div>
          
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Account;
