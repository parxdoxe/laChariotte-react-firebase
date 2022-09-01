import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase-config";
import { BiUserCircle } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs"
import { NavLink } from "react-router-dom";

function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col h-screen">
        <div className="flex text-blue-600"><NavLink style={{ width: '150px', display: 'flex', alignItems: 'center' }} to="/admin"> <BsArrowLeft style={{ marginRight: '5px'}} /> Back </NavLink></div>
      <div class="flex justify-center">
        <ul class="overflow-auto bg-white rounded-lg border border-gray-200 w-96 h-[500px] text-gray-900">
          {users.map((user) => (
            <li
              key={user.id}
              class="flex items-center px-6 py-2 border-b border-gray-200 w-full rounded-t-lg bg-blue-600 text-white"
            >
              <BiUserCircle fontSize="2rem" />
              <div className="ml-2">
                {user.name} {user.lastName}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListUsers;
