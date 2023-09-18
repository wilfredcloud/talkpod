import { ReactElement } from "react";

import ProtectedRoute from "../middlewares/ProtectedRoute";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Landing from "../pages/Landing";
import Conference from "../pages/Conference";
import Room from "../pages/Room";

interface RouteType {
    path: string;
    element: ReactElement;
}


const routes = (isAuthenticated: boolean):RouteType[] => [
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/signin',
      element: <SignIn />
    },
    
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/join',
      element: <Conference/>
    },
    {
      path: '/:roomId',
      element: <Room/>
    },
  ];
  
  export default routes;
