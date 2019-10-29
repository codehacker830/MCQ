import Typography from "@material-ui/core/Typography";
import { ComponentType, Fragment } from "react";
import styled from "styled-components";

/**
 * Displays a banner along the right side of the screen when the application is
 * using the staging server Firebase credentials.
 */
export let StagingEnvironmentBanner: ComponentType;

if (process.env.FIREBASE_APP_CONFIG.type === "staging") {
	const height = 16;

	const StagingEnvironmentBannerBar = styled.div`
		display: flex;
		align-items: center;
		position: fixed;
		right: ${height}px;
		top: 0;
		width: 100vh;
		height: ${height}px;
		background-color: rgba(255, 0, 0, 0.2);
		transform: rotate(-90deg);
		transform-origin: top right;
		overflow: hidden;
	`;

	const StyledTypography = styled(Typography)`
		flex-shrink: 0;
		margin-right: 32px;
		color: #fff;
		font-size: 14px;
		font-weight: 600;
	`;

	const labels = Array.from({ length: 10 }, (_item, index) => (
		<StyledTypography key={index}>Staging Environment</StyledTypography>
	));

	StagingEnvironmentBanner = () => (
		<StagingEnvironmentBannerBar>{labels}</StagingEnvironmentBannerBar>
	);
} else {
	StagingEnvironmentBanner = Fragment;
}
