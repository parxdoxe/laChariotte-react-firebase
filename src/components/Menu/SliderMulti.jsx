import React from "react";
import Slider from "react-slick";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase-config";
import Card from "../Details/Card";
import "./SliderMulti.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function SliderMulti(props) {
  const [menus, setMenus] = useState([]);
  const [event, setEvent] = useState(true);

  const changHeart = () => {
    setEvent(!event);
  };

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "burgers"));
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data() });
        });
        setMenus(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


  const listBurgers = menus.map((burger) => (
      <SwiperSlide key={burger.name}>
        <div className="flex flex-col items-center justify-end relative w-full h-[250px] bg-[#fff] shadow-xl  rounded-xl">
          <img
            className="rounded-[100%] w-[150px] absolute z-10 top-[-20%] rigth-[25%]"
            src={burger.images}
            alt={burger.name}
          />
          <>
            <div className="text-center my-5 px-4">
              <h4 className="text-lg font-medium mb-2">{burger.name}</h4>
              <p className="text-sm text-gray-400">
                {burger.description}
              </p>
            </div>

            <div className="flex justify-between w-[85%]">
              <span className="font-bold">{burger.prix}€</span>
              <span className="cursor-pointer" onClick={changHeart}>
                {event ? (
                  <AiOutlineHeart color="#EBD671" fontWeight="bold" />
                ) : (
                  <AiFillHeart color="#EBD671" />
                )}{" "}
              </span>
            </div>

            <a
              className="text-center my-3 w-[85%] rounded-md text-[#fff] bg-[#27ae60] py-2 px-4 hover:bg-[#192a56] duration-75"
              href="/menu"
            >
              Découvrir
            </a>
          </>
        </div>
      </SwiperSlide>
    )
  );

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
      spaceBetween={20}
      slidesPerView={2}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {listBurgers}
    </Swiper>
  );
}

export default SliderMulti;
