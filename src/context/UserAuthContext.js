import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
} from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
  onSnapshot,
  deleteDoc,
  getDoc,
  query,
  where
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Loader from "../components/Loader/Loader";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [admin, setAdmin] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function upEmail(email) {
    return updateEmail(auth, email);
  }

  const [cart, setCart] = useState([]);

  const deleteProduct = (index) => {
    const remove = async () => {
      await deleteDoc(doc(db, `cart-${admin.uid}`, `article-${index}`));
    };
    remove();
  };

  useEffect(() => {
    const cartUser = auth.onAuthStateChanged((userlogged) => {
      if (userlogged) {
        const q = query(collection(db, `cart-${userlogged.uid}`));

        onSnapshot(q, (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());

            setCart(data);
          });
        });
      }
    });

    return cartUser;
  }, []);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setAdmin(currentuser);
      
    });
    
    return unsubscribe
  }, []);
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true);
      if (currentUser) {
        const userRef = doc(collection(db, "users"), currentUser.email);
        const _unsub = onSnapshot(userRef, (snap) => {
          setUser(snap);
     
        });
        setLoading(false);
      } else {
        console.log("Auth state changed to disconnected");
        setUser(null);
        setLoading(false);
      }
    });

    return authUnsubscribe;
  }, []);


 

  


  

  

  

  return loading ? (
    <Loader />
  ) : (
    <userAuthContext.Provider
      value={{
        admin,
        logIn,
        logout,
        signup,
        resetPassword,
        upEmail,
        cart,
        deleteProduct,
        user,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
