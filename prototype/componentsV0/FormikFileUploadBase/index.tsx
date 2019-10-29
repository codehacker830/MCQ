import { FormikProps } from "formik";
import React, {
  ChangeEvent,
  Component,
  createRef,
  EventHandler,
  MouseEvent,
  ReactNode,
} from "react";
import styled from "styled-components";

export interface FormikFileUploadBaseProps<Values extends object> {
  /**
   * Formik field name.
   */
  name: Extract<keyof Values, string>;

  /**
   * Formik api passed from its render function.
   */
  formikApi: FormikProps<Values>;

  /**
   * Set as the child's value when no file is currently selected.
   */
  placeholder?: string;

  /**
   * Value to pass to the native input's "accept" attribute. It is used to
   * control the file types allowed for upload.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept
   */
  acceptedFileTypes?: string;

  rawValue?: any;
}

export interface FormikFileUploadBaseChildrenProps {
  /**
   * Render function. It is provided a handler for the onMouseDown event so that
   * this component can trigger the onClick event of an internal hidden file
   * input element. onMouseDown is used so that focus behavior can be
   * intercepted. It provides a field value taken either from the currently
   * selected file's filename or optional placeholder text.
   */
  children: (api: {
    onMouseDown: EventHandler<MouseEvent<any>>;
    value: string;
  }) => ReactNode;
}

/**
 * Provides a file upload base component. It is passed a component which accepts
 * an onClick handler. It connects to a Formik instance using the provided
 * `formikApi` prop.
 */
export class FormikFileUploadBase<Values extends object> extends Component<
  FormikFileUploadBaseProps<Values> & FormikFileUploadBaseChildrenProps
> {
  private fileInput = createRef<HTMLInputElement>();

  render() {
    const {
      name,
      formikApi: api,
      acceptedFileTypes,
      placeholder,
      children,
      rawValue,
    } = this.props;

    const value =
      rawValue === undefined
        ? (api.values as { [P: string]: File | null })[name]
        : rawValue;

    const valueAsFile = value;
    const filename = valueAsFile ? valueAsFile.name : placeholder || "";

    return (
      <>
        <NativeInputHidden
          // TODO: Fix this type definition. Needs updated styled-components @types package for "ref" prop to accept React.createRef.
          // @ts-ignore
          ref={this.fileInput}
          accept={acceptedFileTypes}
          type="file"
          onChange={this.handleChange}
        />

        {children({ value: filename, onMouseDown: this.handleClick })}
      </>
    );
  }

  private handleChange: EventHandler<ChangeEvent<HTMLInputElement>> = event => {
    const { files } = event.target;
    if (!files || files.length === 0) return;

    const { name, formikApi: api } = this.props;
    const { setFieldValue } = api;

    setFieldValue(name, files[0]);
  };

  private handleClick: EventHandler<MouseEvent<HTMLDivElement>> = event => {
    // Prevent control passed through children prop from gaining focus. This is
    // a fix for Material UI styling behavior.
    event.preventDefault();

    if (this.fileInput.current) this.fileInput.current.click();
  };
}

const NativeInputHidden = styled.input`
  display: none;
`;
