import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { auth } from "../../firebase-config";
import { browserSessionPersistence, setPersistence } from "firebase/auth";

function FormLogin() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!checked) {
        await setPersistence(auth, browserSessionPersistence);
      }
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email :
            </label>
            <input
              className="s w-full
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
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mot de passe :
            </label>
            <input
              className=" w-full
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
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="mr-2"
              type="checkbox"
              onClick={(e) => setChecked(!checked)}
            />
            <label htmlFor="">Se souvenir de moi</label>
          </div>
          {error && (
            <div className="flex justify-center items-center w-full mb-4">
              <span className="text-red-500 text-center text-sm">
                Il y a une erreur dans le mail ou le mot de passe
              </span>
            </div>
          )}
          <div className="flex flex-col items-center justify-between">
            <button
              className="
              w-1/2
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
              Se connecter
            </button>
            <a
              className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800 mt-4"
              href="/mot-de-passe-oublie"
            >
              Mot de passe oublié ?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
