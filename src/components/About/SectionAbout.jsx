import React from "react";
import {AiFillEnvironment} from "react-icons/ai"

function SectionAbout() {
  return (
    <div className="flex flex-col justify-around items-center h-screen">
      <h3 className="text-center uppercase font-bold text-[#192a56] text-3xl mb-10 skew-x-[-15deg]">Qui sommes-nous ? :</h3>
      <div id="about" className=" flex">
        <div className="flex justify-center items-center relative w-1/2">
          <img
            className="w-1/2 rounded-full"
            src="../img/chariotte.jpg"
            alt=""
          />
          <div className="w-4/5 absolute top-[-150px] left-[90px] z-[-1] ">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#192A56"
                d="M43.8,-59.9C54.4,-52.6,59,-36.6,63.5,-21.1C67.9,-5.5,72.3,9.7,69,23.2C65.7,36.7,54.8,48.6,42.1,56.6C29.3,64.5,14.6,68.6,0.9,67.3C-12.7,66,-25.5,59.3,-38.7,51.5C-51.9,43.7,-65.6,34.7,-74.6,21C-83.6,7.2,-88,-11.4,-81.5,-25C-75,-38.5,-57.7,-47.1,-42.3,-52.9C-26.9,-58.7,-13.5,-61.8,1.6,-64C16.6,-66.1,33.2,-67.3,43.8,-59.9Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-1/2 mr-10 text-center text-gray-400">
          <p className="mb-4">
            Le food truck La Chariotte vous propose de vous régaler avec des
            plats à emporter, allant de la street food, à des plats plus
            traditionnels, élaborés dans notre joli camion devant vous. Nous
            essayons d’utiliser un maximum de produits provenant des
            Hauts-de-France.
          </p>
          <p className="mb-4">
            Que ce soit pour un petit frichti sur le pouce, ou pour vos
            anniversaires 🎈 🎂 🥳 , mariage 💒, ou autre événement, nous sommes
            là pour vous proposer nos services culinaires, et faire partager
            notre état d’esprit associant saveurs et bonne humeur 🙃
          </p>
          <p>Allez les petits fillots en route, allons menez la chariotte!</p>
        </div>
      </div>
      <div id="villes" className="">
        <AiFillEnvironment />
      </div>
    </div>
  );
}

export default SectionAbout;
