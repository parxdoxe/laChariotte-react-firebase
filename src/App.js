import { Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/admin/LoginAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import Account from "./pages/user/Account";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import About from "./pages/user/About";
import Signup from "./pages/user/Signup";
import ListUsers from "./pages/admin/ListUsers";
import Menu from "./pages/user/Menu";
import Cart from "./pages/user/Cart";
import Contact from "./pages/user/Contact";
import ProtectedRUser from "./components/Utils/ProtectedRUser";
import Update from "./components/UserProfile/Update";
import Checkout from "./components/Cart/Checkout";
import Stripe from "./components/Cart/Stripe";
import ResetPassword from "./components/Authentification/ResetPassword";
import ProtectedRAuth from "./components/Utils/ProtectedRAuth";
import NotFound from "./components/NotFound/NotFound";
import Header from "./components/Header/Header";
import ProtectedRAdmin from "./components/Utils/ProtectedRAdmin";
import { useUserAuth } from "./context/UserAuthContext";
import {auth, db} from "./firebase-config"
import { useState, useEffect } from "react";

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

function App() {

  
  







  return (
    <>
      <Header />
      <Routes>
        <Route path="/admin">
          <Route
            index
            element={
              <ProtectedRAdmin  >
                <HomeAdmin />
              </ProtectedRAdmin>
            }
          />
          <Route path="login" element={<LoginAdmin />} />
          <Route
            path="list-users"
            element={
              <ProtectedRUser>
                <ListUsers />
              </ProtectedRUser>
            }
          />
        </Route>
        <Route path="/">
          <Route index element={<Home  />} />
          <Route
            path="login"
            element={
              <ProtectedRAuth>
                {" "}
                <Login />{" "}
              </ProtectedRAuth>
            }
          />
          <Route path="mot-de-passe-oublie" element={<ResetPassword />} />
          <Route
            path="signup"
            element={
              <ProtectedRAuth>
                {" "}
                <Signup />{" "}
              </ProtectedRAuth>
            }
          />
          <Route
            path="mon-compte"
            element={
              <ProtectedRUser>
                <Account />
              </ProtectedRUser>
            }
          />
          <Route
            path="mon-compte/modifier"
            element={
              <ProtectedRUser>
                <Update />
              </ProtectedRUser>
            }
          />

          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="mon-panier"
            element={
              <ProtectedRUser>
                <Cart />
              </ProtectedRUser>
            }
          />
          <Route
            path="mon-panier/checkout"
            element={
              <ProtectedRUser>
                <Stripe />
              </ProtectedRUser>
            }
          />

          <Route path="menu/tout" element={<Menu />} />
          <Route path="menu/type-burgers" element={<Menu type={"burgers"} />} />
          <Route path="menu/type-plats" element={<Menu type={"plats"} />} />
          <Route
            path="menu/type-boissons"
            element={<Menu type={"boissons"} />}
          />
          <Route path="menu/type-sauces" element={<Menu type={"sauces"} />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
