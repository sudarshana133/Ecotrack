import { Home, BarChart2, LogOut, MapPin, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // const IMAGE_URL = import.meta.env.VITE_CDN_IMAGE_URL
  const menuItems = [
    { icon: Home, text: "Overview", path: "/dashboard" },
    { icon: BarChart2, text: "Statistics", path: "/dashboard/statistics" },
    { icon: MapPin, text: "Locations", path: "/dashboard/locations" },
  ];

  const bottomMenuItems = [
    { icon: Settings, text: "Settings", path: "/dashboard/settings" },
    { icon: LogOut, text: "Logout", path: "/" },
  ];

  return (
    <div className="fixed h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <img
          src={`https://cdn-85t93yhaveqs.vultrcdn.com/logo.png`}
          alt="logo"
          className="h-8"
        />
      </div>

      <nav className="flex-1 px-4 flex flex-col justify-between">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <item.icon size={20} />
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-auto space-y-2 mb-4 border-t border-gray-200">
          {bottomMenuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => {
                  if (item.text === "Logout") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    window.location.reload();
                  }
                }}
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <item.icon size={20} />
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
