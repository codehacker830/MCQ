import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Field, FieldProps } from "formik";
import React from "react";
import styled from "styled-components";
import { AuthenticationFormLink } from "./AuthenticationFormLink";
import { AuthenticationFormTooltip } from "./AuthenticationFormTooltip";
import { FormValues } from "../lib/validation";

interface Props<V extends FormValues> {
	name: keyof V;
}

export function AuthenticationFormTerms<V extends FormValues>(props: Props<V>) {
	const { name } = props;

	return (
		<Field name={name}>
			{({ field, form }: FieldProps<V>) => (
				<AuthenticationFormTooltip name={name}>
					<StyledFormControlLabel
						{...field}
						disabled={form.isSubmitting}
						control={<StyledCheckbox />}
						label={
							<span>
								I agree to the{" "}
								<AuthenticationFormLink to="/terms-conditions">
									Join Uniform Terms
								</AuthenticationFormLink>
							</span>
						}
					/>
				</AuthenticationFormTooltip>
			)}
		</Field>
	);
}

const StyledFormControlLabel = styled(FormControlLabel)`
	.MuiFormControlLabel-label {
		font-size: 12px;
		user-select: none;
	}

	${({ theme }) => theme.breakpoints.up("md")} {
		.MuiFormControlLabel-label {
			font-size: 14px;
		}
	}
`;

const StyledCheckbox = styled(Checkbox)`
	padding: 0;
	margin-right: 8px;
	border-radius: 0;
`;
