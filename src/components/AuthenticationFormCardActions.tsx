import CardActions from "@material-ui/core/CardActions";
import styled from "styled-components";

export const AuthenticationFormCardActions = styled(CardActions)`
	flex-direction: column;
	align-items: flex-start;
	padding: 8px 16px 16px 16px;

	> * {
		margin-left: 0;
	}

	> *:not(:last-child) {
		margin-bottom: 16px;
	}
`;
