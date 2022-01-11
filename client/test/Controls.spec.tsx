import React from "react";
import { Router } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";

import { Controls } from "../src/components/Controls";
// Basic example test
describe("Controls", () => {
  it("should navigate to the add card page when the add card button is pressed", () => {
    const history = createMemoryHistory();

    const { queryByText } = render(
      <Router history={history}>
        <Controls />
      </Router>,
    );

    expect(history.location.pathname).toBe("/");

    const button = queryByText("Add Gift Card");
    fireEvent.click(button as HTMLElement);

    expect(history.location.pathname).toBe("/card/add");
  });
});
