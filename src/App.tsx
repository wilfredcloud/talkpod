import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import routes from "./utils/AppRoutes";

function App() {
const {user} = useContext(UserContext)
const isAuthenticated = !!user

  return (
    <BrowserRouter>
    <Routes>
      {routes(isAuthenticated).map((route) => <Route key={route.path} path={route.path} element={route.element}/>)}
    </Routes>
    </BrowserRouter>
  )
}

export default App
