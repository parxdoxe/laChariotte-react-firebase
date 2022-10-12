import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { auth } from "../../firebase-config"


function ResetPassword(props) {
    const [error, setError] = useState(false);
  const [email, setEmail] = useState(false);
  const [message, setMessage] = useState();
  const { resetPassword } = useUserAuth();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage('')
    try {
      await resetPassword(email);
      setMessage("Regardez dans votre boîte mail et suivez les instructions.")
    } catch(err) {
      console.log(err);
      setError(true);
    }
  };

    return (
        <div className="flex items-center justify-center h-[80vh]">
        <div className="w-full max-w-xs">
        {message &&  ( <div className="text-center text-green-500">{message}</div> )}
          <form
            onSubmit={handleReset}
            className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
          >
            <h3 className="uppercase font-bold text-center mb-4 text-[#27ae60]">Mot de passe oublié ?</h3>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email :
              </label>
              <input
                className="w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                outline-none
                focus:text-gray-700 focus:ring-0 focus:bg-white focus:border-[#27ae60] focus:outline-none"
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && (
            <div className="flex justify-center items-center w-full mb-4">
            <span className="text-red-500 text-center text-sm">
              L'email n'existe pas.
            </span>
            </div>
          )}
            
            <div className="flex flex-col items-center justify-between">
              <button
                className="w-1/2
                px-4
                py-3
                bg-[#192a56]
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-[#27ae60] hover:shadow-lg
                transition
                duration-150
                ease-in-out"
                type="submit"
              >
                Réinitialiser
              </button>
              
            </div>
          </form>
        </div>
      </div>
    );
}

export default ResetPassword;