import { Schema } from "yup";
import { useMemo } from "react";

/**
 * The methods of a Yup schema which are called by Formik.
 */
interface SchemaLike extends Pick<Schema<any>, "validateAt" | "validate"> {}

export enum ValidationSchema {
	Signin = "Signin",
}

/**
 * Returns the Yup validation schema for the specified form. It does this using
 * an asynchronous import to prevent Yup from being bundled unnecessarily.
 *
 * @param form The form whose schema should be returned.
 */
export function useValidationSchema(form: ValidationSchema) {
	return useMemo((): SchemaLike => {
		const getSchema = async () => {
			let schemaMod: Promise<{ default: Schema<any> }>;

			switch (form) {
				case ValidationSchema.Signin: {
					schemaMod = import("./schemas/signupFormSchema");
					break;
				}

				default: {
					throw new Error("Unrecognized schema.");
				}
			}

			return schemaMod;
		};

		return {
			validate: async (...args) => {
				const mod = await getSchema();
				const schema = mod.default;
				return await schema.validate(...args);
			},
			validateAt: async (...args) => {
				const mod = await getSchema();
				const schema = mod.default;
				return await schema.validateAt(...args);
			},
		};
	}, [form]);
}
