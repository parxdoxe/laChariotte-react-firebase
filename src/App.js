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
          <Route path="login" element={<ProtectedRUser> <Login /> </ProtectedRUser>} />
          <Route path="signup" element={<ProtectedRUser><Signup /></ProtectedRUser>} />
          <Route path="Account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="commande" element={<Cart />} />
          <Route path="menu" element={<Menu />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
