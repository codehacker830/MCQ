import { IEntry } from "../../../models";

const createLogoUrl = (name: string): IEntry["logoUrlByWidth"] =>
  (["48", "64", "128", "256"] as (keyof IEntry["logoUrlByWidth"])[]).reduce(
    (acc, size) => {
      acc[size] = `/images/entry/png/${name}${size}.png`;
      return acc;
    },
    // tslint:disable-next-line:no-object-literal-type-assertion
    {} as IEntry["logoUrlByWidth"],
  );

export const createEntryPlaceholders = (): IEntry[] => [
  {
    id: "officer",
    title: { en: "Officer" },
    subtitle: {
      en: "NDA, CDA, ACC, AFCAT, Asst ComdtBSF (ITBP, CRPF, SSB, CISF), & MNS",
    },
    logoUrlByWidth: createLogoUrl("upsc"),
  },
  {
    id: "army",
    title: { en: "Army" },
    subtitle: {
      en:
        "Sol Tradesman, Sol GD/MD Dvr, Sol NA / Dresser, Sol Technical, Sol Clerk, Sep Pharma, Hav Education & RT JCO",
    },
    logoUrlByWidth: createLogoUrl("army"),
  },
  {
    id: "airforce",
    title: { en: "Airforce" },
    subtitle: { en: "Group 'X', Group 'Y'" },
    logoUrlByWidth: createLogoUrl("airforce"),
  },
  {
    id: "navy",
    title: { en: "Navy" },
    subtitle: {
      en: "Matric Recruit, Senior Secondary Recruit & Artificer Apprentices",
    },
    logoUrlByWidth: createLogoUrl("navy"),
  },
  {
    id: "assam-rifles",
    title: { en: "Assam Rifles" },
    subtitle: { en: "General Duty, Group 'B' & Group 'C' (Tradesman)" },
    logoUrlByWidth: createLogoUrl("assamrifles"),
  },
  {
    id: "capf",
    title: { en: "CAPF (BSF, ITBP, CRPF, SSB, CISF)" },
    subtitle: { en: "Asst Comdt, SI/ASI & Constable GD" },
    logoUrlByWidth: createLogoUrl("ssc"),
  },
  {
    id: "coast-guard",
    title: { en: "Coast Guard" },
    subtitle: {
      en:
        "Navik (Gen Duty) & Yantrik Technical (Mechanical, Electrical & Electronics)",
    },
    logoUrlByWidth: createLogoUrl("coastguard"),
  },
  {
    id: "railway-protection-force",
    title: { en: "Railway Protection Force" },
    subtitle: { en: "Sub Inspector & Constable" },
    logoUrlByWidth: createLogoUrl("railway"),
  },
  {
    id: "territorial-army",
    title: { en: "Territorial Army" },
    subtitle: { en: "Officer, Tradesman, Soldier GD & Clerk" },
    logoUrlByWidth: createLogoUrl("territorialarmy"),
  },
];
