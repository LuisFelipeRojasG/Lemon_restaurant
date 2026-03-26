import type { JSX } from "react"
import { Navbar } from "./Navbar"
import { CartWidget } from "./CartWidget"
import Logo from "../assets/images/Logo.webp"
import { IoMdMenu } from "react-icons/io"

export const Header = (): JSX.Element => {
  return (
    <div className="w-full py-4 fixed top-0 left-0 bg-whitelim z-10 shadow-md">
      <div className="h-13 flex justify-between lg:justify-center items-center">
        <div className="w-32 md:w-40 lg:w-48 h-auto ml-10 lg:mr-40">
          <img src={Logo} alt="Logo" />
        </div>
        <Navbar />
        <div className="flex items-center gap-4 mr-4">
          <CartWidget />
          <button className='lg:hidden mr-4 border-2 rounded-xl border-greenlim'>
            <IoMdMenu size={40}/>
          </button>
        </div>
      </div>
    </div>
  )
}