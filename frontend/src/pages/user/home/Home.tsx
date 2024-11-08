import Sidebar from "@/components/Sidebar"
import { Outlet } from "react-router-dom"

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Outlet />
      </div>
    </div>
  )
}

export default Home