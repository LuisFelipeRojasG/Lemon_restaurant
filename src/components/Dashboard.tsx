import type { JSX } from "react"
import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const Dashboard = (): JSX.Element => {
  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}