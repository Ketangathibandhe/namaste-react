import { useEffect ,useState } from "react";
import { MENU_API } from "./constants";
const useRestaurantMenu = (resId) => {
  //fetch data
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    if (resId) {
      fetchMenu();
    }
  }, [resId]);

  async function fetchMenu() {
    try {
      const response = await fetch(MENU_API + resId);
      const json = await response.json();
      setResInfo(json.data);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  }
  return resInfo;
};

export default useRestaurantMenu;
