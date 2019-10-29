import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import ArrowIcon from "@material-ui/icons/ArrowDropUp";
import { Field, FieldProps, FormikErrors } from "formik";
import React, { ConsumerProps, ReactNode } from "react";
import styled from "styled-components";
import { FormValues } from "../lib/validation";

interface Props<V extends FormValues> {
	children: TooltipProps["children"];
	name: keyof V;
}

export function AuthenticationFormTooltip<V extends FormValues>(
	props: Props<V>,
) {
	const { children, name } = props;

	return (
		<TooltipClassProvider>
			{tooltipClass => (
				<Field name={name}>
					{({ form }: FieldProps<V>) => (
						<Tooltip
							open={!!form.errors[name] && !!form.touched[name]}
							title={<Title>{form.errors[name]}</Title>}
							classes={{ tooltip: tooltipClass }}
							placement="bottom-end"
							disableFocusListener
							disableHoverListener
							disableTouchListener
							TransitionComponent={NoopTransition}
						>
							{children}
						</Tooltip>
					)}
				</Field>
			)}
		</TooltipClassProvider>
	);
}

const TooltipClassProvider = styled(
	({
		children,
		className,
	}: ConsumerProps<string> & { className?: string }) => (
		<>{children(className!)}</>
	),
)`
	margin-top: 8px;
	color: #000;
	background-color: #fff;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
`;

const StyledArrowIcon = styled(ArrowIcon)`
	position: absolute;
	right: -6px;
	top: -6px;
	color: #ff0000;
`;

function Title<V extends FormValues>(props: {
	children?: FormikErrors<V>[keyof V];
}) {
	const { children } = props;

	return (
		<>
			{children}
			<StyledArrowIcon />
		</>
	);
}

/**
 * Removes the default Tooltip `Transition` component to avoid `StrictMode`
 * warning message.
 */
function NoopTransition(props: TransitionProps & { children?: ReactNode }) {
	const { children } = props;

	return <>{children}</>;
}
