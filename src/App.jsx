import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
//import Grocery from "./components/Grocery";
import { lazy , Suspense } from "react";
import { useState ,useEffect} from "react";
import UserContext from "./utils/userContext";


//chunking , codesplitting , dynamic bundling ,Lazy loading , ondemand loading , dynamic import 
const Grocery = lazy(()=>import("./components/Grocery"))

const currYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-center p-4  w-full">
      <p>
        Copyright &copy; {currYear}, All rights reserved.
      </p>
    </footer>
  );
};

function App() {
  const [userName, setUserName] = useState();

   // Authentication
    useEffect(() => {
      // Make an API call and send username and password
      const data = {
        name: 'Ketan',
      };
      setUserName(data.name);
    }, []);

  return (
   <UserContext.Provider value={{ loggedInUser: userName }}>
         <div className="app">
           <Header />
           <Outlet />
         </div>
    </UserContext.Provider>
  );
}


export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // 👈 default route for "/"
        element: <Body />,
      },
      {
        path: "/body",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: <Suspense fallback={<h1>Loading...</h1>}><Grocery /></Suspense>,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default App;