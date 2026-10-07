import React, { useState } from "react";
import Layout from "../Components/Layout";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass =
    "h-12 w-full rounded-xl border border-[#1D293B] bg-transparent px-4 text-sm text-white outline-none placeholder:text-[#465A78] transition focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] sm:h-[46px] sm:px-5 sm:text-[15px]";

  const labelClass =
    "mb-2 block text-sm font-bold text-[#CBD5E1]";

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const { data } = await api.post("/user/login", {
        emailId: emailId.trim(),
        password,
      });

      if (!data?.token) {
        throw new Error("Login response did not contain a token.");
      }

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      const destination =
        location.state?.from?.pathname || "/discover";

      navigate(destination, { replace: true });
    } catch (error) {
      setMessage(
        getErrorMessage(error, "Login failed. Please try again."),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#050814]">
      <Layout>
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
          {/* ================= LEFT PANEL ================= */}
          <aside className="hidden w-full shrink-0 bg-[#0E1428] p-8 lg:flex lg:w-[32%] lg:flex-col lg:p-10 xl:w-[30%]">
            {/* LOGO */}
            <Link
              to="/login"
              className="flex items-center gap-2"
            >
              <img
                src={logo}
                alt="DevMeetup logo"
                className="h-9 w-9 object-contain sm:h-10 sm:w-10"
              />

              <span className="font-bold text-white">
                Dev
                <span className="bg-linear-to-r from-[#9B5DE5] to-[#F15BB5] bg-clip-text text-transparent">
                  Meetup
                </span>
              </span>
            </Link>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col justify-center py-10">
              <h1 className="text-4xl font-black leading-[1.1] text-white xl:text-5xl">
                Connect.
                <br />
                Collaborate.
                <br />
                <span className="bg-linear-to-r from-[#9B5DE5] to-[#F15BB5] bg-clip-text text-transparent">
                  Grow together.
                </span>
              </h1>

              <p className="my-6 max-w-sm text-sm leading-6 text-slate-400">
                Build a network around the technologies you love
                and meet people who are building too.
              </p>

              <ul className="space-y-5 text-sm">
                <li>
                  <b className="text-white">
                    Meet developers
                  </b>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Find people with complementary skills.
                  </p>
                </li>

                <li>
                  <b className="text-white">
                    Start conversations
                  </b>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Send a connection request in one click.
                  </p>
                </li>

                <li>
                  <b className="text-white">
                    Build your network
                  </b>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Turn great introductions into connections.
                  </p>
                </li>
              </ul>
            </div>
          </aside>

          {/* ================= LOGIN PANEL ================= */}
          <main className="flex min-h-screen flex-1 items-center bg-[#0A0F1F] px-4 py-10 sm:px-8 sm:py-12 lg:px-10 xl:px-16">
            <form
              onSubmit={handleLogin}
              className="mx-auto w-full max-w-xl"
            >
              {/* MOBILE LOGO */}
              <div className="mb-10 flex justify-center lg:hidden">
                <Link
                  to="/login"
                  className="flex items-center gap-2"
                >
                  <img
                    src={logo}
                    alt="DevMeetup logo"
                    className="h-10 w-10 object-contain"
                  />

                  <span className="font-bold text-white">
                    Dev
                    <span className="bg-linear-to-r from-[#9B5DE5] to-[#F15BB5] bg-clip-text text-transparent">
                      Meetup
                    </span>
                  </span>
                </Link>
              </div>

              {/* HEADING */}
              <p className="mb-3 text-xs font-bold tracking-[3px] text-[#A78BFA] sm:text-sm sm:tracking-[4px]">
                SIGN IN
              </p>

              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                Welcome back.
              </h1>

              <p className="mt-2 max-w-lg text-sm leading-6 font-medium text-[#637593] sm:mt-3 sm:text-[13px]">
                Enter your credentials to continue to DevMeetup.
              </p>

              {/* FORM */}
              <div className="mt-7 space-y-5 sm:mt-8">
                {/* EMAIL */}
                <div>
                  <label className={labelClass}>
                    Email address{" "}
                    <span className="text-[#A78BFA]">
                      *
                    </span>
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    value={emailId}
                    onChange={(e) =>
                      setEmailId(e.target.value)
                    }
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className={labelClass}>
                    Password{" "}
                    <span className="text-[#A78BFA]">
                      *
                    </span>
                  </label>

                  <input
                    type="password"
                    placeholder="Strong password"
                    className={inputClass}
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              {/* ERROR */}
              {message && (
                <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                  <p className="text-center text-sm leading-5 text-red-300">
                    {message}
                  </p>
                </div>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 h-12 w-full rounded-2xl bg-linear-to-r from-[#8125FF] to-[#D000D9] px-5 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12.5 sm:text-base"
              >
                {loading ? "Signing in..." : "Sign in →"}
              </button>

              {/* SIGNUP */}
              <p className="mt-5 text-center text-sm leading-6 text-[#657794] sm:mt-6 sm:text-base">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-[#A78BFA] transition hover:text-[#C084FC]"
                >
                  Create an account
                </Link>
              </p>
            </form>
          </main>
        </div>
      </Layout>
    </div>
  );
};

export default Login;