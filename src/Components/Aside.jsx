import React from "react";
import logo from "../assets/logo.png";
import {
  Compass,
  UserRound,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Aside = () => {
  const navigation = [
    {
      name: "Discover",
      path: "/discover",
      icon: <Compass size={20} />,
    },
    {
      name: "Requests",
      path: "/requests",
      icon: <UserRoundPlus size={20} />,
    },
    {
      name: "Connections",
      path: "/connections",
      icon: <UsersRound size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <UserRound size={20} />,
    },
  ];

  return (
    <aside
      className="
        fixed bottom-0 left-0 z-50
        flex h-17 w-full shrink-0
        border-t border-white/10
        bg-[#0F1628]/95 px-2 py-2
        backdrop-blur-xl

        lg:sticky lg:top-0
        lg:h-screen lg:w-64
        lg:flex-col
        lg:border-t-0 lg:border-r
        lg:px-5 lg:py-5
      "
    >
      {/* Logo - Desktop */}
      <NavLink
        to="/discover"
        className="
          mb-9 hidden items-center gap-2
          lg:flex lg:justify-start
        "
      >
        <img
          src={logo}
          alt="DevMeetup logo"
          className="h-10 w-10 shrink-0"
        />

        <span className="font-bold text-white">
          Dev
          <span className="bg-linear-to-r from-[#9B5DE5] to-[#F15BB5] bg-clip-text text-transparent">
            Meetup
          </span>
        </span>
      </NavLink>

      {/* Navigation */}
      <nav
        className="
          flex w-full items-center justify-around gap-1

          lg:flex-col
          lg:items-stretch
          lg:justify-start
          lg:gap-2
        "
      >
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={item.name}
            className={({ isActive }) =>
              `
              flex min-w-0 flex-1
              flex-col items-center justify-center
              gap-1 rounded-xl
              px-2 py-2.5
              text-[10px] font-medium
              transition

              sm:text-xs

              lg:flex-row
              lg:flex-none
              lg:justify-start
              lg:gap-3
              lg:px-4
              lg:py-3
              lg:text-sm

              ${
                isActive
                  ? "bg-linear-to-r from-[#9B5DE5] to-[#F15BB5] text-white"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }
            `
            }
          >
            {item.icon}

            <span className="lg:inline">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Aside;