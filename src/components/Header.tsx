import type { JSX } from "react"
import { Navbar } from "./Navbar"
import Logo from "../assets/images/Logo.webp"

import { IoMdMenu } from "react-icons/io";

export const Header = (): JSX.Element => {
  return (
    <div className="w-full py-4 ">
      <div className="h-13 flex justify-between lg:justify-center items-center">
        <div className="w-32 md:w-40 lg:w-48 h-auto ml-10 lg:mr-40">
          <img src={Logo} alt="Logo" />
        </div>
        <Navbar />
        <button className='md:hidden pr-8'>
          <IoMdMenu size={50} />
        </button>
      </div>
    </div>
  )
}