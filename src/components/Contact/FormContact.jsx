import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState } from "react";

function FormContact(props) {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState();
  const [success, setSuccess] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();  
    setSuccess("")
      await setDoc(doc(db, "messages", `message-${lastName}`), {
        email: email,
        name: name,
        lastName: lastName,
        message: message,
      });
      navigate("#contact")
      setEmail("");
      setLastName("");
      setName("");
      setMessage("");
      setSuccess(true);
  };

  return (
    <>
      {success ? ( 
        <div
          class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span class="font-medium"> Le message a été envoyé.</span>
        </div>
       
      ) : (
        ""
      )}
      <div className="flex block p-6 rounded-lg shadow-lg bg-white w-2/3">
        <form onSubmit={handleAdd} className="w-1/2">
          <div className="flex form-group mb-6">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="form-control block
        w-1/2
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
        mr-5
        focus:text-gray-700 focus:ring-0 focus:bg-white focus:border-[#27ae60] focus:outline-none"
              id="exampleInput7"
              placeholder="Prenom"
              value={name}
            />
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="form-control block
        w-1/2
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
        focus:text-gray-700 focus:ring-0 focus:bg-white focus:border-[#27ae60] focus:outline-none"
              placeholder="Nom"
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              placeholder="Email"
            />
          </div>
          <div className="form-group mb-6">
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="
            resize-none
        form-control
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
        focus:text-gray-700 focus:ring-0 focus:bg-white focus:border-[#27ae60] focus:outline-none
      "
              rows="7"
              placeholder="Message"
            ></textarea>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="
          text-center
      w-1/2
      px-6
      py-2.5
      bg-[#192a56]
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-[#27ae60] hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
            >
              Envoyer
            </button>
          </div>
        </form>
        <div className="ml-5 w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2544.539254039944!2d2.0437753156950187!3d50.37514527946514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dda321a1e9fbf9%3A0x2b8d2c59baefb5ed!2s89%20R%C3%A9s%20Yden%20-%20le%20Progr%C3%A8s%2C%2062140%20Marconne!5e0!3m2!1sfr!2sfr!4v1661542854723!5m2!1sfr!2sfr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default FormContact;
