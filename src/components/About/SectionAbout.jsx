import React from "react";
import { AiFillEnvironment } from "react-icons/ai";

function SectionAbout() {
  return (
    <div className="flex flex-col justify-around items-center h-[150vh]">
      <h3 className="text-center uppercase font-bold text-[#192a56] text-3xl mb-10 skew-x-[-15deg]">
        Qui sommes-nous ? :
      </h3>
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

      <div id="villes" className="flex flex-col justify-center items-center">
        <h2 className="flex text-3xl font-bold text-[#27ae60] skew-x-[-15deg]">
          <AiFillEnvironment style={{ marginRight: "5px" }} /> Retrouvez nous ici <AiFillEnvironment style={{ marginLeft: "5px" }} />
        </h2>
        <h3>
          Le midi de <strong>11h45 à 13h45</strong>, le soir de{" "}
          <strong>18h45 à 21h</strong>{" "}
        </h3>

        <ul className="flex items-center justify-center ">
          <li className="mr-[10rem] mb-4 mt-5">
            <p className="text-center">Lundi Midi</p>
            <p className="text-center">Leroy Merlin, Verquin - Béthune.</p>
          </li>
          <li>
            <p className="text-center">Mardi Midi</p>
            <p>Décathlon, Béthune.</p>
          </li>
        </ul>

        <ul className="flex items-center justify-center">
          <li className="mr-[10rem] mb-4">
            <p className="text-center">Mercredi Soir</p>
            <p className="text-center">Anzin St Aubin, place Jehan Bodel</p>
          </li>
          <li>
            <p className="text-center">Jeudi Midi</p>
            <p >Leroy Merlin, Arras.</p>
          </li>
        </ul>

        <ul className="flex items-center justify-between mt-3">
          <li className="mr-[8rem]">
            <p className="text-center">Jeudi Soir</p>
            <p className="text-center">Tiloy Les Mofflaines, place Armand Duval.</p>
          </li>
          <li>
            <p className="text-center">Vendredi Soir</p>
            <p>Locon, place de l'église.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SectionAbout;
