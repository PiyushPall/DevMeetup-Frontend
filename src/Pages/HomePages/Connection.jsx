import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  RefreshCw,
  Target,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../../api";

const Connections = () => {
  const navigate = useNavigate();

  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getOwnId = () => {
    try {
      return JSON.parse(
        atob((localStorage.getItem("token") || "").split(".")[1]),
      )?.userId;
    } catch {
      return null;
    }
  };

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await api.get("/user/view/connections");

      const records = data.data || [];
      const currentUserId = getOwnId();

      const detailed = records
        .map((record) => {
          const user =
            record.fromUserId?._id === currentUserId
              ? record.toUserId
              : record.fromUserId;

          if (!user?._id) return null;

          return {
            ...record,
            user,
          };
        })
        .filter(Boolean);

      setConnections(detailed);
    } catch (e) {
      setError(getErrorMessage(e, "Unable to load connections."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080B16] px-4 py-6 pb-24 text-white sm:px-6 sm:py-8 lg:px-8 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-[2.5px] text-[#9B5DE5] sm:text-sm sm:tracking-[3px]">
            YOUR NETWORK
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:mt-3 sm:text-4xl">
            Connections
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Developers you have connected with.
          </p>
        </div>

        {/* Total */}
        <div className="flex h-18 w-full shrink-0 items-center justify-between rounded-2xl border border-white/10 bg-[#0D111D] px-5 sm:h-21 sm:w-21 sm:flex-col sm:justify-center sm:rounded-[22px] sm:px-0">
          <span className="text-2xl font-bold">
            {connections.length}
          </span>

          <span className="text-xs uppercase text-slate-500 sm:mt-1">
            Total
          </span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-red-500/30 bg-red-500/5 px-4 py-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm text-red-300 sm:text-base">
            {error}
          </p>

          <button
            onClick={load}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10 sm:w-auto"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="mt-6 flex min-h-80 items-center justify-center rounded-2xl border border-white/5 bg-[#0B0F1A] text-sm text-slate-400 sm:mt-8 sm:min-h-96 sm:rounded-[28px] sm:text-base">
          Loading connections...
        </div>
      ) : connections.length === 0 ? (
        /* Empty State */
        <section className="mt-6 flex min-h-115ms-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0B0F1A] px-5 py-10 sm:mt-7 sm:min-h-125rounded-[28px] sm:px-8">
          <div className="w-full max-w-xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#181331] sm:h-22.5 sm:w-22.5">
              <Target
                size={32}
                className="sm:h-9 sm:w-9"
              />
            </div>

            <h2 className="mt-6 text-xl font-bold sm:mt-8 sm:text-2xl">
              No connections yet
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
              Accept a connection request to build your developer
              network. Your accepted connections will appear here
              automatically.
            </p>

            <button
              onClick={() => navigate("/discover")}
              className="mx-auto mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#9B5DE5] to-[#F15BB5] px-6 py-3.5 text-sm font-bold transition hover:opacity-90 sm:mt-8 sm:w-auto sm:px-7"
            >
              Discover developers
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      ) : (
        /* Connections Grid */
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {connections.map((connection) => {
            const user = connection.user;

            return (
              <article
                key={connection._id}
                className="rounded-2xl border border-white/10 bg-[#0B0F1A] p-4 transition hover:border-white/15 hover:bg-[#0D111D] sm:rounded-[26px] sm:p-6"
              >
                {/* User */}
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  {user?.profileImage ? (
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
                    <h2 className="truncate text-base font-bold sm:text-xl">
                      {user?.firstName} {user?.lastName}
                    </h2>

                    <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
                      {user?.emailId}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                {user?.skills?.length > 0 && (
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

                {/* Profile Button */}
                <button
                  onClick={() =>
                    navigate(`/profile?user=${user?._id}`)
                  }
                  className="mt-5 w-full rounded-xl border border-white/10 py-3 text-sm font-semibold transition hover:bg-white/5 sm:mt-6 sm:text-base"
                >
                  View profile
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Connections;