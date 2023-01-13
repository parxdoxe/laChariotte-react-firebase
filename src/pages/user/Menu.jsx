import React from "react";
import Results from "../../components/Details/Results";
import Header from "../../components/Header/Header";
import FooterMenu from "../../components/Footer/FooterMenu";

function Menu(props) {
  return (
    <>
     
      <Results type={props.type} />
      <FooterMenu />
    </>
  );
}

export default Menu;
