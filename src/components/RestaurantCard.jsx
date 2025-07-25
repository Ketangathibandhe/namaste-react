import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  if (!resData || !resData.info) return null;

  const { name, cuisines, avgRating, cloudinaryImageId } = resData.info;

  return (
    <div className="m-4 p-4 w-56 h-[400px] bg-gray-100 rounded-xl shadow-xl hover:shadow-2xl">
      <img className=" object-cover w-52 h-48"
        src={
          CDN_URL +
          cloudinaryImageId
        }
        alt={name} 
      />
      <h3 className="font-bold text-2xl pt-1.5">{name}</h3>
      <p>{cuisines?.join(", ")}</p>
      <p>Rating: {avgRating}</p>
    </div>
  );
};


//higher order component 

// input-> RestaurantCard component output ->RestaurantCardOpened component

export const withOpenedLabel=(RestaurantCard)=>{
  return (props)=>{
    return(
    <div>
      <label className="absolute bg-green-300 mx-[18px] my-0.5 px-2 py-0.5 rounded-xl">Opened</label>
      <RestaurantCard {...props}/>
    </div>
    )
  }
}

export default RestaurantCard;
