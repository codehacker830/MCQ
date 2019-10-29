import { ICategorySubscription } from "../models/ICategorySubscription";
import { createEntryCategoryPlaceholders } from "./createEntryCategoryPlaceholders";

const entryCategories = createEntryCategoryPlaceholders();

export const createCategorySubscriptionPlaceholders = (): ICategorySubscription[] =>
  entryCategories.map(
    (entryCategory): ICategorySubscription => ({
      id: `${entryCategory.id}-subscription`,
      category: entryCategory,
      examTotalCount: 10,
      isFreeSubscription: false,
      examsAttemptedCount: 2,
      examsRemainingCount: 8,
      expirationDate: 0,
    }),
  );
