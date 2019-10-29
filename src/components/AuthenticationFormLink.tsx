import { FormikConsumer } from "formik";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

type Props = {
	children: string;
	to: string;
};

export function AuthenticationFormLink(props: Props) {
	const { children, to } = props;

	return (
		<FormikConsumer>
			{form =>
				form.isSubmitting ? (
					<StyledSpan>{children}</StyledSpan>
				) : (
					<Link href={to} passHref>
						<StyledA>{children}</StyledA>
					</Link>
				)
			}
		</FormikConsumer>
	);
}

const StyledSpan = styled.span`
	color: rgba(0, 0, 0, 0.38);
`;

const StyledA = styled.a`
	color: #0061ff;
	text-decoration: none;

	:hover {
		text-decoration: underline;
	}
`;
