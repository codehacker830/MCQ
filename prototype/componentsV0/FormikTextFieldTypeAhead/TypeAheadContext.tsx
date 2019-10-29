import Downshift, {
  ControllerStateAndHelpers as DownshiftApi,
} from "downshift";
import React, { Component, createContext } from "react";

import { FormikTextFieldProps } from "../FormikTextField";
import { downshiftToFormikChangeAdapter } from "./downshiftToFormikChangeAdapter";

export type TypeAheadContextProviderProps<
  Values extends object
> = FormikTextFieldProps<Values> & {
  suggestions: string[];
};

type TypeAheadContextProviderState = {
  inputRef: HTMLInputElement | null;
};

type TypeAheadContextValue = {
  formikApi: FormikTextFieldProps<any>["formikApi"];
  downshiftApi: DownshiftApi<string>;
  textFieldProps: Omit<FormikTextFieldProps<any>, "formikApi">;
  suggestions: string[];
  inputRef: HTMLInputElement | null;
  setInputRef: (element: HTMLInputElement | null) => void;
};

const TypeAheadContext = createContext<TypeAheadContextValue | null>(null);

/**
 * Provides TypeAheadContextValue context value to children which provides:
 * * formikApi
 * * downshiftApi
 * * textFieldProps
 * * suggestions: `string[]`
 */
export class TypeAheadContextProvider<Values extends object> extends Component<
  TypeAheadContextProviderProps<Values>,
  TypeAheadContextProviderState
> {
  state: TypeAheadContextProviderState = { inputRef: null };

  private setInputRef = (element: HTMLInputElement | null) =>
    this.setState({ inputRef: element });

  // tslint:disable-next-line: member-ordering
  render() {
    const { formikApi, name, children, suggestions, ...rest } = this.props;
    const value = (formikApi.values[name] as any) as string;

    if (typeof value !== "string" && value !== undefined) {
      throw new Error(
        "Only string values are supported in type ahead control.",
      );
    }

    return (
      <Downshift
        // TODO: Check if this should be here in some way. The prop was removed
        // from the type definitions:
        // defaultInputValue={value}
        selectedItem={value}
        onStateChange={downshiftToFormikChangeAdapter(
          name,
          formikApi.handleChange,
        )}
      >
        {downshiftApi => (
          <div>
            <TypeAheadContext.Provider
              value={{
                downshiftApi,
                formikApi,
                textFieldProps: { ...rest, name },
                suggestions,
                inputRef: this.state.inputRef,
                setInputRef: this.setInputRef,
              }}
            >
              {children}
            </TypeAheadContext.Provider>
          </div>
        )}
      </Downshift>
    );
  }
}

export const TypeAheadContextConsumer = TypeAheadContext.Consumer;
