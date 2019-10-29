import styled from "styled-components";

export const PageContentWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 16px 8px;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    padding: 16px;
  }
`;

PageContentWrapper.displayName = "PageContentWrapper";
