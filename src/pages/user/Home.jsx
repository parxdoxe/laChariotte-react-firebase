import React from "react";
import Header from "../../components/Header/Header";
import SectionMenu from "../../components/Menu/SectionMenu";
import Slider from "../../components/Slider/Slider";
import SectionAbout from "../../components/About/SectionAbout";
import SectionContact from "../../components/Contact/SectionContact";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { auth, db } from "../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useUserAuth } from "../../context/UserAuthContext";

function Home() {


  
  

 

  return (
    <>
      <div id="home" className="flex justify-between flex-col h-screen">
        <Slider></Slider>
      </div>
      <div className="overflow-hidden">
        <SectionMenu></SectionMenu>
        <SectionAbout></SectionAbout>
        <SectionContact></SectionContact>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
