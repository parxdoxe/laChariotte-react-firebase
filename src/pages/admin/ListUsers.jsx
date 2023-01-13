import React from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase-config";
import { BiUserCircle } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs"
import { NavLink } from "react-router-dom";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const date = new Date()

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

    <div class="flex flex-col overflow-hidden mt-5">
<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
  <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
    <div class="overflow-hidden">
      <table class="min-w-full text-center">
        <thead class="border-b bg-gray-800">
          <tr>
            <th scope="col" class="text-sm font-medium text-white px-6 py-4">
              #
            </th>
            <th scope="col" class="text-sm font-medium text-white px-6 py-4">
              Prénom
            </th>
            <th scope="col" class="text-sm font-medium text-white px-6 py-4">
              Nom
            </th>
            <th scope="col" class="text-sm font-medium text-white px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>


{users.map((user, index) => (


          <tr class="bg-white border-b">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index}</td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {user.name}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {user.lastName}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            
            </td>
          </tr>

))}
          
          
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>
    
  );
}

export default ListUsers;
