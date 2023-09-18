import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Room = () => {
  const {user} = useContext(UserContext);
  return (
    <div className="site-content">
    <Navbar/>

    <div className="showcase">
      <div className="showcase-content row">
        <div className="left col-12 col-md-6">
          <h1>Welcome to <em>Talkpod!</em></h1>
          <p>
            The Conferencing Solution to amplify your voice

          </p>
          <div className="btn-group">
            <button
              className="btn-full"
            >
              Get Started!
            </button>
            <button
              className="btn-border ml-2"
            >
              Github
            </button>
          </div>
        </div>
        <div className="right col-12 col-md-6">
        </div>
      </div>
    </div>


    <Footer/>
  </div>
  )
}

export default Room
