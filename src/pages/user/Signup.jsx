import React from "react";
import FormSignup from "../../components/Authentification/FormSignup";
import Header from "../../components/Header/Header";

function Signup() {
  return (
    <div className="h-screen">
      <Header></Header>
      <FormSignup/>
    </div>
  );
}

export default Signup;
