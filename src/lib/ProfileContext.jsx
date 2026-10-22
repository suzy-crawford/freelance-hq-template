import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { PageSkeleton } from "@/components/shared/Skeleton";

const ProfileContext = createContext(null);

export function useProfile() {
  return useContext(ProfileContext) || {};
}

export default function ProfileGate() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const loadProfile = useCallback(async () => {
    try {
      const { items } = await base44.entities.FreelancerProfile.filter({}, { sort: "-created_date", limit: 1 });
      if (items && items.length > 0) {
        setProfile(items[0]);
        return items[0];
      }
      const created = await base44.entities.FreelancerProfile.create({
        first_name: "",
        onboarding_complete: false,
        onboarding_step: 1,
        current_income: 0,
        country: "United States",
      });
      setProfile(created);
      return created;
    } catch (e) {
      console.error("Failed to load profile", e);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (loading || !profile) return;
    if (!profile.onboarding_complete && location.pathname !== "/onboarding") {
      navigate("/onboarding", { replace: true });
    } else if (profile.onboarding_complete && location.pathname === "/onboarding") {
      navigate("/", { replace: true });
    }
  }, [loading, profile, location.pathname, navigate]);

  const updateProfile = useCallback(
    async (data) => {
      if (!profile) return null;
      const updated = await base44.entities.FreelancerProfile.update(profile.id, data);
      setProfile(updated);
      return updated;
    },
    [profile]
  );

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-app-bg">
        <PageSkeleton />
      </div>
    );
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, reloadProfile: loadProfile }}>
      <Outlet />
    </ProfileContext.Provider>
  );
}