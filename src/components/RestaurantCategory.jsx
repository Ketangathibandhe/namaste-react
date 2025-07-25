import ItemList from "./ItemList";
import { useState } from "react";
const RestaurantCategory = ({ data }) => {
 const [showItems, setShowItems]= useState(false);
 const handleClick=()=>{
   showItems===false? setShowItems(true):setShowItems(false)
 }
  return (
    <div className="flex justify-center m-5">
      {/* Accodion Header*/}
      <div className="w-[60%]  bg-gray-100 p-4  shadow-sm ">
        <div className="flex justify-between m-3.5 " onClick={handleClick}>
          <span className="pl-2 font-bold">
            {data.title} ({data?.itemCards?.length}){" "}
          </span>
          <span className="pr-5">{showItems===false?"▼":"▲"}</span>
        </div>
        {/* Accodion Body*/}
        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
