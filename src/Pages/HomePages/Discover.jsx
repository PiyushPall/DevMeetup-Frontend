import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Clock3,
  FileCheck2,
  Search,
  Sparkles,
  TrendingUp,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../../api";
import { getUserIdFromToken } from "../../auth";

const Discover = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [sent, setSent] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(null);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await api.get("/user/users");
      setUsers(data.data || []);
    } catch (e) {
      setError(getErrorMessage(e, "Unable to discover people."));
    } finally {
      setLoading(false);
    }
  };

  const loadSentRequests = async () => {
    try {
      const { data } = await api.get("/user/view/sentRequests");

      const ids = (data.data || [])
        .map((request) => request.toUserId?._id || request.toUserId)
        .filter(Boolean);

      setSent(ids);
    } catch (e) {
      console.error("Unable to load sent requests:", e);
    }
  };

  useEffect(() => {
    loadUsers();
    loadSentRequests();
  }, []);

  const sendRequest = async (id) => {
    const myId = getUserIdFromToken();

    if (id === myId) {
      setError("You cannot send a request to yourself.");
      return;
    }

    if (sent.includes(id)) {
      return;
    }

    setSending(id);
    setError("");

    try {
      await api.post(`/user/sendRequest/${id}`);

      setSent((prev) => {
        if (prev.includes(id)) {
          return prev;
        }

        return [...prev, id];
      });
    } catch (e) {
      setError(
        getErrorMessage(e, "Unable to send connection request."),
      );
    } finally {
      setSending(null);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) {
      return users;
    }

    return users.filter(
      (u) =>
        `${u.firstName || ""} ${u.lastName || ""}`
          .toLowerCase()
          .includes(q) ||
        (u.skills || [])
          .join(" ")
          .toLowerCase()
          .includes(q) ||
        (u.emailId || "").toLowerCase().includes(q),
    );
  }, [users, search]);

  const me = getUserIdFromToken();

  const visibleUsers = filtered.filter(
    (user) => user._id !== me,
  );

  const stats = [
    {
      title: "Developers",
      value: visibleUsers.length,
      icon: UsersRound,
    },
    {
      title: "Sent requests",
      value: sent.length,
      icon: Clock3,
    },
    {
      title: "Available results",
      value: visibleUsers.length,
      icon: FileCheck2,
    },
    {
      title: "Profile",
      value: "100% API",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0B1220] px-4 py-5 pb-24 text-white sm:px-6 sm:py-7 lg:px-8 lg:py-8 lg:pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-r from-[#302B63] via-[#28345D] to-[#183B4D] px-5 py-7 sm:rounded-[28px] sm:px-8 sm:py-10 lg:px-12">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#9B5DE5]/20 blur-3xl sm:h-72 sm:w-72" />

        <div className="relative">
          <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#9B5DE5]/30 bg-[#9B5DE5]/10 px-3.5 py-2 sm:mb-6 sm:px-5">
            <Sparkles
              size={16}
              className="shrink-0 text-[#9B5DE5] sm:h-4.5 sm:w-4.5"
            />

            <span className="text-[11px] font-semibold tracking-wider text-[#9B5DE5] sm:text-sm">
              DEVELOPER COMMUNITY
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Meet your next
            <br />

            <span className="bg-linear-to-r from-[#9B5DE5] to-[#F15BB5] bg-clip-text text-transparent">
              Developer Connection
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-300 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
            Discover talented developers, connect with like-minded
            people, and build meaningful professional connections.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("developers")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-6 flex items-center gap-2 rounded-xl bg-linear-to-r from-[#9B5DE5] to-[#F15BB5] px-5 py-3 text-sm font-semibold transition hover:opacity-90 sm:mt-7 sm:px-7 sm:py-3.5 sm:text-base"
          >
            Start Discovering
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-5 xl:grid-cols-4">
        {stats.map(({ title, value, icon: Icon }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/5 bg-[#111827] p-4 sm:p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 sm:h-11 sm:w-11">
              <Icon
                size={19}
                className="text-purple-400 sm:h-5.25 sm:w-5.25"
              />
            </div>

            <h2 className="mt-4 text-2xl font-bold sm:mt-6 sm:text-3xl">
              {value}
            </h2>

            <p className="mt-1 truncate text-xs text-gray-400 sm:text-sm">
              {title}
            </p>
          </div>
        ))}
      </div>

      {/* Developers */}
      <section
        id="developers"
        className="mt-8 sm:mt-10"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-[2.5px] text-[#9B5DE5] sm:text-sm sm:tracking-[3px]">
              DISCOVER
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:mt-3 sm:text-3xl">
              Developers you may know
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {visibleUsers.length}{" "}
              {visibleUsers.length === 1
                ? "developer"
                : "developers"}{" "}
              available
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-111.25">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 sm:left-5"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or skill..."
              className="h-12 w-full rounded-xl border border-white/10 bg-[#151322] pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-[#9B5DE5] sm:h-15.5 sm:rounded-2xl sm:pl-14 sm:pr-5 sm:text-base lg:text-lg"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-red-300">
              {error}
            </p>

            <button
              onClick={loadUsers}
              className="w-full rounded-lg bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10 sm:w-auto"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="mt-6 flex min-h-72 items-center justify-center rounded-2xl bg-[#0A0F1F] text-sm text-slate-400 sm:mt-8 sm:min-h-80 sm:rounded-[28px] sm:text-base">
            Loading developers...
          </div>
        ) : visibleUsers.length === 0 ? (
          /* Empty */
          <div className="mt-6 flex min-h-72 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0A0F1F] px-5 text-center text-sm text-slate-500 sm:mt-8 sm:min-h-80 sm:rounded-[28px] sm:text-base">
            No developers found.
          </div>
        ) : (
          /* Developer Cards */
          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleUsers.map((user) => {
              const isSent = sent.includes(user._id);

              return (
                <article
                  key={user._id}
                  className="rounded-2xl border border-white/10 bg-[#0A0F1F] p-4 transition hover:border-[#9B5DE5]/40 sm:rounded-[26px] sm:p-6"
                >
                  {/* User */}
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-16 sm:w-16 sm:rounded-2xl"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-r from-[#8125FF] to-[#D000D9] sm:h-16 sm:w-16 sm:rounded-2xl">
                        <UserRound size={22} />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-bold sm:text-xl">
                        {user.firstName} {user.lastName}
                      </h3>

                      <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
                        {user.emailId}
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  {user.skills?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                      {user.skills.map((skill) => (
                        <span
                          key={skill}
                          className="max-w-full truncate rounded-full bg-[#8125FF]/10 px-3 py-1 text-xs text-[#A78BFA]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-1 gap-2 sm:mt-6 sm:grid-cols-[1fr_auto] sm:gap-3">
                    <button
                      disabled={
                        isSent || sending === user._id
                      }
                      onClick={() => sendRequest(user._id)}
                      className="w-full rounded-xl bg-linear-to-r from-[#8125FF] to-[#D000D9] py-3 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                    >
                      {sending === user._id
                        ? "Sending..."
                        : isSent
                          ? "Request sent"
                          : "Connect"}
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/profile?user=${user._id}`)
                      }
                      className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 sm:w-auto"
                    >
                      Profile
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Discover;