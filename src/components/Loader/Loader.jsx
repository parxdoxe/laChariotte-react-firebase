import React from "react";

function Loader(props) {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#192a56]">
      <img src="../img/circles.svg" alt="" />
      <p className="text-[#fff]">Chargement...</p>
    </div>
  );
}

export default Loader;
