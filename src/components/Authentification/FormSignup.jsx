import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../context/UserAuthContext";

function FormSignup(props) {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const { signup, admin } = useUserAuth();
  const navigate = useNavigate();


  const commune = ['Marconne',  'Verquin',  'Béthune',  'Anzin-Saint-Aubin', 'Arras', 'Locon']

console.log(commune);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    let role = "user";
    try {
      const res = await signup(email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        email: email,
        password: password,
        name: name,
        lastName: lastName,
        role: role,
        uid: res.user.uid,
      });
      console.log(res.user.uid);
      navigate("/");
    } catch {
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <form onSubmit={handleAdd}>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control
          block
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-describedby="emailHelp123"
                placeholder="Votre nom"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control
          block
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Votre prenom"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <select name="" id="">
            <option disabled>Votre ville</option>
            {commune.map((c) => (
            <option value={c}>{c}</option>
            ))}
          </select>
          <div className="form-group mb-6">
            <input
              type="email"
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput125"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput126"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <span className="text-red-500 text-sm text-center">
              L'utilisateur existe déja
            </span>
          )}
          <button
            type="submit"
            className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormSignup;
