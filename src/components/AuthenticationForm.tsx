import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Form, Formik, FormikActions } from "formik";
import React from "react";
import { AuthenticationFormButton } from "./AuthenticationFormButton";
import { AuthenticationFormCardActions } from "./AuthenticationFormCardActions";
import { AuthenticationFormCardHeader } from "./AuthenticationFormCardHeader";
import { AuthenticationFormGoogleButton } from "./AuthenticationFormGoogleButton";
import { AuthenticationFormLink } from "./AuthenticationFormLink";
import { AuthenticationFormStatus } from "./AuthenticationFormStatus";
import { AuthenticationFormTerms } from "./AuthenticationFormTerms";
import { AuthenticationFormTextField } from "./AuthenticationFormTextField";
import {
	useValidationSchema,
	ValidationSchema,
	SignupFormValues,
} from "../lib/validation";
import { loadFirebase } from "../lib/util";

const initialValues: SignupFormValues = {
	email: "",
	password: "",
	termsAgreed: false,
};

async function handleSubmit(
	values: SignupFormValues,
	form: FormikActions<SignupFormValues>,
) {
	form.setFieldValue("password", "");
	form.setFieldTouched("password", false);
	try {
		const firebase = await loadFirebase();
		const credential = await firebase
			.auth()
			.createUserWithEmailAndPassword(values.email, values.password);
		const user = credential.user;
		if (!user) throw new Error("Credential did not contain user account.");
		const idToken = await user.getIdToken();

		form.setStatus(null);
	} catch (error) {
		switch (error.code) {
			case "auth/email-already-in-use": {
				form.setStatus("Email address is unavailable.");
				break;
			}

			case "auth/invalid-email": {
				form.setStatus("Please enter a valid email.");
				break;
			}

			case "auth/operation-not-allowed": {
				form.setStatus("Registrations are currently disabled.");
				break;
			}

			case "auth/weak-password": {
				form.setStatus("Please enter a stronger password.");
				break;
			}

			default: {
				form.setStatus("Authentication is temporarily unavailable.");
				// tslint:disable-next-line: no-console
				console.error(error);
				throw error;
			}
		}
	} finally {
		form.setSubmitting(false);
	}
}

// function handleGoogleSignin() {
// 	// const provider = new firebase
// }

export function AuthenticationForm() {
	const schema = useValidationSchema(ValidationSchema.Signin);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={handleSubmit}
		>
			<Card component={(Form as unknown) as "div"}>
				<AuthenticationFormCardHeader
					title="Signup"
					subheader={
						<span>
							Already a Member? <strong>Login</strong>
						</span>
					}
				/>
				<CardContent>
					<AuthenticationFormStatus />
					<AuthenticationFormTextField<SignupFormValues>
						name="email"
						placeholder="Enter Email Address"
						type="email"
					/>
					<AuthenticationFormTextField<SignupFormValues>
						name="password"
						placeholder="Enter Password"
						type="password"
					/>
				</CardContent>
				<AuthenticationFormCardActions>
					<AuthenticationFormTerms<
						SignupFormValues
					> name="termsAgreed" />
					<AuthenticationFormButton type="submit">
						Sign up
					</AuthenticationFormButton>
					<AuthenticationFormGoogleButton>
						Sign up with Google
					</AuthenticationFormGoogleButton>
					<AuthenticationFormLink to="/recover">
						Forgot your password?
					</AuthenticationFormLink>
				</AuthenticationFormCardActions>
			</Card>
		</Formik>
	);
}
