import React from "react";
import FormContact from "./FormContact";

function SectionContact(props) {
  return (
    <div id="contact" className="flex flex-col justify-center items-center h-screen">
      <h3 className="text-center uppercase font-bold text-[#192a56] text-3xl mb-10 skew-x-[-15deg]">
        Contactez nous :
      </h3>
      <FormContact />
    </div>
  );
}

export default SectionContact;
