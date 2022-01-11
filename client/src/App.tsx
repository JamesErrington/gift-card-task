import React from "react";
import type { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";

import { MainView } from "./views/Main";
import { FormView } from "./views/Form";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CardsContextProvider, SelectedCardProvider } from "./context";

export const App: FunctionComponent = () => {
  return (
    <div className="app">
      <div className="main">
        <Header />
        <main>
          <CardsContextProvider>
            <Switch>
              <Route exact path="/card/add">
                <FormView />
              </Route>
              <Route exact path="/card/:cardId">
                <SelectedCardProvider>
                  <FormView />
                </SelectedCardProvider>
              </Route>
              <Route path="/">
                <MainView />
              </Route>
            </Switch>
          </CardsContextProvider>
        </main>
      </div>
      <Footer />
    </div>
  );
};
