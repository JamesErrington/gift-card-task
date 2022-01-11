import React from "react";
import type { FunctionComponent } from "react";
import { Segment, List, Icon } from "semantic-ui-react";

export const Footer: FunctionComponent = () => {
  return (
    <Segment className="footer" as="footer" textAlign="center" inverted>
      <List inverted>
        <List.Item>
          <List.Content>
            <Icon name="copyright outline" />
            2022 James Errington
          </List.Content>
        </List.Item>
        <List.Item as="a" href="https://github.com/JamesErrington" target="_blank" rel="noopener noreferrer">
          <List.Content>
            <List.Icon name="github" inverted />
            GitHub
          </List.Content>
        </List.Item>
        <List.Item as="a" href="mailto:james.errington+amextask@protonmail.com" target="_blank" rel="noopener noreferrer">
          <List.Content>
            <List.Icon name="mail" style={{ color: "white" }} /> Contact me
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  );
};
