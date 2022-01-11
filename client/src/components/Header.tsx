import React from "react";
import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Button, Image, Header as SUIHeader } from "semantic-ui-react";

import { useWindowSize } from "../hooks";

export const Header: FunctionComponent = () => {
  const { width } = useWindowSize();

  return (
    <Menu as="header" size="large">
      {width > 980 && (
        <Menu.Item position="left">
          <Link to="/">
            <Image src="static/logo.png" size="tiny" />
          </Link>
        </Menu.Item>
      )}
      <Menu.Item className="header-title">
        <SUIHeader as="h2">Gift Card Dashboard</SUIHeader>
      </Menu.Item>
      {width > 980 && (
        <Menu.Item position="right">
          <Button animated negative>
            <Button.Content visible>Log Out</Button.Content>
            <Button.Content hidden>
              <Icon name="log out" />
            </Button.Content>
          </Button>
        </Menu.Item>
      )}
    </Menu>
  );
};
