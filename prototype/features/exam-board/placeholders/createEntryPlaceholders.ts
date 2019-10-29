import { IEntry } from "../../../models";

export const createEntryPlaceholders = (): IEntry[] =>
  ["Officer", "Army", "Airforce"].map(
    (name): IEntry => ({
      id: name.toLowerCase(),
      title: { en: name },
      logoUrlByWidth: createLogoUrl(name.toLocaleLowerCase()),
    }),
  );

const createLogoUrl = (name: string): IEntry["logoUrlByWidth"] =>
  (["48", "64", "128", "256"] as (keyof IEntry["logoUrlByWidth"])[]).reduce(
    (acc, size) => {
      acc[size] = `/images/entry/png/${name}${size}.png`;
      return acc;
    },
    // tslint:disable-next-line:no-object-literal-type-assertion
    {} as IEntry["logoUrlByWidth"],
  );
