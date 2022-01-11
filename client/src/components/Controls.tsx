import React from "react";
import type { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { Menu, Icon, Container } from "semantic-ui-react";

import { useCards } from "../context";

export const Controls: FunctionComponent = () => {
  const history = useHistory();
  const { fetcher } = useCards();
  // TODO: Add more controls like filtering, sorting, changing the display mode (grid vs list)
  return (
    <Container textAlign="center">
      <Menu icon="labeled" compact>
        <Menu.Item onClick={() => history.push("/card/add")}>
          <Icon name="add" />
          Add Gift Card
        </Menu.Item>
        <Menu.Item onClick={fetcher}>
          <Icon name="redo" />
          Refresh Cards
        </Menu.Item>
      </Menu>
    </Container>
  );
};
