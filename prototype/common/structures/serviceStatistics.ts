import { ServiceStatistics } from "../types/ServiceStatistics";

const randomNumber = (max = 1000) =>
  Math.floor(Math.random() * Math.floor(max)) + 1;

const entries = [
  "Officer Entry",
  "Army Nursing Officer",
  "Army Soldier",
  "Army Havildar",
  "Army JCO",
  "AirForce Airman",
  "Navy Sailor",
  "Territorial Army",
  "Coast Guard",
  "Assam Rifles",
  "CAPF",
].sort();

const questionSubjects = [
  "Math",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "General Awareness",
  "Polity",
  "Economics",
].sort();

export const serviceStatistics: ServiceStatistics = {
  usersTotal: randomNumber(),
  usersActive: randomNumber(),
  userRegistrationsToday: randomNumber(),
  userRegistrationsPastWeek: randomNumber(),
  userRegistrationsPastMonth: randomNumber(),

  entries,
  entriesRegistrationsToday: entries.map(() => randomNumber()),
  entriesRegistrationsPastWeek: entries.map(() => randomNumber()),
  entriesRegistrationsPastMonth: entries.map(() => randomNumber()),

  membershipTrialUsersToday: randomNumber(),
  membershipTrialUsersPastWeek: randomNumber(),
  membershipTrialUsersPastMonth: randomNumber(),
  membershipBronzeUsersToday: randomNumber(),
  membershipBronzeUsersPastWeek: randomNumber(),
  membershipBronzeUsersPastMonth: randomNumber(),
  membershipSilverUsersToday: randomNumber(),
  membershipSilverUsersPastWeek: randomNumber(),
  membershipSilverUsersPastMonth: randomNumber(),
  membershipGoldUsersToday: randomNumber(),
  membershipGoldUsersPastWeek: randomNumber(),
  membershipGoldUsersPastMonth: randomNumber(),

  questionSubjects,
  questionCountsPerSubjects: questionSubjects.map(() => randomNumber()),
};
