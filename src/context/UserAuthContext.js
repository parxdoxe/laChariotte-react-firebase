import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [admin, setAdmin] = useState({});
  
    function logIn(email, password) {
      return signInWithEmailAndPassword(auth, email, password);
    }

    function signup(email, password) {
      return createUserWithEmailAndPassword(auth, email, password)
    }

    function logout() {
      return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
          setAdmin(currentuser);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);

    return (
    <userAuthContext.Provider
        value={{ admin, logIn, logout, signup }}
    >
        {children}
    </userAuthContext.Provider>
    );

}

export function useUserAuth() {
    return useContext(userAuthContext);
  }