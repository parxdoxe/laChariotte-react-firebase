import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";

function FormSignup(props) {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [adress, setAdress] = useState();
  const [lastName, setLastName] = useState();
  const [postal, setPostal] = useState();
  const [tel, setTel] = useState();
  const [close, setClose] = useState(true);
  const { signup } = useUserAuth();
  const navigate = useNavigate();

  const date = new Date()


  const commune = [
    "Marconne",
    "Verquin",
    "Béthune",
    "Anzin-Saint-Aubin",
    "Arras",
    "Locon",
  ];

  const handleAdd = async (e) => {
    e.preventDefault();
    setClose(true);

    const regexPassword = RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)
    if (password !== confirmPassword) {
      return setError("Les mots de passe ne sont pas identique.");
    } else if (!regexPassword.test(password) || !regexPassword.test(confirmPassword)) {
      return setError("Le mot de passe n'est pas valide.");
    }

    if (!lastName) {
      return setError("Le nom est requis.");
    } else if (lastName.length < 2) {
      return setError("Le nom doit contenir plus de caractéres.");
    }
    if (!name) {
      return setError("Le prénom est requis.");
    } else if (name.length < 2) {
      return setError("Le prénom doit contenir plus de caractéres.");
    }
    if (!city) {
      return setError("Aucune ville a été sélectionné");
    }
    const regexAdress = RegExp(/^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[\-\w]*)[\s,]+([-\w].+)$/);
    if (!adress) {
      return setError("L'adresse est requise.");
    } else if(!regexAdress.test(adress)){
      return setError("L'adresse n'est pas valide.");
    }

    const regexPostal = RegExp(/^(0[1-9]|[1-9][ABab\d])\d{3}$/);
    if (!postal) {
      return setError("Le code postal est requis");
    } else if (!regexPostal.test(postal)) {
      return setError("Le code postal n'est pas valide");
    }
    
    const regexTel = RegExp(/[0]{1}[1-7]{1}[0-9]{8}/)
    if (!tel) {
      return setError("Le numéro de téléphone est requis");
    } else if (!regexTel.test(tel)){
      return setError("Le numéro de téléphone n'est pas valide");
    }

    let role = "user";
    try {
      setError("");
      const res = await signup(email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        email: email,
        name: name,
        lastName: lastName,
        city: city,
        adresse: adress,
        codePostal: postal,
        numeroTel: tel,
        role: role,
        createdAt: date,
        uid: res.user.uid,
      });
      navigate("/");
    } catch (err) {
      if (err.message == "Firebase: Error (auth/invalid-email).") {
        setError("L'adresse email n'est pas valide");
      }
      if (err.message == "Firebase: Error (auth/email-already-in-use).") {
        setError("L'utilisateur existe déja.");
      }
      if (
        err.message ==
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("Le mot de passe n'est pas valide.");
      }
    }
  };

  const handleClose = () => {
    setClose(false);
  };


  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      {close && error ? (
        <div
          class="w-[30%] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {error && <strong class="font-bold mr-6 ">{error}</strong>}

          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              onClick={handleClose}
              class="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      ) : (
        ""
      )}
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <form onSubmit={handleAdd}>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <input
                type="text"
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
                aria-describedby="emailHelp123"
                placeholder="Votre nom"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group mb-6">
              <input
                type="text"
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
                placeholder="Votre prenom"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <select
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
                defaultValue={"votre ville"}
                onChange={(e) => setCity(e.target.value)}
                name="city"
                id="city"
              >
                <option value="votre ville" disabled>
                  Votre ville
                </option>
                {commune.map((c, index) => (
                  <option key={index} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-6">
              <input
                type="text"
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
                placeholder="Votre adresse"
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <input
                type="text"
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
                aria-describedby="emailHelp123"
                placeholder="Votre code postal"
                onChange={(e) => setPostal(e.target.value)}
              />
            </div>
            <div className="form-group mb-6">
            <div class="relative">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="4cm"
                  viewBox="-10 -10 3020 2020"
                >
                  <g id="French_Flag_by_Adam_Stanislav">
                    <title>Flag of France, by Adam Stanislav</title>
                    <rect
                      fill="rgb(0%,14%,58%)"
                      x="0"
                      y="0"
                      width="1010"
                      height="2000"
                    />
                    <rect
                      fill="rgb(97%,97%,97%)"
                      x="1000"
                      y="0"
                      width="1010"
                      height="2000"
                    />
                    <rect
                      fill="rgb(93%,16%,22%)"
                      x="2000"
                      y="0"
                      width="1000"
                      height="2000"
                    />
                    <rect
                      fill="none"
                      stroke="rgb(55%,55%,55%)"
                      stroke-width="10"
                      x="0"
                      y="0"
                      width="3000"
                      height="2000"
                    />
                  </g>
                </svg>
              </div>
              <input
                type="text"
                class=" w-full
                pl-10
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
                placeholder="Numéro de téléphone"
                onChange={(e)=>setTel(e.target.value)}
              />
            </div>
          </div>
          </div>

          <div className="form-group mb-6">
            <input
              type="email"
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
              id="exampleInput125"
              placeholder="Votre email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="password"
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
              id="exampleInput126"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="password"
              className="form-control block
              w-full
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
              id="exampleInput126"
              placeholder="Confirmez votre mot de passe"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center">
          <button
            type="submit"
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
          >
            S'inscrire
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormSignup;
