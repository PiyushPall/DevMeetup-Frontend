import React, { useEffect, useState } from "react";
import { Trash2, UserRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../../api";
import { getUserIdFromToken, logout } from "../../auth";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const targetId = new URLSearchParams(location.search).get("user");
  const ownId = getUserIdFromToken();
  const isOwnProfile = !targetId || targetId === ownId;

  const [profile, setProfile] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    skills: [],
    profileImage: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fill = (user) => {
    setProfile(user);

    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      age: user.age || "",
      phone: user.phone || "",
      skills: Array.isArray(user.skills) ? user.skills : [],
      profileImage: user.profileImage || "",
    });
  };

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await api.get(
        isOwnProfile
          ? "/user/profile"
          : `/user/user/${targetId}`,
      );

      fill(data.data);
    } catch (e) {
      setError(
        getErrorMessage(e, "Unable to load profile."),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [targetId]);

  const updateField = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const updateProfile = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: Number(form.age),
        phone: form.phone.trim(),
        skills: form.skills,
        profileImage: form.profileImage.trim(),
      };

      const { data } = await api.patch(
        "/user/updateProfile",
        payload,
      );

      fill(data.data);

      localStorage.setItem(
        "user",
        JSON.stringify(data.data),
      );

      setEditing(false);
      setSuccess(
        data.message || "Profile updated successfully.",
      );
    } catch (e) {
      setError(
        getErrorMessage(e, "Unable to update profile."),
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This cannot be undone.",
      )
    ) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      await api.delete(`/user/user/${ownId}`);

      logout();
      navigate("/login", { replace: true });
    } catch (e) {
      setError(
        getErrorMessage(e, "Unable to delete account."),
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070A14] px-4 py-6 pb-24 text-white sm:px-6 sm:py-8 lg:px-8 lg:pb-8">
      {/* Page Header */}
      <div>
        <p className="text-xs font-bold tracking-[2.5px] text-[#9B5DE5] sm:text-sm sm:tracking-[3px]">
          ACCOUNT
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:mt-4 sm:text-4xl">
          {isOwnProfile
            ? "My profile"
            : "Developer profile"}
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500 sm:mt-3 sm:text-lg">
          {isOwnProfile
            ? "Your public identity on DevMeetup."
            : "Public developer information."}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/5 px-4 py-4 text-sm leading-6 text-red-300 sm:mt-8 sm:rounded-[22px] sm:px-6">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-4 text-sm leading-6 text-emerald-300 sm:mt-5 sm:rounded-[22px] sm:px-6">
          {success}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0A0F1F] px-5 py-8 text-sm text-slate-400 sm:mt-12 sm:rounded-[22px] sm:px-8 sm:py-10 sm:text-base">
          Loading profile...
        </div>
      ) : (
        profile && (
          <div className="mt-7 rounded-2xl border border-[#1D293B] bg-[#0A0F1F] p-4 sm:mt-10 sm:rounded-[26px] sm:p-6 lg:p-8">
            {/* Profile Header */}
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:gap-6 sm:pb-7">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt=""
                  className="h-20 w-20 rounded-2xl object-cover sm:h-24 sm:w-24 sm:rounded-3xl"
                />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-linear-to-r from-[#8125FF] to-[#D000D9] sm:h-24 sm:w-24 sm:rounded-3xl">
                  <UserRound
                    size={30}
                    className="sm:h-8.5 sm:w-8.5"
                  />
                </div>
              )}

              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold sm:text-2xl">
                  {profile.firstName} {profile.lastName}
                </h2>

                <p className="mt-1 truncate text-sm text-slate-500 sm:text-base">
                  {profile.emailId}
                </p>
              </div>
            </div>

            {/* Profile Information */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-7 md:grid-cols-2">
              {/* First Name */}
              <div>
                <p className="text-sm text-slate-500">
                  First name
                </p>

                {editing ? (
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={updateField}
                    className="mt-2 h-12 w-full rounded-xl border border-[#1D293B] bg-[#070A14] px-4 text-sm outline-none transition focus:border-[#9B5DE5] sm:text-base"
                  />
                ) : (
                  <p className="mt-2 text-base font-semibold sm:text-lg">
                    {profile.firstName || "Not set"}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <p className="text-sm text-slate-500">
                  Last name
                </p>

                {editing ? (
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={updateField}
                    className="mt-2 h-12 w-full rounded-xl border border-[#1D293B] bg-[#070A14] px-4 text-sm outline-none transition focus:border-[#9B5DE5] sm:text-base"
                  />
                ) : (
                  <p className="mt-2 text-base font-semibold sm:text-lg">
                    {profile.lastName || "Not set"}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="min-w-0">
                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="mt-2 truncate text-base font-semibold sm:text-lg">
                  {profile.emailId}
                </p>
              </div>

              {/* Age */}
              <div>
                <p className="text-sm text-slate-500">
                  Age
                </p>

                {editing ? (
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={updateField}
                    className="mt-2 h-12 w-full rounded-xl border border-[#1D293B] bg-[#070A14] px-4 text-sm outline-none transition focus:border-[#9B5DE5] sm:text-base"
                  />
                ) : (
                  <p className="mt-2 text-base font-semibold sm:text-lg">
                    {profile.age || "Not set"}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <p className="text-sm text-slate-500">
                  Phone
                </p>

                {editing ? (
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                    className="mt-2 h-12 w-full rounded-xl border border-[#1D293B] bg-[#070A14] px-4 text-sm outline-none transition focus:border-[#9B5DE5] sm:text-base"
                  />
                ) : (
                  <p className="mt-2 text-base font-semibold sm:text-lg">
                    {profile.phone || "Not set"}
                  </p>
                )}
              </div>

              {/* Profile Image */}
              <div className="min-w-0">
                <p className="text-sm text-slate-500">
                  Profile image URL
                </p>

                {editing ? (
                  <input
                    name="profileImage"
                    value={form.profileImage}
                    onChange={updateField}
                    className="mt-2 h-12 w-full rounded-xl border border-[#1D293B] bg-[#070A14] px-4 text-sm outline-none transition focus:border-[#9B5DE5] sm:text-base"
                  />
                ) : (
                  <p className="mt-2 truncate text-base font-semibold sm:text-lg">
                    {profile.profileImage || "Not set"}
                  </p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6 sm:mt-7">
              <p className="text-sm text-slate-500">
                Skills
              </p>

              {editing ? (
                <input
                  value={form.skills.join(", ")}
                  onChange={(e) =>
                    setForm((previous) => ({
                      ...previous,
                      skills: e.target.value
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="React, JavaScript, Node.js..."
                  className="mt-2 h-12 w-full rounded-xl border border-[#1D293B] bg-[#070A14] px-4 text-sm outline-none transition focus:border-[#9B5DE5] sm:text-base"
                />
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {(profile.skills || []).length > 0 ? (
                    profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[#8125FF]/10 px-3 py-1.5 text-xs text-[#A78BFA] sm:text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-600">
                      No skills added
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            {isOwnProfile && (
              <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-6 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                {!editing ? (
                  <button
                    onClick={() => {
                      setSuccess("");
                      setEditing(true);
                    }}
                    className="w-full rounded-xl bg-linear-to-r from-[#8125FF] to-[#D000D9] px-6 py-3 text-sm font-semibold transition hover:opacity-90 sm:w-auto sm:text-base"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      disabled={saving}
                      onClick={updateProfile}
                      className="w-full rounded-xl bg-linear-to-r from-[#8125FF] to-[#D000D9] px-6 py-3 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:text-base"
                    >
                      {saving
                        ? "Saving..."
                        : "Save Changes"}
                    </button>

                    <button
                      onClick={() => {
                        setEditing(false);
                        fill(profile);
                      }}
                      className="w-full rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold transition hover:bg-white/5 sm:w-auto sm:text-base"
                    >
                      Cancel
                    </button>
                  </>
                )}

                <button
                  disabled={deleting}
                  onClick={deleteAccount}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 sm:ml-auto sm:w-auto sm:text-base"
                >
                  <Trash2 size={17} />

                  {deleting
                    ? "Deleting..."
                    : "Delete account"}
                </button>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Profile;