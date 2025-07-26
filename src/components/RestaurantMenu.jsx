import React, { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId); //thsi is a custom react hook

  const [showIndex , setShowIndex]= useState(null)

  // useEffect(() => {   //all this logic we will be doing inside the useRestaurantMenu hook
  //   if (resId) {
  //     fetchMenu();
  //   }
  // }, [resId]);

  // async function fetchMenu() {
  //   try {
  //     const response = await fetch(MENU_API + resId);
  //     const json = await response.json();
  //     setResInfo(json.data);
  //   } catch (error) {
  //     console.error("Failed to fetch menu:", error);
  //   }
  // }

  if (!resInfo) return <Shimmer />;

  const infoCard = resInfo.cards.find((card) => card?.card?.card?.info);
  const { name, cuisines, costForTwoMessage } =
    infoCard?.card?.card?.info || {};

  const regularGroup = resInfo.cards.find(
    (card) => card?.groupedCard?.cardGroupMap?.REGULAR
  );

  const regularItems =
    regularGroup?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
  const menuCard = regularItems.find((c) => c?.card?.card?.itemCards);
  const itemCards = menuCard?.card?.card?.itemCards || [];
  //console.log(regularGroup?.groupedCard?.cardGroupMap?.REGULAR?.cards)

  const categories =
    regularGroup?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  //console.log(categories)
  return (
    <div className="text-center py-5">
      <h1 className="text-3xl font-bold">{name}</h1>
      <h2 className="font-bold text-xl">{cuisines?.join(", ")}</h2>
      {/*caterogy accordions*/}
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={()=>setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
