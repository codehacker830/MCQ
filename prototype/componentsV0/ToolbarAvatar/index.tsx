import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import React, { SFC } from "react";
import styled from "styled-components";

export interface ToolbarAvatarProps {
  /**
   * User's display name.
   */
  name: string;

  /**
   * One or two letters to use when there is no profile picture available.
   */
  letters?: string;

  /**
   * Profile image url.
   */
  imgSrc?: string;
}

/**
 * Avatar with user's name for use on AppBar.
 */
export const ToolbarAvatar: SFC<ToolbarAvatarProps> = props => {
  const { name, letters, imgSrc } = props;

  return (
    <Wrapper>
      <Avatar className="avatar" alt={imgSrc ? name : undefined} src={imgSrc}>
        {letters}
      </Avatar>
      <Typography className="name" variant="body1" component="span">
        {name}
      </Typography>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 0 ${props => props.theme.spacing(1)}px;
  align-items: center;

  .avatar {
    margin-right: ${props => props.theme.spacing(1)}px;
  }

  .name {
    width: 100%;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
