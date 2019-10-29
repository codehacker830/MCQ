import { IEntryCategory } from "../../../models";
import { createEntryPlaceholders } from "./createEntryPlaceholders";
import { getCategories } from "./entriesCsv";

const entries = createEntryPlaceholders();

const createEntryCategoriesForEntry = (entryID: string): IEntryCategory[] => {
  if (!entries.find(entry => entry.id === entryID)) {
    throw new Error(`No entry corresponds to the id ${entryID}.`);
  }

  const categories = getCategories(entryID);
  if (!categories) {
    throw new Error(`Failed to fetch categories for entry id ${entryID}`);
  }

  return categories.map(category => ({
    id: category.category,
    entryID,
    title: { en: category.category },
    education: category.education ? { en: category.education } : undefined,
  }));
};

export const createEntryCategoryPlaceholders = (): IEntryCategory[] => {
  const entryCategoriesArray = entries.map(entry =>
    createEntryCategoriesForEntry(entry.id),
  );

  if (entryCategoriesArray.length !== entries.length) {
    throw new Error(
      "Expected the same number of entry category arrays as there are entries.",
    );
  }

  const entryCategories = entryCategoriesArray.reduce(
    (accumulator, categories) => {
      return accumulator.concat(categories);
    },
    [] as IEntryCategory[],
  );

  return entryCategories;
};
