import React from "react";
import type { FunctionComponent } from "react";
import { Message, Icon, Button, Container } from "semantic-ui-react";

interface Props {
  retryFetcher: () => void;
  error: any;
}

export const ErrorMessage: FunctionComponent<Props> = ({ retryFetcher, error }) => {
  return (
    <Message error>
      <Container textAlign="center">
        <Message.Header>Error</Message.Header>
        <Message.Content>{error}</Message.Content>
        <Button icon labelPosition="left" style={{ marginTop: "14px" }} onClick={retryFetcher}>
          <Icon name="redo" />
          Retry
        </Button>
      </Container>
    </Message>
  );
};
