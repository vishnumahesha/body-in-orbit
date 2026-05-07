import { CrewMember } from "./types";

export const crew: Record<string, CrewMember> = {
  crew1: {
    id: "crew1",
    publicName: "Jared Isaacman",
    missionRole: "Commander",
    displayLabel: "Crew 1",
    note: "Individual views should be interpreted as baseline-relative report structure, not clinical assessment.",
  },
  crew2: {
    id: "crew2",
    publicName: "Hayley Arceneaux",
    missionRole: "Medical Officer",
    displayLabel: "Crew 2",
    note: "Individual views should be interpreted as baseline-relative report structure, not clinical assessment.",
  },
  crew3: {
    id: "crew3",
    publicName: "Sian Proctor",
    missionRole: "Pilot",
    displayLabel: "Crew 3",
    note: "Individual views should be interpreted as baseline-relative report structure, not clinical assessment.",
  },
  crew4: {
    id: "crew4",
    publicName: "Chris Sembroski",
    missionRole: "Mission Specialist",
    displayLabel: "Crew 4",
    note: "Individual views should be interpreted as baseline-relative report structure, not clinical assessment.",
  },
};
