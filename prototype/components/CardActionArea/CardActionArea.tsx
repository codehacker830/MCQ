import styled from "styled-components";

export const CardActionArea = styled.div`
  ${({ onClick }) => onClick && "cursor: pointer"};
`;
