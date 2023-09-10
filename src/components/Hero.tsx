import callSVG from '../assets/svg.svg'

const Hero = () => {
  return (
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
        <img src={callSVG} alt="call svg" />
      </div>
    </div>
  </div>
  )
}

export default Hero
