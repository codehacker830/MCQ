import { IEntry, IEntryCategory } from "../../../models";
import { IIndexCardColors } from "../models/IIndexCardColors";

const createLogoUrl = (name: string): IEntry["logoUrlByWidth"] =>
  (["48", "64", "128", "256"] as (keyof IEntry["logoUrlByWidth"])[]).reduce(
    (acc, size) => {
      acc[size] = `/images/entry/png/${name}${size}.png`;
      return acc;
    },
    // tslint:disable-next-line:no-object-literal-type-assertion
    {} as IEntry["logoUrlByWidth"],
  );

const createEntryCategories = (
  entryID: string,
  names: string[],
): IEntryCategory[] =>
  names.map(
    (name): IEntryCategory => ({
      id: `${entryID}-${name}`,
      entryID,
      title: { en: name },
    }),
  );

type IndexCardEntryPlaceholders = {
  indexCardEntries: IEntry[];
  indexCardEntryCategories: IEntryCategory[];
  indexCardColors: IIndexCardColors[];
};

const placeholderCategories = [
  [
    "Soldier Tradesman",
    "Soldier Gen Duty",
    "Sol GD MT Driver",
    "Soldier Technical",
    "Soldier Clerk SKT",
    "Sepoy Pharma",
    "Religious Teacher",
    "Hav Education",
    "Soldier NA/ Dresser",
  ],
  ["Airmen Gp X", "Airmen Y", "Airmen Gp X & Y"],
  ["Matric Recruit", "Sr Secondary Rect", "Artificer Apprentices"],
];

export const createIndexCardEntryPlaceholders = (): IndexCardEntryPlaceholders => {
  const placeholder: IndexCardEntryPlaceholders = {
    indexCardEntries: [
      {
        id: "army",
        logoUrlByWidth: createLogoUrl("army"),
        title: { en: "Indian Army Recruitment" },
      },
      {
        id: "airforce",
        logoUrlByWidth: createLogoUrl("airforce"),
        title: { en: "Indian Airforce Recruitment" },
      },
      {
        id: "navy",
        logoUrlByWidth: createLogoUrl("navy"),
        title: { en: "Indian Navy Recruitment" },
      },
    ],
    indexCardEntryCategories: [],
    indexCardColors: [
      {
        entryID: "army",
        blockColor: "#e2f0d9",
        logoBackgroundColor: "#c5e0b4",
        titleColor: "#404040",
        categoryTitleColor: "#385723",
        categoryBackgroundColor: "#c5e0b4",
      },
      {
        entryID: "airforce",
        blockColor: "#dae3f3",
        logoBackgroundColor: "#b4c7e7",
        titleColor: "#0070c0",
        categoryTitleColor: "#385723",
        categoryBackgroundColor: "#bdd7ee",
      },
      {
        entryID: "navy",
        blockColor: "#d9d9d9",
        logoBackgroundColor: "#ffffff",
        titleColor: "#0070c0",
        categoryTitleColor: "#385723",
        categoryBackgroundColor: "#ffffff",
      },
    ],
  };

  placeholder.indexCardEntryCategories = placeholder.indexCardEntries.reduce(
    (accumulator, entry, index) => {
      return accumulator.concat(
        ...createEntryCategories(entry.id, placeholderCategories[index]),
      );
    },
    [] as IEntryCategory[],
  );

  return placeholder;
};
