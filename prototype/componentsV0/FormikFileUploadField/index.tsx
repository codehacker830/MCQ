import React, { Component } from "react";
import styled from "styled-components";

import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import { TextFieldProps } from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";

import {
  FormikFileUploadBase,
  FormikFileUploadBaseProps,
} from "../FormikFileUploadBase";

/** Used to help generate unique element id's. */
let instanceCounter = 0;

export interface FormikFileUploadFieldProps<Values extends object>
  extends Pick<
      TextFieldProps,
      "label" | "fullWidth" | "margin" | "placeholder"
    >,
    FormikFileUploadBaseProps<Values> {
  /**
   * Present the control as an icon button instead of a full text field.
   */
  iconOnly?: boolean;
}

/**
 * Provides a file upload text field. It connects to a Formik instance using the
 * provided `formikApi` prop.
 */
export class FormikFileUploadField<Values extends object> extends Component<
  FormikFileUploadFieldProps<Values>
> {
  render() {
    const {
      formikApi: api,
      name,
      acceptedFileTypes,
      label,
      fullWidth = true,
      margin,
      placeholder,
      iconOnly,
      rawValue,
      ...rest
    } = this.props;

    instanceCounter += 1;
    const inputId = `formik-file-upload-field-${name}-${instanceCounter}`;

    return (
      <FormikFileUploadBase
        formikApi={api}
        name={name}
        acceptedFileTypes={acceptedFileTypes}
        placeholder={placeholder}
        rawValue={rawValue}
      >
        {fileUploadApi =>
          !iconOnly ? (
            <FormControl
              margin={margin}
              fullWidth={fullWidth}
              onMouseDown={fileUploadApi.onMouseDown}
            >
              <InputLabel htmlFor={inputId}>{label}</InputLabel>

              <InputReadOnlyClickable
                id={inputId}
                type="text"
                value={fileUploadApi.value}
                {...rest}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButtonNoHoverStyled>
                      <InsertDriveFile />
                    </IconButtonNoHoverStyled>
                  </InputAdornment>
                }
              />
            </FormControl>
          ) : (
            <Tooltip title={label}>
              <IconButton onMouseDown={fileUploadApi.onMouseDown}>
                <InsertDriveFile />
              </IconButton>
            </Tooltip>
          )
        }
      </FormikFileUploadBase>
    );
  }
}

const InputReadOnlyClickable = styled(Input).attrs({
  classes: {
    input: "input",
  },
  inputProps: {
    readOnly: true,
  },
})`
  .input {
    cursor: pointer;
  }
`;

const IconButtonNoHoverStyled = styled(IconButton)`
  &:hover {
    background-color: transparent;
  }
`;
