import React, { ReactElement } from "react";
import styled from "styled-components";
import { PageFooter } from "./PageFooter";

type SectionProps = { className?: string };

type LandingPageLayoutProps = {
	className?: string;

	/**
	 * Content to render "above the fold". That is, content to take up the entire
	 * screen height.
	 */
	sectionFoldAboveElement: ReactElement<SectionProps>;

	/**
	 * Addition page content which can be scrolled to.
	 */
	sectionFoldBelowElement?: ReactElement<SectionProps>;
};

const PAGE_FOOTER_HEIGHT = 40;

/**
 * Landing page layout which sets the above the fold content to have a minimum
 * height of the viewport. It adds a sticky footer on tablet viewport size.
 */
export const LandingPageLayout = styled((props: LandingPageLayoutProps) => {
	const {
		className,
		sectionFoldAboveElement,
		sectionFoldBelowElement,
	} = props;

	return (
		<div className={className}>
			{sectionFoldAboveElement}
			{sectionFoldBelowElement}
			<LandingPageLayoutFooter />
		</div>
	);
})`
	display: flex;
	flex-direction: column;
	min-height: 100vh;

	/* Above the fold content should take up entire screen height at a minimum. */
	> *:first-child {
		min-height: 100vh;
	}

	/* On tablet viewport, make room at the bottom for sticky footer. */
	${({ theme }) => theme.breakpoints.up("md")} {
		> *:first-child {
			min-height: calc(100vh - ${PAGE_FOOTER_HEIGHT}px);
		}
	}

	/* If there is content under the fold, remove the bottom margin for the
   * footer. This way, the first page content doesn't have a weird bottom gap.
   */
	${({ sectionFoldBelowElement }) =>
		Boolean(sectionFoldBelowElement) &&
		`
    > *:first-child {
      min-height: 100vh !important;
    }
  `}
`;

const LandingPageLayoutFooter = styled(PageFooter)`
	height: ${PAGE_FOOTER_HEIGHT}px;

	/* Hide the footer on mobile because we use an app like presentation. */
	${({ theme }) => theme.breakpoints.down("sm")} {
		display: none;
	}
`;
