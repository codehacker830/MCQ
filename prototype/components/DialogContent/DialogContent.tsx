// tslint:disable-next-line:import-name
import MuiDialogContent, {
  DialogContentProps as MuiDialogContentProps,
} from "@material-ui/core/DialogContent";
import styled from "styled-components";

export const DialogContent = styled(MuiDialogContent)`
  padding: ${({ theme }) => theme.spacing(2)}px;

  > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`;

export type DialogContentProps = MuiDialogContentProps;
