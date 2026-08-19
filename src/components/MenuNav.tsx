import { useEffect, useCallback, type JSX } from "react"
import { NavLink } from "react-router"
import { navLinks } from "../utils/navLinks"

interface MenuNavProps {
  isOpen: boolean
  onClose: () => void
}

export const MenuNav = ({ isOpen, onClose }: MenuNavProps): JSX.Element => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleKeyDown])

  return (
    <div
      className={`fixed inset-0 z-20 bg-blacklim/50 flex justify-center items-start pt-28 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <nav
        className={`w-11/12 max-w-sm bg-whitelim rounded-2xl shadow-lg p-8 transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col items-center gap-6">
          {navLinks.map(({ name, link }) => (
            <li className="text-2xl font-karla font-medium" key={name}>
              <NavLink role="menuitem" to={link} onClick={onClose}>
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
