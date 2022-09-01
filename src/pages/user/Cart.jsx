import React from "react";
import { collection, getDocs, deleteDoc, query, where, doc, updateDoc, increment, FieldValue } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db, fs } from "../../firebase-config";
import { useUserAuth } from "../../context/UserAuthContext";
import Header from "../../components/Header/Header";

function Cart() {

  const { admin } = useUserAuth();

  function GetUser() {
    const [user, setUser] = useState("");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUser = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUser();
        }
      });
    }, []);
    return user;
  }

  const [products, setProducts] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((userlogged) => {
      if (userlogged) {
        const getCart = async () => {
          let list = [];
          const querySnapshot = await getDocs(
            collection(db, `cart-${userlogged.uid}`)
          );
          querySnapshot.forEach((doc) => {
            list.push({ ...doc.data() });
          });
          setProducts(list);
        };
        getCart();
      }
    });
  }, []);

  function total() {
    let x = 0;
    products.map((i) => {
      x += i.prix * i.quantity;
    })
    return x;
  }

  
  const incrementProduct = (index) => {
    const test = doc(db, `cart-${admin.uid}`, `article-${index}`);
    const updateIncrement = async () => {
      await updateDoc(test, {
        quantity: increment(+1),
      });
    };
    updateIncrement()
    setTimeout(() => {
      window.location.reload() 
    }, 400);
  }

  const decrementProduct = (index, quantity) => {
    const test = doc(db, `cart-${admin.uid}`, `article-${index}`);
    if (quantity > 1) {
      
      const updateDecrement = async () => {
        await updateDoc(test, {
          quantity: increment(-1),
        });
      };
      updateDecrement()
      setTimeout(() => {
        window.location.reload() 
      }, 400);
    }
  }

  const deleteProduct = (index) => {
    console.log(index);
      const remove = async () => {
        await deleteDoc(doc(db, `cart-${admin.uid}`, `article-${index}`));
      } 
      remove()
    setTimeout(() => {
      window.location.reload() 
    }, 1000);
  }


  return (
    <>
      <div>
        <Header quantity={products.length} />
      </div>

      <div className="container mx-auto mt-10 h-[80vh]">
    <div className="flex shadow-md my-10">
      <div className="w-3/4 bg-white px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl">Panier</h1>
          <h2 className="font-semibold text-2xl">{products.length} Articles</h2>
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantitée</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Prix</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
        </div>

        { products.map((product) => (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
        
          
        
          <div className="flex w-2/5"> 
          
            
            <div className="w-20">
              <img className="h-24 object-cover" src={product.images} alt="" />
            </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-sm">{product.name}</span>
              <span className="text-red-500 text-xs">{product.description}</span>
              <button onClick={()=>deleteProduct(product.id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</button>
            </div>
            
            
          </div>
          
          <div className="flex justify-center w-1/5">
            <svg onClick={()=>decrementProduct(product.id, product.quantity)} className="cursor-pointer fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>

            <input className="mx-2 border text-center w-12" type="text" readOnly value={product.quantity} />

            <svg onClick={()=>incrementProduct(product.id, product.quantity)}  className="cursor-pointer fill-current text-gray-600 w-3" viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">{product.prix}€</span>
          <span className="text-center w-1/5 font-semibold text-sm">{ product.prix * product.quantity }€</span>
         
        </div>
        ))}

       

        <a href="/menu" className="flex font-semibold text-indigo-600 text-sm mt-10">
      
          <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
          Continuer votre menu
        </a>
      </div>

      <div id="summary" className="w-1/4 px-8 py-10">
        <h1 className="font-semibold text-2xl border-b pb-8">Récapitulatif de la commande</h1>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">{products.length} articles</span>
          <span className="font-semibold text-sm">{total()}€</span>
        </div>
        <div>
          <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
          <select className="block p-2 text-gray-600 w-full text-sm">
            <option>{total()}€</option>
          </select>
        </div>
        <div className="py-10">
          <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
          <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
        </div>
        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total :</span>
            <span>{total()}€</span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
        </div>
      </div>

    </div>
  </div>
    </>
  );
}

export default Cart;
