import React, { SFC } from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";

export interface PanelBottomButtonNavProps {
  /**
   * Bold label text and set background color of final button to primary color.
   */
  finalScreenStyle?: boolean;

  /**
   * Optional text label to display to the left of the navigation buttons.
   */
  label?: string;

  /**
   * Whether to display the back button.
   */
  showBackButton: boolean;

  /**
   * Whether to display the next button.
   */
  showNextButton: boolean;

  /**
   * Back button label.
   */
  backButtonLabel: string;

  /**
   * Next button label.
   */
  nextButtonLabel: string;

  onBackButtonClick: () => void;
  onNextButtonClick: () => void;

  className?: string;
}

/**
 * A button navigation panel for docking to the bottom of a page.
 * Contains back and next buttons with optional label text.
 */
export const PanelBottomButtonNav: SFC<PanelBottomButtonNavProps> = props => {
  const {
    finalScreenStyle,
    label,
    showBackButton,
    showNextButton,
    backButtonLabel,
    nextButtonLabel,
    onBackButtonClick,
    onNextButtonClick,
    className,
  } = props;

  return (
    <Wrapper className={className}>
      <Divider />

      <ButtonsWrapper>
        <LabelWrapper>
          {!finalScreenStyle ? (
            <Hidden xsDown implementation="css">
              {label && <Typography variant="body2">{label}</Typography>}
            </Hidden>
          ) : (
            <Typography
              variant="body2"
              style={finalScreenStyle ? { fontWeight: 600 } : undefined}
            >
              {label}
            </Typography>
          )}
        </LabelWrapper>

        {showBackButton && (
          <Button
            className="back"
            variant="contained"
            onClick={onBackButtonClick}
          >
            {backButtonLabel}
          </Button>
        )}

        {showNextButton && (
          <Button
            className={finalScreenStyle ? "final-screen" : "next"}
            variant="contained"
            color="secondary"
            onClick={onNextButtonClick}
          >
            {nextButtonLabel}
          </Button>
        )}
      </ButtonsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.theme.spacing(4)}px;
`;

const LabelWrapper = styled.div`
  flex: 1;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${props => props.theme.spacing(2)}px 0;

  .next {
    color: ${props => props.theme.palette.primary.main};
  }

  .final-screen {
    font-weight: 600;
    letter-spacing: 0.03rem;
  }

  > button {
    text-transform: none;
  }

  > button.next,
  > button.back {
    background-color: #fff;
  }

  > button:last-child {
    margin-left: ${props => props.theme.spacing(2)}px;
  }
`;
