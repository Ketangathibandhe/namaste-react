import React from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {

  const dispatch = useDispatch()
const handleAddItem =(item)=>{
  //dispatch Action 
  dispatch(addItem(item))
  console.log(item)
}

  return (
    <div>
      {Array.isArray(items) ? (
        items.map((item) => (
          <div
            key={item?.card?.info?.id}
            className="p-2 pb-4 m-2 text-left flex justify-between items-start border-gray-400 border-b-2"
          >
            {/* Left side - Text */}
            <div className="w-[75%]">
              <span className="text-xl">{item?.card?.info?.name}</span> <br />
              <span className="font-bold">
                ₹
                {(item?.card?.info?.price || item?.card?.info?.defaultPrice) /
                  100}
              </span>
              <p className="text-xs mt-1">{item?.card?.info?.description}</p>
            </div>

            {/* Right side - Image + ADD button */}
            <div className="flex flex-col items-center w-28 mb-6">
              {item?.card?.info?.imageId ? (
                <img
                  className="w-28 h-24 rounded-xl object-cover"
                  src={CDN_URL + item?.card?.info?.imageId}
                  alt={item?.card?.info?.name}
                />
              ) : (
                // Placeholder if image missing
                <div className="w-28 h-24 rounded-xl bg-gray-100" />
              )}

              <button onClick={()=>handleAddItem(item)} className="absolute  mt-22 bg-white text-green-600 font-bold px-4 py-1 rounded shadow">
                ADD
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
};

export default ItemList;
