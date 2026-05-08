"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { crew, crewIds, type CrewId, type CrewProfile } from "@/data/crew";

interface CrewContextValue {
  crewId: CrewId;
  setCrewId: (id: CrewId) => void;
  profile: CrewProfile;
  allIds: readonly CrewId[];
  allProfiles: CrewProfile[];
}

const CrewContext = createContext<CrewContextValue | null>(null);

export function CrewProvider({
  children,
  initialCrewId = "C001",
}: {
  children: ReactNode;
  initialCrewId?: CrewId;
}) {
  const [crewId, setCrewId] = useState<CrewId>(initialCrewId);

  const value = useMemo<CrewContextValue>(
    () => ({
      crewId,
      setCrewId,
      profile: crew[crewId],
      allIds: crewIds,
      allProfiles: crewIds.map((id) => crew[id]),
    }),
    [crewId]
  );

  return <CrewContext.Provider value={value}>{children}</CrewContext.Provider>;
}

export function useCrew(): CrewContextValue {
  const ctx = useContext(CrewContext);
  if (!ctx) {
    throw new Error("useCrew must be used within a CrewProvider");
  }
  return ctx;
}
