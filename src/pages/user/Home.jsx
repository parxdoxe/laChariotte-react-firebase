import React from "react";
import Header from "../../components/Header/Header";
import SectionMenu from "../../components/Menu/SectionMenu";
import Slider from "../../components/Slider/Slider";
import SectionAbout from "../../components/About/SectionAbout";
import SectionContact from "../../components/Contact/SectionContact";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect} from "react"
import Loader from "../../components/Loader/Loader";

function Home() {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])

  return loader ? (<Loader />) : (
    <>
      <div id="home" className="flex justify-between flex-col h-screen">
        <Header></Header>
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
