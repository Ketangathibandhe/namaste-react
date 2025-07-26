import { useState ,useContext} from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";

//import { listOfRestaurants} from './Body'
const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const {loggedInUser} = useContext(UserContext)

  function handleClick() {
    if (btnName == "Login") {
      setBtnName("Logout");
    } else {
      setBtnName("Login");
    }
  }
  return (
    <div className="flex m-1 justify-between bg-amber-100 shadow-lg">
      <div className="w-20 px-2 py-1" >
        <img  className="rounded-full border-2" src={LOGO_URL} alt="App Logo"  />
      </div>

      <div className="flex font-serif font-bold text-xl">
        <ul className="flex  mr-9 items-center">
          <li className="pr-8 ">Online Status :{onlineStatus ? "🟢" : "🔴"}</li>
          <li className="pr-8">
            <Link to={"/body"}>Home</Link>
          </li>
          <li className="pr-8">
            <Link to={"/about"}>About us</Link>{" "}
            {/** this is known as client side routing */}
          </li>
          <li className="pr-8">
            <Link to={"/contact"}>Contact uS</Link>
          </li>
          <li className="pr-8">
            <Link to={"/grocery"}>Grocery</Link>
          </li>
          <li className="pr-8"> 
            <Link to={"/cart"}>Cart</Link>
          </li>
          <div>
            <button className="bg-amber-400 px-2.5 py-1.5 rounded-sm w-28 cursor-pointer" onClick={handleClick} >
              {btnName}
            </button>
          </div>
          <li className="pl-3.5 font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
