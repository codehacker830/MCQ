import MuiContainer, {
	ContainerProps as MuiContainerProps,
} from "@material-ui/core/Container";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface Props extends OmitStrict<MuiContainerProps, "maxWidth"> {}

/**
 * Centers the page contents and provides horizontal margins.
 */
export function Container(props: Props) {
	const theme = useContext(ThemeContext);

	return (
		<MuiContainer
			{...props}
			maxWidth={theme.app.maxContentWidthBreakpoint}
		/>
	);
}
