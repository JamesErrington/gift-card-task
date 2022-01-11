import React from "react";
import type { FunctionComponent } from "react";

import { Controls } from "../components/Controls";
import { CardGrid } from "../components/CardGrid";

export const MainView: FunctionComponent = () => {
  return (
    <div>
      <Controls />
      <CardGrid />
    </div>
  );
};
