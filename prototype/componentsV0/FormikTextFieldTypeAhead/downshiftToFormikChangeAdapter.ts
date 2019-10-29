import { DownshiftProps } from "downshift";
import { ChangeEvent, EventHandler } from "react";

/**
 * Converts Downshift's onStateChange event to one compatible with Formik's
 * onChange.
 *
 * We need to intercept input value changes and send them along to
 * Formik so that we can implement type ahead behavior. By default,
 * Downshift only accepts values from suggestions. If we manage the
 * value state in Formik we get type ahead behavior.
 * ref: https://codesandbox.io/s/82m2px40q9
 */
export const downshiftToFormikChangeAdapter = (
  name: string,
  formikChangeEventHandler: EventHandler<ChangeEvent<HTMLInputElement>>,
) => {
  const downshiftStateHandler: DownshiftProps<string>["onStateChange"] = ({
    inputValue,
  }) => {
    // Formik relies on a React change event. Downshift just gives us the
    // changed value. Here we implement a fake event to satisfy Formik's
    // requirements.
    // tslint:disable-next-line:no-object-literal-type-assertion
    const pseudoInputChangeEvent = {
      // tslint:disable-next-line:no-empty
      persist: () => {},
      target: {
        name,
        value: inputValue,
      },
    } as ChangeEvent<HTMLInputElement>;

    // Hopefully we don't encounter any errors thrown doing this. Adding
    // a custom error here in case a future api change in Formik causes
    // this to stop working. This error will hopefully aid in tracking
    // down the issue.
    try {
      formikChangeEventHandler(pseudoInputChangeEvent);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.warn(`Warning submitting change to outer Formik component: ${e}`);
      throw e;
    }
  };

  return downshiftStateHandler;
};
