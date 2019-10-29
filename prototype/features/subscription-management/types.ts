import { InjectedFormikProps } from "formik";
import { RouteComponentProps } from "react-router-dom";
import { IEntry, IEntryCategory } from "../../models";
import { ICategoryQuantitySelectionSettings } from "./models/ICategoryQuantitySelectionSettings";
import { ICategorySubscriptions } from "./models/ICategorySubscriptions";

export type StateProps = {
  loaded: boolean;
  isOnboarding: boolean;

  entries: IEntry[];
  categories: IEntryCategory[];
  categoryQuantitySelectionSettings: ICategoryQuantitySelectionSettings | null;
  subscriptions: ICategorySubscriptions | null;
};

export type DispatchProps = {
  loadPlaceholderData: () => any;

  submitSubscriptions: (subscriptions: ICategorySubscriptions) => any;
};

export type OwnProps = RouteComponentProps<{}> & {};

export type Props = StateProps & DispatchProps & OwnProps;

export type PropsWithFormState = InjectedFormikProps<Props, FormState>;

export type Page = "entry-select" | "category-select";

export type FormState = {
  selectedEntryIDs: string[];
  selectedQuantities: { categoryID: string; quantityIndex: number | null }[];
};
