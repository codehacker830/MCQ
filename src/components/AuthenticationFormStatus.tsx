import Typography from "@material-ui/core/Typography";
import { FormikConsumer } from "formik";
import React from "react";

export function AuthenticationFormStatus() {
	return (
		<FormikConsumer>
			{form => (
				<Typography variant="subtitle2">
					{form.status && form.status}
				</Typography>
			)}
		</FormikConsumer>
	);
}
