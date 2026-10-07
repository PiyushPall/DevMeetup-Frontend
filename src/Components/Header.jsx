import React, { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStoredUser, logout } from "../auth";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(getStoredUser);

  useEffect(() => {
    const refresh = () => setUser(getStoredUser());

    window.addEventListener("auth:logout", refresh);

    return () => {
      window.removeEventListener("auth:logout", refresh);
    };
  }, []);

  const name = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "Profile";

  const image = user?.profileImage;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header
      className="
        relative z-40
        flex h-16 w-full items-center
        border-b border-white/5
        bg-[#060914]
        px-3 text-white
        sm:h-18 sm:px-5
        lg:px-8
      "
    >
      {/* Desktop Search */}
      <div
        className="
          absolute left-1/2 hidden
          w-[min(500px,45vw)]
          -translate-x-1/2
          md:block
        "
      >
        <Search
          size={19}
          className="
            absolute left-4 top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          placeholder="Search developers..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(
                `/discover?search=${encodeURIComponent(
                  e.currentTarget.value,
                )}`,
              );
            }
          }}
          className="
            h-10 w-full
            rounded-xl
            border border-white/10
            bg-[#0F1628]
            pl-11 pr-4
            text-sm text-white
            placeholder:text-gray-500
            outline-none
            transition
            focus:border-purple-400
            focus:ring-1
            focus:ring-purple-400/30
            lg:h-11
          "
        />
      </div>

      {/* Right Section */}
      <div
        className="
          ml-auto flex items-center
          gap-2
          sm:gap-4
          lg:gap-6
        "
      >
        {/* Notification */}
        <button
          aria-label="Notifications"
          className="
            relative
            flex h-9 w-9
            items-center justify-center
            rounded-xl
            transition
            hover:bg-white/5
            sm:h-10 sm:w-10
          "
        >
          <Bell
            size={19}
            className="text-gray-300"
          />

          <span
            className="
              absolute right-2 top-1.5
              h-2 w-2
              rounded-full
              bg-pink-500
            "
          />
        </button>

        {/* Profile */}
        <div
          className="relative"
          onMouseLeave={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen((v) => !v)}
            className="
              flex items-center
              gap-2
              rounded-xl
              p-1
              transition
              hover:bg-white/5
            "
          >
            {/* Avatar */}
            <div
              className="
                h-9 w-9
                shrink-0
                overflow-hidden
                rounded-full
                bg-linear-to-r
                from-[#8125FF]
                to-[#D000D9]
                sm:h-10 sm:w-10
              "
            >
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="
                    flex h-full
                    items-center justify-center
                    text-xs font-bold
                    sm:text-sm
                  "
                >
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name - hidden on mobile */}
            <span
              className="
                hidden
                max-w-28
                truncate
                text-sm
                text-slate-300
                sm:block
              "
            >
              {name}
            </span>
          </button>

          {/* Dropdown */}
          {open && (
            <div
              className="
                absolute right-0
                top-full z-100
                w-44
                pt-2
                sm:w-48
              "
            >
              <div
                className="
                  rounded-xl
                  border border-white/10
                  bg-[#111827]
                  p-2
                  shadow-2xl
                  shadow-black/30
                "
              >
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}
                  className="
                    w-full
                    rounded-lg
                    px-4 py-2.5
                    text-left
                    text-sm
                    transition
                    hover:bg-white/10
                  "
                >
                  My profile
                </button>

                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/signup");
                  }}
                  className="
                    w-full
                    rounded-lg
                    px-4 py-2.5
                    text-left
                    text-sm
                    transition
                    hover:bg-white/10
                  "
                >
                  Signup
                </button>

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    rounded-lg
                    px-4 py-2.5
                    text-left
                    text-sm
                    text-red-300
                    transition
                    hover:bg-white/10
                  "
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Button */}
      <button
        onClick={() => navigate("/discover")}
        aria-label="Search developers"
        className="
          absolute left-3
          flex h-9 w-9
          items-center justify-center
          rounded-xl
          text-gray-300
          transition
          hover:bg-white/5
          md:hidden
        "
      >
        <Search size={19} />
      </button>
    </header>
  );
};

export default Header;