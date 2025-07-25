import { useEffect, useState } from "react";
import RestaurantCard, { withOpenedLabel } from "./RestaurantCard";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchTest, setSearchText] = useState("");

  const RestaurantCardOpened = withOpenedLabel(RestaurantCard);
   console.log(filteredRestaurant);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1458004&lng=79.0881546&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();

      const restaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      setListOfRestaurants(restaurants || []);
      setFilteredRestaurant(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1 style={{ textAlign: "center", marginTop: "100px" }}>
        Looks like you're offline! Please check your internet connection
      </h1>
    );

  return (
    <div className="bg-gray-200">
      <div className="flex justify-center p-1.5 gap-10">
        <div className="flex justify-center">
          <input
            className="w-[600px] border-1 rounded-l-sm p-2 ml-3 bg-amber-100"
            placeholder="Search here"
            type="text"
            value={searchTest}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="ml-0.5 border-1 rounded-r-sm p-2 bg-amber-400 hover:bg-amber-300 "
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchTest.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>

        <div className="w-52 border-1 rounded-sm p-2 bg-amber-400 hover:bg-amber-300 text-center">
          <button
            className="filter-btn"
            onClick={() => {
              console.log("hello");
              const filteredList = listOfRestaurants.filter((res) => {
                return res.info.avgRating > 4.0;
              });
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {filteredRestaurant.map((restaurant) => (
          <Link
            className="Link"
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            {restaurant.info.availability.opened ? (
              <RestaurantCardOpened resData={restaurant}/>
            ): (
            <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
