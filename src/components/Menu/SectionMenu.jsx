import React from "react";
import SliderMulti from "./SliderMulti";

function SectionMenu(props) {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#27ae60"
          d="M0,192L21.8,165.3C43.6,139,87,85,131,74.7C174.5,64,218,96,262,122.7C305.5,149,349,171,393,165.3C436.4,160,480,128,524,149.3C567.3,171,611,245,655,250.7C698.2,256,742,192,785,170.7C829.1,149,873,171,916,160C960,149,1004,107,1047,101.3C1090.9,96,1135,128,1178,154.7C1221.8,181,1265,203,1309,202.7C1352.7,203,1396,181,1418,170.7L1440,160L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
        ></path>
      </svg>
      <h3 className="text-center uppercase font-bold text-[#192a56] text-3xl mb-10 skew-x-[-15deg]">
        Nos meilleurs produits :
      </h3>
      <div className="flex flex-col justify-center h-[50vh]">
        <SliderMulti />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#27ae60"
          d="M0,192L21.8,165.3C43.6,139,87,85,131,74.7C174.5,64,218,96,262,122.7C305.5,149,349,171,393,165.3C436.4,160,480,128,524,149.3C567.3,171,611,245,655,250.7C698.2,256,742,192,785,170.7C829.1,149,873,171,916,160C960,149,1004,107,1047,101.3C1090.9,96,1135,128,1178,154.7C1221.8,181,1265,203,1309,202.7C1352.7,203,1396,181,1418,170.7L1440,160L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}

export default SectionMenu;
