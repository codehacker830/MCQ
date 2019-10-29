import { EntryImages } from "../types/EntryImages";
import { fromPublicUrl } from "../utils";

/**
 * A mapping of "entry" names to their images.
 *
 * These should later be replaced with server uploaded files controlled from the
 * admin dashboard.
 */
export const entryImages: EntryImages = {
  AirForce: "airforce.svg",
  Army: "army.svg",
  AssamRifles: "assamrifles.svg",
  BSF: "bsf.svg",
  CoastGuard: "coastguard.svg",
  CRPF: "crpf.svg",
  ITBP: "itbp.svg",
  MNS: "mns.svg",
  Navy: "navy.svg",
  Officer: "officer.svg",
  SSB: "ssb.svg",
};

Object.keys(entryImages).forEach(stringKey => {
  const key = stringKey as keyof EntryImages;
  entryImages[key] = fromPublicUrl(`/images/entry/${entryImages[key]}`);
});
