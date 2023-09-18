import Title from 'antd/es/typography/Title'
import callSVG from '../assets/svg.svg'

const Hero = () => {
  return (
    <div className=" w-full bg-emerald-50">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-y-8 md:gap-0 md:flex-row justify-between items-center py-14">
        <div className="">
          <Title  className=' tex'>Welcome to <em className=' text-violet-500'>Talkpod!</em></Title>
          <p>The Conferencing Solution to amplify your voice</p>
        </div>
        <div className="">
          <img src={callSVG} alt="call svg" className=' h-72' />
        </div>
      </div>
    </div>
  )
}

export default Hero
