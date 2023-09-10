import callSVG from '../assets/svg.svg'

const Hero = () => {
  return (
    <div className="showcase">
    <div className="showcase-content row">
      <div className="left col-12 col-md-6">
        <h1>Welcome to the <em>Colloquium!</em></h1>
        <p>
          The Complete Online Conferencing Solution and Conference Hosting
          Platform.
        </p>
        <button
          className="sign-btn get-started"
        >
          Get Started!
        </button>
      </div>
      <div className="right col-12 col-md-6">
        <img src={callSVG} alt="call svg" />
      </div>
    </div>
  </div>
  )
}

export default Hero
