import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel, { FormLabelProps } from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup, { RadioGroupProps } from "@material-ui/core/RadioGroup";
import React, { useState } from "react";
import styled from "styled-components";

interface Props {
	className?: string;
}

const label = "Select Language";

export function LanguageSelect(props: Props) {
	const { className } = props;
	const [language, setLanguage] = useState("english");

	return (
		<StyledFormControl className={className} aria-label={label}>
			<FieldSetWrapper>
				<StyledFormLabel>{label}</StyledFormLabel>

				<StyledRadioGroup
					value={language}
					onChange={(_event, value) => setLanguage(value)}
				>
					<StyledFormControlLabel
						value={"english"}
						control={<StyledRadio color="primary" />}
						label="English"
					/>
					<StyledFormControlLabel
						value={"hindi"}
						control={<StyledRadio color="primary" />}
						label="हिंदी"
					/>
				</StyledRadioGroup>
			</FieldSetWrapper>
		</StyledFormControl>
	);
}

const StyledFormControl = styled(FormControl).attrs((): FormControlProps & {
	component: "fieldset";
} => ({
	component: "fieldset",
	fullWidth: true,
}))`
	color: #fff;
`;

const FieldSetWrapper = styled.div`
	display: flex;
	flex-direction: column;

	${({ theme }) => theme.breakpoints.up("md")} {
		flex-direction: row;
		align-items: center;
		height: 100%;
	}
`;

const StyledFormLabel = styled(FormLabel).attrs((): FormLabelProps & {
	component: "legend";
} => ({ component: "legend" }))`
	color: #fff;
	padding-bottom: 2px;

	&.Mui-focused {
		color: #fff;
	}
`;

const StyledFormControlLabel = styled(FormControlLabel)`
	margin-right: 0;
`;

const StyledRadioGroup = styled(RadioGroup).attrs(
	(): RadioGroupProps => ({ row: true }),
)`
	${StyledFormControlLabel} {
		width: 50%;
	}

	${({ theme }) => theme.breakpoints.up("md")} {
		flex: 1;
		justify-content: space-around;

		@supports (justify-content: space-evenly) {
			justify-content: space-evenly;
		}

		${StyledFormControlLabel} {
			width: auto;
		}
	}
`;

const StyledRadio = styled(Radio)`
	color: #fff;
`;
