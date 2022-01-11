import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

import type { IGiftCard } from "../../shared/types";

interface FetchedState<T> {
  data: T;
  fetching: boolean;
  error: any;
  fetcher: () => void;
}

function createFetchedContext<T>(defaultValue: T) {
  return createContext<FetchedState<T>>({
    data: defaultValue,
    fetching: false,
    error: undefined,
    fetcher: () => undefined,
  });
}

const CardsContext = createFetchedContext<IGiftCard[]>([] as IGiftCard[]);

export const CardsContextProvider: FunctionComponent = ({ children }) => {
  const cardsData = useFetch<IGiftCard[]>("cards", []);

  return <CardsContext.Provider value={cardsData}>{children}</CardsContext.Provider>;
};

export function useCards() {
  const context = useContext(CardsContext);

  if (context === undefined) {
    throw new Error("useCards must be inside a CardsContextProvider");
  }
  return context;
}

const SelectedCardContext = createFetchedContext<IGiftCard | undefined>(undefined);

interface CardParams {
  cardId: string;
}

export const SelectedCardProvider: FunctionComponent = ({ children }) => {
  const { cardId } = useParams<CardParams>();
  const selectedCardData = useFetch<IGiftCard | undefined>(`card/${cardId}`, undefined, cardId !== undefined);

  return <SelectedCardContext.Provider value={selectedCardData}>{children}</SelectedCardContext.Provider>;
};

export function useSelectedCard() {
  const context = useContext(SelectedCardContext);

  if (context === undefined) {
    throw new Error("useSelectedCard must be inside a SelectedCardProvider");
  }
  return context;
}

function useFetch<T>(endpoint: string, defaultValue: T, allowFetch = true) {
  const [data, setData] = useState<T>(defaultValue);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<any>(undefined);

  const fetcher = useCallback(async () => {
    setFetching(true);
    setError(undefined);
    try {
      const response = await fetch(`/api/${endpoint}`);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setError(undefined);
      } else {
        setData(defaultValue);
        setError(`${response.statusText}: ${await response.text()}`);
      }
    } catch (ex) {
      console.error(ex);
      setData(defaultValue);
      setError(ex);
    } finally {
      setFetching(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (allowFetch) {
      fetcher();
    }
  }, [allowFetch, fetcher]);

  return { data, fetching, error, fetcher };
}
