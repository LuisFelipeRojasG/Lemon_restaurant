import type { JSX } from "react"
import { NavLink } from "react-router"
import { navLinks } from "../utils/navLinks"

export const Menu = (): JSX.Element => {
  return (
    <nav className="w-full flex justify-center">
      <ul className="w-auto flex flex-wrap justify-center gap-5">
        {
          navLinks.map(({ name, link }) => (
            <li className="text-2xl font-karla font-medium" key={name}>
              <NavLink role='menuitem' to={link}>{name}</NavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

