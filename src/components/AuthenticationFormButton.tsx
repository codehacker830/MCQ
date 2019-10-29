import Button, { ButtonProps } from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";
import { FormikConsumer } from "formik";
import styled from "styled-components";

type Props = OmitStrict<ButtonProps, "disabled" | "variant" | "fullWidth">;

export function AuthenticationFormButton(props: Props) {
	return (
		<FormikConsumer>
			{form => (
				<StyledButton
					{...props}
					variant="contained"
					fullWidth
					disabled={form.isSubmitting}
				/>
			)}
		</FormikConsumer>
	);
}

const StyledButton = styled(Button)`
	height: 40px;
	padding: 8px 32px;
	background-color: ${grey[50]};
	font-size: 12px;

	:hover {
		background-color: ${grey[200]};
	}
`;
