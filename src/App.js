import { Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/admin/LoginAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import Account from "./pages/user/Account";
import Home from "./pages/user/Home";
import ProtectedR from "./components/ProtectedR";
import Login from "./pages/user/Login";
import About from "./pages/user/About"
import Signup from "./pages/user/Signup";
import ListUsers from "./pages/admin/ListUsers";
import Menu from "./pages/user/Menu";
import Cart from "./pages/user/Cart";
import Contact from "./pages/user/Contact";
import ProtectedRUser from "./components/ProtectedRUser";
import Update from "./components/UserProfile/Update";
import Checkout from "./components/Cart/Checkout";
import Stripe from "./components/Cart/Stripe";
import ResetPassword from "./components/Authentification/ResetPassword";
import ProtectedRAuth from "./components/ProtectedRAuth";
import NotFound from "./components/NotFound/NotFound";


function App() {

  return  (
    
    <>
    
      <Routes>
        <Route path="/admin">
          <Route
            index
            element={
              <ProtectedR>
                <HomeAdmin />
              </ProtectedR>
            }
          />
          <Route path="login" element={<LoginAdmin />} />
          <Route
            path="list-users"
            element={
              <ProtectedR>
                <ListUsers />
              </ProtectedR>
            }
          />
        </Route>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<ProtectedRAuth > <Login /> </ProtectedRAuth>  } />
          <Route path="mot-de-passe-oublie" element={ <ResetPassword /> } />
          <Route path="signup" element={<ProtectedRAuth > <Signup /> </ProtectedRAuth> } />
          <Route path="mon-compte" element={<ProtectedRUser><Account /></ProtectedRUser>} />
          <Route path="mon-compte/modifier" element={<ProtectedRUser><Update /></ProtectedRUser>} />
          
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="mon-panier" element={<ProtectedRUser><Cart /></ProtectedRUser>} />
          <Route path="mon-panier/checkout" element={<ProtectedRUser><Stripe /></ProtectedRUser>} />

          <Route path="menu/tout" element={<Menu />} />
          <Route path="menu/type-burgers" element={<Menu type={'burgers'} />} />
          <Route path="menu/type-plats" element={<Menu type={'plats'} />} />
          <Route path="menu/type-boissons" element={<Menu type={'boissons'} />} />
          <Route path="menu/type-sauces" element={<Menu type={'sauces'} />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
