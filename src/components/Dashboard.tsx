import type { JSX } from "react"
import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const Dashboard = (): JSX.Element => {
  return (
    <div className="w-full pt-20">
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}