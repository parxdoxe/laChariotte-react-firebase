import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Slider.css";

function Slider() {
  return (
    // @todo Améliorer le slider
    <Carousel showArrows={true} autoPlay>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-3xl text-[#192a56]">
            Votre avis notre satisfaction
          </h2>
          <h1 className="text-7xl text-[#27ae60] tracking-wider">Food truck</h1>
          <p className="text-center my-3 text-gray-400">
            De nombreuses villes nous font confiance, découvrez ou nous trouver <br />
            afin de découvrir ce que la Chariotte propose.
          </p>
          <div className="w-1/2 flex justify-center items-center">
            <a
              className="text-center w-[30%] my-3 mr-3 w-[85%] rounded-md text-[#fff] bg-[#27ae60] py-2 px-4 hover:bg-[#192a56] duration-75"
              href="/menu"
            >
              Découvrir le menu
            </a>
            <a
              className="text-center w-[30%] my-3  w-[85%] rounded-md text-[#27ae60] border-2 border-[#192a56] py-2 px-4 hover:bg-[#192a56] duration-75"
              href="#villes"
            >
              Découvrir les villes
            </a>
          </div>
        </div>
        <img className="h-[80vh] ml-5" src="../img/home-img-1.png" alt="" />
      </div>
      <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-3xl text-[#192a56]">
            Votre avis notre satisfaction
          </h2>
          <h1 className="text-7xl text-[#27ae60] tracking-wider">Food truck</h1>
          <p className="text-center my-3 text-gray-400">
            De nombreuses villes nous font confiance, découvrez ou nous trouver <br />
            afin de découvrir ce que la Chariotte propose.
          </p>
          <div className="w-1/2 flex justify-center items-center">
            <a
              className="text-center w-[30%] my-3 mr-3 w-[85%] rounded-md text-[#fff] bg-[#27ae60] py-2 px-4 hover:bg-[#192a56] duration-75"
              href="/menu"
            >
              Découvrir le menu
            </a>
            <a
              className="text-center w-[30%] my-3  w-[85%] rounded-md text-[#27ae60] border-2 border-[#192a56] py-2 px-4 hover:bg-[#192a56] duration-75"
              href="#villes"
            >
              Découvrir les villes
            </a>
          </div>
        </div>
        <img className="h-[80vh]" src="../img/home-img-2.png" alt="" />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col w-full items-center justify-center">
          <h2 className="text-3xl text-[#192a56]">
            Votre avis notre satisfaction
          </h2>
          <h1 className="text-7xl text-[#27ae60] tracking-wider">Food truck</h1>
          <p className="text-center my-3 text-gray-400">
            De nombreuses villes nous font confiance, découvrez ou nous trouver <br />
            afin de découvrir ce que la Chariotte propose.
          </p>
          <div className="w-1/2 flex justify-center items-center">
            <a
              className="text-center w-[30%] my-3 mr-3 w-[85%] rounded-md text-[#fff] bg-[#27ae60] py-2 px-4 hover:bg-[#192a56] duration-75"
              href="/menu"
            >
              Découvrir le menu
            </a>
            <a
              className="text-center w-[30%] my-3  w-[85%] rounded-md text-[#27ae60] border-2 border-[#192a56] py-2 px-4 hover:bg-[#192a56] duration-75"
              href="#villes"
            >
              Découvrir les villes
            </a>
          </div>
        </div>
        <img className="h-[80vh]" src="../img/home-img-3.png" alt="" />
      </div>
    </Carousel>
  );
}

export default Slider;
