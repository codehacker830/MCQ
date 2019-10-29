import { IEntryCategory } from "../../../models/IEntryCategory";
import { createEntryPlaceholders } from "./createEntryPlaceholders";

const entries = createEntryPlaceholders();

if (entries.length !== 3) {
  throw new Error("Expected 3 entries.");
}

const entryCategoryTitles = [
  "NDA/ ACC",
  "Soldier Tradesman",
  "Group 'X' & 'Y': Med Asst Trade",
];

export const createEntryCategoryPlaceholders = (): IEntryCategory[] =>
  entries.map(
    (entry, index): IEntryCategory => ({
      id: `${entry.id}-${entryCategoryTitles[index]}`,
      entryID: entry.id,
      title: { en: entryCategoryTitles[index] },
    }),
  );
