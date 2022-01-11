import React from "react";
import type { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";
import { Container, Segment, Header } from "semantic-ui-react";

import { CardForm } from "../components/CardForm";
import { ErrorMessage } from "../components/ErrorMessage";
import { useSelectedCard } from "../context";

export const FormView: FunctionComponent = () => {
  const { data: selectedCard, fetching, error, fetcher } = useSelectedCard();
  const { pathname } = useLocation();

  const isAdd = pathname === "/card/add";
  const showForm = isAdd || (!error && selectedCard !== undefined);

  return (
    <Container>
      {!error && (
        <Segment>
          <Segment>
            <Container textAlign="center">
              <Header>{isAdd ? "Add New Card" : "Edit Card"}</Header>
              {!isAdd && selectedCard && <div>ID: {selectedCard.id}</div>}
              {!isAdd && selectedCard && <div>Created At: {new Date(selectedCard.created_at).toLocaleString()}</div>}
              {!isAdd && selectedCard && <div>Last Edited: {new Date(selectedCard.last_edited).toLocaleString()}</div>}
              {isAdd && <div>Fill in the form and upload an image for a new gift card</div>}
            </Container>
          </Segment>
        </Segment>
      )}
      <Segment loading={fetching} placeholder={!showForm}>
        {showForm && <CardForm />}
        {error && <ErrorMessage error={error} retryFetcher={fetcher} />}
      </Segment>
    </Container>
  );
};
