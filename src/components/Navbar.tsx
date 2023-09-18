import {AiOutlineAlignRight} from 'react-icons/ai'
import logo from '../assets/talkpod-logo.png'
import ActionButton from './ActionButton'
import { Avatar } from 'antd'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const Navbar = () => {
  const {user} = useContext(UserContext)
  return (

    <nav className="bg-white h-fit py-3">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
        <img src={logo} className=" h-10" alt="Talkpod Logo" />
        <div className="flex md:order-2">
          {!user &&  <ActionButton text='Sign in'/> }
          {!user &&  <ActionButton text='Sign up' variant='outline'/> }
          {user &&  <div className='flex items-center justify-center gap-x-2'>
             <Avatar style={{ backgroundColor: "#8852FF", color:"white"}}>CP</Avatar> Clement</div>}
        <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none " aria-controls="navbar-cta" aria-expanded="false">
            <AiOutlineAlignRight size={24}/>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-medium md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
            {/* <li>
              <Link to="#" className="block  pl-3 pr-4   " aria-current="page">Home</Link>
            </li> */}
     
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
