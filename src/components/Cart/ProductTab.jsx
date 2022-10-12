import React from "react";
import {  deleteDoc, doc, updateDoc, increment } from "firebase/firestore";
import { db} from "../../firebase-config";
import { useUserAuth } from "../../context/UserAuthContext";
import { useState } from "react"


function ProductTab({product}) {
    const { admin } = useUserAuth();
    const [prodQuantity, setProdQuantity] = useState(product.quantity)
    const [event, setEvent] = useState(true)

  
  const decrementProduct =  (index, quantity) =>  {

    const test = doc(db, `cart-${admin.uid}`, `article-${index}`);
    if (quantity > 1) {
      setProdQuantity(prodQuantity - 1)
      const updateDecrement = async () => {
        await updateDoc(test, {
          quantity: increment(-1),
        });
      };
      updateDecrement()
    }
  }

  const incrementProduct = (index) => {

    const test = doc(db, `cart-${admin.uid}`, `article-${index}`);
    setProdQuantity(prodQuantity + 1)
        const updateIncrement = async () => {
          await updateDoc(test, {
            quantity: increment(+1),
          });
        };
        updateIncrement();

  };

  const deleteProduct = (index) => {
    
      setEvent(!event);
    
      const remove = async () => {
        await deleteDoc(doc(db, `cart-${admin.uid}`, `article-${index}`));
      } 
      remove() 
      setTimeout(() => {
            window.location.reload()
      }, 400);
  }


    return (
        <div className={ event ? "flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" : "hidden"}>
        
          
        
          <div className="flex w-2/5"> 
          
            
            <div className="w-20">
              <img className="h-24 object-cover" src={product.images} alt="" />
            </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-sm">{product.name}</span>
              <span className="text-red-500 text-xs">{product.description}</span>
              <button onClick={()=>deleteProduct(product.id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Supprimer le produit </button>
            </div>
            
            
          </div>
          
          <div className="flex justify-center w-1/5">
            <svg onClick={()=>decrementProduct(product.id, product.quantity)} className="cursor-pointer fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>

            <input className="mx-2 border text-center w-12" type="text" readOnly value={prodQuantity} />

            <svg onClick={()=>incrementProduct(product.id)}  className="cursor-pointer fill-current text-gray-600 w-3" viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">{product.price}€</span>
          <span className="text-center w-1/5 font-semibold text-sm">{ product.price * product.quantity }€</span>
         
        </div>
    );
}

export default ProductTab;