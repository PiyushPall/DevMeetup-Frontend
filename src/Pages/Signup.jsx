import React, { useState } from "react";
import Layout from "../Components/Layout";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../api";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    phone: "",
    skills: "",
    profileImage: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass =
    "h-12 w-full rounded-xl border border-[#1D293B] bg-transparent px-4 text-sm text-white outline-none placeholder:text-[#465A78] transition focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] sm:h-[46px] sm:px-5 sm:text-[15px]";

  const labelClass =
    "mb-2 block text-sm font-bold text-[#CBD5E1]";

  const update = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const skills = form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const { data } = await api.post("/user/signup", {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        emailId: form.emailId.trim(),
        password: form.password,
        age: Number(form.age),
        phone: form.phone.trim(),
        skills,
        ...(form.profileImage.trim()
          ? { profileImage: form.profileImage.trim() }
          : {}),
      });

      setMessage(
        data?.message || "Account created successfully!",
      );

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 900);
    } catch (error) {
      setMessage(
        getErrorMessage(
          error,
          "Signup failed. Please try again.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const isSuccess =
    message.toLowerCase().includes("success") ||
    message.toLowerCase().includes("created");

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#050814] text-white">
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

            {/* LEFT CONTENT */}
            <div className="flex flex-1 flex-col justify-center py-10">
              <h1 className="text-4xl font-black leading-[1.1] xl:text-5xl">
                Connect.
                <br />
                Collaborate.
                <br />
                <span className="bg-linear-to-r from-[#9B5DE5] to-[#F15BB5] bg-clip-text text-transparent">
                  Grow together.
                </span>
              </h1>

              <p className="my-6 max-w-sm text-sm leading-6 text-slate-400">
                Build a network around the technologies you
                love and meet people who are building too.
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

          {/* ================= SIGNUP PANEL ================= */}
          <main className="flex min-h-screen flex-1 items-center bg-[#080D1D] px-4 py-10 sm:px-8 sm:py-12 lg:px-10 xl:px-14">
            <div className="mx-auto w-full max-w-4xl">
              {/* MOBILE LOGO */}
              <div className="mb-9 flex justify-center lg:hidden">
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
                GET STARTED
              </p>

              <h1 className="text-3xl font-bold sm:text-4xl">
                Create your account
              </h1>

              <p className="mt-2 text-sm leading-6 font-medium text-[#637593]">
                Set up your profile once, then start meeting
                developers.
              </p>

              {/* FORM */}
              <form
                onSubmit={handleSignup}
                className="mt-7 space-y-5 sm:mt-8"
              >
                {/* FIRST + LAST NAME */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      First name{" "}
                      <span className="text-[#A78BFA]">*</span>
                    </label>

                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={update}
                      placeholder="Piyush"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Last name{" "}
                      <span className="text-[#A78BFA]">*</span>
                    </label>

                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={update}
                      placeholder="Pal"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* EMAIL + PASSWORD */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Email address{" "}
                      <span className="text-[#A78BFA]">*</span>
                    </label>

                    <input
                      type="email"
                      name="emailId"
                      value={form.emailId}
                      onChange={update}
                      placeholder="you@example.com"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Password{" "}
                      <span className="text-[#A78BFA]">*</span>
                    </label>

                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={update}
                      placeholder="Strong password"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* AGE + PHONE */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Age{" "}
                      <span className="text-[#A78BFA]">*</span>
                    </label>

                    <input
                      type="number"
                      min="1"
                      name="age"
                      value={form.age}
                      onChange={update}
                      placeholder="18"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Phone number{" "}
                      <span className="text-[#A78BFA]">*</span>
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={update}
                      placeholder="9876543210"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* SKILLS */}
                <div>
                  <label className={labelClass}>
                    Skills
                  </label>

                  <input
                    name="skills"
                    value={form.skills}
                    onChange={update}
                    placeholder="React, Node.js, MongoDB"
                    className={inputClass}
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Separate multiple skills with commas.
                  </p>
                </div>

                {/* PROFILE IMAGE */}
                <div>
                  <label className={labelClass}>
                    Profile image URL
                  </label>

                  <input
                    name="profileImage"
                    value={form.profileImage}
                    onChange={update}
                    placeholder="https://example.com/photo.jpg"
                    className={inputClass}
                  />
                </div>

                {/* MESSAGE */}
                {message && (
                  <div
                    className={`rounded-xl border px-4 py-3 ${
                      isSuccess
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : "border-red-500/20 bg-red-500/5"
                    }`}
                  >
                    <p
                      className={`text-center text-sm leading-5 ${
                        isSuccess
                          ? "text-emerald-300"
                          : "text-red-300"
                      }`}
                    >
                      {message}
                    </p>
                  </div>
                )}

                {/* CREATE ACCOUNT */}
                <button
                  disabled={loading}
                  type="submit"
                  className="h-12 w-full rounded-2xl bg-linear-to-r from-[#8125FF] to-[#D000D9] px-5 text-sm font-semibold transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12.5 sm:text-base"
                >
                  {loading
                    ? "Creating account..."
                    : "Create account →"}
                </button>

                {/* LOGIN LINK */}
                <p className="text-center text-sm leading-6 text-[#657794] sm:text-base">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-[#A78BFA] transition hover:text-[#C084FC]"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </main>
        </div>
      </Layout>
    </div>
  );
};

export default Signup;