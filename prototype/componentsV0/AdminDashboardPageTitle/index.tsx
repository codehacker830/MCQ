import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

/**
 * Material UI Typography element with large bottom margin for use on pages in
 * the admin dashboard.
 */
export const AdminDashboardPageTitle = styled(Typography).attrs({
  variant: "h4",
})`
  margin-bottom: ${({ theme }) => theme.spacing(8)}px;
`;
