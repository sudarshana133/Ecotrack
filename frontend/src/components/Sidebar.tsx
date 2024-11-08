import {
  Home,
  Cpu,
  BarChart2,
  Users,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <img src="/logo.png" alt="logo" className="h-8" />
      </div>

      <nav className="flex-1 px-4 flex flex-col justify-between">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Home size={20} />
              <span>Overview</span>
            </Link>
          </li>
          <li>
            <Link
              to="/devices"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Cpu size={20} />
              <span>Devices</span>
            </Link>
          </li>
          <li>
            <Link
              to="/statistics"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <BarChart2 size={20} />
              <span>Statistics</span>
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Users size={20} />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Bell size={20} />
              <span>Notifications</span>
            </Link>
          </li>
        </ul>

        <ul className="mt-auto space-y-2 mb-4 border-t border-gray-200">
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
