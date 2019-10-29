import TextField, { StandardTextFieldProps } from "@material-ui/core/TextField";
import { Field, FieldProps } from "formik";
import styled from "styled-components";
import { AuthenticationFormTooltip } from "./AuthenticationFormTooltip";
import { FormValues } from "../lib/validation";

interface Props<V extends FormValues> {
	name: keyof V;
	placeholder: string;
	type?: StandardTextFieldProps["type"];
}

/**
 * Material UI `TextField`, styled as a flat square input. It is set to take the
 * full width of the container and removes the default underline style. It also
 * provides an error tooltip.
 */
export function AuthenticationFormTextField<V extends FormValues>(
	props: Props<V>,
) {
	const { name, ...rest } = props;

	return (
		<Field name={name}>
			{({ field, form }: FieldProps<V>) => (
				<AuthenticationFormTooltip name={name}>
					<StyledTextField
						{...rest}
						{...field}
						variant="standard"
						fullWidth
						disabled={form.isSubmitting}
						InputProps={{ disableUnderline: true }}
					/>
				</AuthenticationFormTooltip>
			)}
		</Field>
	);
}

const StyledTextField = styled(TextField)`
	margin: 8px 0;

	.MuiInput-input {
		width: calc(100% - 24px);
		height: inherit;
		padding: 6px 12px;
		font-size: 12px;
		font-weight: 500;
		border: 1px solid #e0e0e0;
		background-color: #fcfcfc;
		transition: ${props =>
			props.theme.transitions.create(["border-color", "box-shadow"])};
	}

	.MuiInput-input:disabled {
		background-color: #eee;
	}

	.MuiInput-input::placeholder {
		color: #828282;
		opacity: 1;
	}

	.MuiInput-input:focus {
		border-color: #f9d017;
		box-shadow: 0 0 0 0.05rem rgba(249, 208, 23, 0.25);
	}
`;
