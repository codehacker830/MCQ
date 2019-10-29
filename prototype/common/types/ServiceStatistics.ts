/**
 * Statistics for display on dashboard home.
 */
export interface ServiceStatistics {
  // #region Users card
  /** Total number of registered users. */
  usersTotal: number;
  /** Total number of active users. */
  usersActive: number;
  /** Number of user registrations today. */
  userRegistrationsToday: number;
  /** Number of user registrations over the previous 7 days. */
  userRegistrationsPastWeek: number;
  /** Number of user registrations over the previous 30 days. */
  userRegistrationsPastMonth: number;
  // #endregion

  // #region Entry wise Users
  /** List of service branches (Entry). */
  entries: string[];
  /** Number of user registrations per entry for today. */
  entriesRegistrationsToday: number[];
  /** Number of user registrations per entry for previous 7 days. */
  entriesRegistrationsPastWeek: number[];
  /** Number of user registrations per entry for previous 30 days. */
  entriesRegistrationsPastMonth: number[];
  // #endregion

  // #region Membership Status
  membershipTrialUsersToday: number;
  membershipTrialUsersPastWeek: number;
  membershipTrialUsersPastMonth: number;
  membershipBronzeUsersToday: number;
  membershipBronzeUsersPastWeek: number;
  membershipBronzeUsersPastMonth: number;
  membershipSilverUsersToday: number;
  membershipSilverUsersPastWeek: number;
  membershipSilverUsersPastMonth: number;
  membershipGoldUsersToday: number;
  membershipGoldUsersPastWeek: number;
  membershipGoldUsersPastMonth: number;
  // #endregion

  // #region Question Bank
  questionSubjects: string[];
  questionCountsPerSubjects: number[];
  // #endregion
}
