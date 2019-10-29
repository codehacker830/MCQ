import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import AttachMoney from "@material-ui/icons/AttachMoney";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import React, { ReactNode, SFC } from "react";
import styled from "styled-components";
import { Button, ButtonProps } from "../../components/Button";
import { Card } from "../../components/Card";
import { CardContent } from "../../components/CardContent";
import { CardHeader } from "../../components/CardHeader";
import { RupeeFontSpan } from "../../components/RupeeFontSpan";
import { Typography } from "../../components/Typography";
import { ContentCut } from "../../icons";

export const PaymentPage = () => (
  <>
    <Card>
      <CardHeader title="Order Summary" subheader="Order No: 17238351" />
      <CardContent>
        <Typography variant="H6" paragraph>
          Your Items
        </Typography>

        {[
          "Soldier GD 30 Mock Tests",
          "Soldier Tech 30 Mock Tests",
          "Soldier RT 30 Mock Tests",
        ].map(categoryTitle => (
          <Grid key={categoryTitle} container>
            <Grid item xs={12} md={6}>
              <CategoryButton fullWidth onClick={() => alert("Update basket")}>
                {categoryTitle}
              </CategoryButton>
            </Grid>
          </Grid>
        ))}
      </CardContent>
      <CardContent>
        <Typography variant="H6" paragraph>
          Offers &amp; Discount
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Coupon Code"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button color="blue" style={{ textTransform: "uppercase" }}>
                      Apply
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CouponBox>Apply WEB10 to instantly get 10% discount</CouponBox>
          </Grid>
        </Grid>

        <LineSummary
          topMargin
          leftNode="Sub Total"
          rightNode={
            <span>
              <RupeeFontSpan>A</RupeeFontSpan>
              399
            </span>
          }
        />
        <LineSummary
          leftNode="Coupon Discount"
          rightNode={
            <span>
              <RupeeFontSpan>A</RupeeFontSpan>0
            </span>
          }
        />

        <Grid container style={{ margin: "16px 0" }}>
          <Grid item xs={12} md={4}>
            <Divider />
          </Grid>
        </Grid>

        <LineSummary
          bold
          leftNode="Total Amount"
          rightNode={
            <span>
              <RupeeFontSpan>A</RupeeFontSpan>
              399
            </span>
          }
        />
      </CardContent>
    </Card>

    <Card>
      <CardHeader title="Select Payment Method" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5} lg={4}>
            <StyledList>
              {[
                "Debit/Credit Card",
                "NetBanking",
                "Wallets",
                "Pay with UPI",
              ].map((title, index) => (
                <StyledListItem key={title} selected={index === 0}>
                  <ListItemIcon>
                    <AttachMoney />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        style={{ color: index === 0 ? "#2d9cdb" : undefined }}
                      >
                        {title}
                      </Typography>
                    }
                    disableTypography
                  />
                </StyledListItem>
              ))}
            </StyledList>
          </Grid>

          <Grid item xs={12} md={7} lg={8} style={{ minHeight: 500 }}>
            <Typography>Payment Processor Iframe</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </>
);

const CategoryButton = styled(
  ({
    children,
    ...rest
  }: ButtonProps & {
    children: string;
  }) => (
    <Button {...rest}>
      {children}
      <span className="icon-wrapper">
        <RemoveCircle />
      </span>
    </Button>
  ),
)`
  justify-content: flex-start;

  /* Line up with left side card content */
  width: calc(100% + 16px);
  margin-left: -16px;

  .icon-wrapper {
    flex: 1;
    display: inline-flex;
    justify-content: flex-end;
    color: ${({ theme }) => theme.palette.error.main};
  }
`;

const CouponBox = styled((props: { className?: string; children: string }) => (
  <div className={props.className}>
    <span className="icon">
      <ContentCut />
    </span>
    <div className="box">
      <Typography variant="Subtitle2">{props.children}</Typography>
      <Button color="blue">USE</Button>
    </div>
  </div>
))`
  position: relative;
  width: 100%;
  height: 56px;

  .box {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: ${({ theme }) => theme.spacing(1)}px;
    padding-left: ${({ theme }) => theme.spacing(2)}px;
    border: 2px dashed #eee;
    background-color: #fff;
  }

  .icon {
    position: absolute;
    top: -12px;
    left: -12px;
  }
`;

const LineSummary: SFC<{
  topMargin?: boolean;
  bold?: boolean;
  leftNode: ReactNode;
  rightNode: ReactNode;
}> = props => (
  <Grid container style={{ marginTop: props.topMargin ? 32 : 16 }}>
    <Grid item xs={12} md={6}>
      <Grid container>
        <Grid item xs>
          <Typography style={{ fontWeight: props.bold ? 500 : undefined }}>
            {props.leftNode}
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ fontWeight: props.bold ? 500 : undefined }}>
            {props.rightNode}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const StyledList = styled(List)`
  height: 100%;
  background-color: #f9f9f9;
`;

const StyledListItem = styled((props: ListItemProps<"div">) => (
  <ListItem {...props} button classes={{ selected: "selected" }} />
))`
  &.selected {
    background-color: #fff;
  }
`;
