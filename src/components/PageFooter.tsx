import grey from "@material-ui/core/colors/grey";
import Typography from "@material-ui/core/Typography";
import React from "react";
import styled from "styled-components";

type Props = {
	className?: string;
};

// Make sure the copyright date is always up to date.
const currentYear = new Date().getFullYear();
const copyrightYear =
	process.env.NODE_ENV === "test"
		? // In testing environment, use a static value so snapshot test doesn't
		  // fail in the future.
		  "2019"
		: // Ensure a minimum year is displayed in case of misconfigured computer
		  // date.
		  (currentYear < 2019 ? 2019 : currentYear).toString();

/**
 * Page copyright notice.
 */
export const PageFooter = styled((props: Props) => {
	const { className } = props;

	return (
		<footer className={className}>
			<Typography variant="caption" color="inherit">
				Copyright : Eduphilic Consultancy Pvt Ltd {copyrightYear}
			</Typography>
		</footer>
	);
})`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: auto;
	color: ${grey[50]};
	background-color: ${grey[900]};
`;
