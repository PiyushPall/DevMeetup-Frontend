import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  RefreshCw,
  UserRound,
  X,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../../api";

const Requests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [viewing, setViewing] = useState(null);

  const getRequests = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await api.get("/user/view/allRequest");
      setRequests(data.data || []);
    } catch (e) {
      setError(getErrorMessage(e, "Unable to load connection requests."));
    } finally {
      setLoading(false);
    }
  };

  const viewRequest = async (fromUserId) => {
    try {
      const { data } = await api.get(`/user/view/request/${fromUserId}`);
      setViewing(data.data);
    } catch (e) {
      setError(getErrorMessage(e, "Unable to load request details."));
    }
  };

  const handleRequest = async (fromUserId, status) => {
    setActionLoading(fromUserId);
    setError("");

    try {
      await api.patch(`/user/acceptRequest/${fromUserId}/${status}`);

      setRequests((prev) =>
        prev.filter((r) => r.fromUserId?._id !== fromUserId),
      );
    } catch (e) {
      setError(getErrorMessage(e, `Unable to ${status} request.`));
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070A14] px-4 py-5 pb-24 text-white sm:px-6 sm:py-7 lg:px-8 lg:py-8 lg:pb-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-[2.5px] text-[#9B5DE5] sm:text-sm sm:tracking-[3px]">
            INBOX
          </p>

          <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:mt-4 sm:text-4xl lg:text-5xl">
            Connection requests
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:mt-3 sm:text-base lg:text-lg">
            People who want to add you to their developer network.
          </p>
        </div>

        <button
          onClick={() => navigate("/discover")}
          className="w-full rounded-2xl border border-white/10 bg-[#0D111D] px-5 py-3.5 text-sm font-semibold text-slate-300 transition hover:bg-white/5 sm:w-auto sm:px-6 sm:py-4"
        >
          Discover developers
        </button>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-red-500/30 bg-red-500/5 px-4 py-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5 lg:px-7">
          <p className="min-w-0 wrap-break-word text-sm leading-5 text-red-300">
            {error}
          </p>

          <button
            onClick={getRequests}
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-300 transition hover:bg-red-500/20 sm:w-auto"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      )}

      {/* ================= LOADING ================= */}
      {loading ? (
        <div className="mt-7 flex min-h-90 items-center justify-center rounded-[28px] border border-white/10 bg-[#0A0E19] px-5 text-center text-sm text-slate-400 sm:mt-10 sm:min-h-100 sm:rounded-[38px] sm:text-base">
          Loading connection requests...
        </div>
      ) : requests.length === 0 ? (
        /* ================= EMPTY STATE ================= */
        <div className="mt-6 flex min-h-107.5 items-center justify-center rounded-[28px] border border-dashed border-white/15 bg-[#0A0E19] px-5 sm:mt-8 sm:min-h-135 sm:rounded-[38px]">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-[#9B5DE5]/20 bg-[#151126] sm:h-27 sm:w-27 sm:rounded-[28px]">
              <ArrowUpRight size={32} className="sm:h-9 sm:w-9" />
            </div>

            <h2 className="mt-7 text-xl font-bold sm:mt-9 sm:text-2xl">
              Your inbox is clear
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:mt-3 sm:text-base">
              When another developer sends you a request, it will appear here.
            </p>
          </div>
        </div>
      ) : (
        /* ================= REQUEST CARDS ================= */
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-2">
          {requests.map((request) => {
            const user = request.fromUserId;
            const isLoading = actionLoading === user?._id;

            return (
              <article
                key={request._id}
                className="rounded-3xl border border-white/10 bg-[#0A0E19] p-4 transition hover:border-[#9B5DE5]/30 sm:rounded-[28px] sm:p-6"
              >
                {/* PROFILE */}
                <div className="flex items-center gap-3 sm:gap-5">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-2xl object-cover sm:h-20 sm:w-20"
                    />
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-r from-[#8125FF] to-[#D000D9] sm:h-20 sm:w-20">
                      <UserRound size={25} className="sm:h-7.5 sm:w-7.5" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-lg font-bold sm:text-xl">
                      {user?.firstName} {user?.lastName}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                      Wants to connect with you
                    </p>
                  </div>
                </div>

                {/* USER INFO */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4">
                  <div className="min-w-0 rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-slate-500">Email</p>

                    <p className="mt-1 truncate text-sm text-slate-300">
                      {user?.emailId || "Not available"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-slate-500">Age</p>

                    <p className="mt-1 text-sm text-slate-300">
                      {user?.age || "Not available"}
                    </p>
                  </div>
                </div>

                {/* SKILLS */}
                {user?.skills?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                    {user.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[#8125FF]/10 px-3 py-1.5 text-[11px] text-[#A78BFA] sm:text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* ACTIONS */}
                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                  <button
                    onClick={() => viewRequest(user?._id)}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-300 transition hover:bg-white/10"
                  >
                    <Eye size={17} />
                    View
                  </button>

                  <button
                    disabled={isLoading}
                    onClick={() => handleRequest(user?._id, "accepted")}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#8125FF] to-[#D000D9] px-3 py-3 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Check size={18} />

                    {isLoading ? "..." : "Accept"}
                  </button>

                  <button
                    disabled={isLoading}
                    onClick={() => handleRequest(user?._id, "rejected")}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X size={18} />
                    Reject
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ================= VIEW MODAL ================= */}
      {viewing && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4 sm:p-5"
          onClick={() => setViewing(null)}
        >
          <div
            className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1020] p-5 sm:rounded-3xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold sm:text-2xl">
                Request details
              </h2>

              <button
                onClick={() => setViewing(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-300 sm:mt-6 sm:text-base">
              <p className="wrap-break-word">
                <b className="text-white">Name:</b>{" "}
                {viewing.fromUserId?.firstName}{" "}
                {viewing.fromUserId?.lastName}
              </p>

              <p className="wrap-break-word">
                <b className="text-white">Email:</b>{" "}
                {viewing.fromUserId?.emailId || "Not available"}
              </p>

              <p>
                <b className="text-white">Phone:</b>{" "}
                {viewing.fromUserId?.phone || "Not available"}
              </p>

              <p>
                <b className="text-white">Age:</b>{" "}
                {viewing.fromUserId?.age || "Not available"}
              </p>

              <p className="wrap-break-word">
                <b className="text-white">Skills:</b>{" "}
                {(viewing.fromUserId?.skills || []).join(", ") ||
                  "Not available"}
              </p>
            </div>

            <button
              onClick={() => {
                setViewing(null);
                navigate(`/profile?user=${viewing.fromUserId?._id}`);
              }}
              className="mt-5 w-full rounded-xl bg-linear-to-r from-[#8125FF] to-[#D000D9] py-3 text-sm font-semibold transition hover:opacity-90 sm:mt-6 sm:text-base"
            >
              Open profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;