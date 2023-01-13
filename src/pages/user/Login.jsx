import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import Header from '../../components/Header/Header';
import FormLogin from "../../components/Authentification/FormLogin";

function Login() {

  
  return (
    <div className="h-screen">
      <FormLogin />
    </div>
  );
}

export default Login;
