import * as yup from "yup";
import { SignupFormValues } from "../types";

const signupFormSchema = yup.object<SignupFormValues>({
	email: yup.string().required("Please enter an email address"),
	password: yup.string().required("Please enter a password"),
	termsAgreed: yup
		.boolean()
		.oneOf([true], "Please agree to the terms of service")
		.required(),
});

export default signupFormSchema;
