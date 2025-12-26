
interface NavLink {
  name: string
  link: string
}

export const navLinks: NavLink[] = [
  { name: 'Home', link: '/dashboard' },
  { name: 'About', link: '/dashboard/about' },
  { name: 'Menu', link: '/dashboard/menu' },
  { name: 'Booking', link: '/dashboard/booking' },
]