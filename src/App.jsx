import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
//import Grocery from "./components/Grocery";
import { lazy , Suspense } from "react";


//chunking , codesplitting , dynamic bundling ,Lazy loading , ondemand loading , dynamic import 
const Grocery = lazy(()=>import("./components/Grocery"))

const currYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Copyright &copy; {currYear}, Made with 💗 by <strong>Vasu</strong>
      </p>
    </footer>
  );
};

function App() {
  return (
    <div className="app">
      <Header />
      <Outlet/>
      <Footer />
    </div>
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