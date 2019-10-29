import { IEntryCategory } from "../../../models";

// tslint:disable-next-line: interface-name
export interface ICategorySubscription {
  /** Subscription ID. */
  id: string;

  /** Entry category of subscription. */
  category: IEntryCategory;

  /** Total quantity of exams in subscription. */
  examTotalCount: number;

  /** Whether the subscription is a free subscription. */
  isFreeSubscription: boolean;

  /** Number of exams attempted. */
  examsAttemptedCount: number;

  /** Number of exams remaining. */
  examsRemainingCount: number;

  /** Expiration date and time of subscription. */
  expirationDate: number;
}
