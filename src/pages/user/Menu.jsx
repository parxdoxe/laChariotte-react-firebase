import React from "react";
import Header from "../../components/Header/Header";
import Results from "../../components/Details/Results";
import HeaderMenu from "../../components/Header/HeaderMenu";
import FooterMenu from "../../components/Footer/FooterMenu";

function Menu() {
  return (
    <>
      <HeaderMenu />
      <Results />
      <FooterMenu />
    </>
  );
}

export default Menu;
