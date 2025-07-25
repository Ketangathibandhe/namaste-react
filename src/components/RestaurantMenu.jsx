import React, { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
 // const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId); //thsi is a custom react hook 

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

  return (
    <div>
      <h1>{name}</h1>
      <h2>{cuisines?.join(", ")}</h2>
      <h2>{costForTwoMessage}</h2>
      <h1>Menu</h1>
      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} - ₹ {item.card.info.price / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
