export interface DashboardFormDialogFieldConfig {
  /**
   * Field type, used to render the proper input component for the field.
   */
  inputType: "text" | "text-autocomplete" | "number" | "file-upload";

  /**
   * Label for the input.
   */
  inputLabel: string;

  /**
   * Placeholder text for input.
   */
  placeholder?: string;

  /**
   * Autocomplete suggestions.
   */
  suggestions?: string[];

  /**
   * Accepted file upload types.
   *
   * Use `image/*` for any image type (allows a mobile device to allow a user
   * to take a picture).
   */
  acceptedFileTypes?: string;
}
