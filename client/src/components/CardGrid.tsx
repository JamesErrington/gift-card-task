import React, { useMemo, useState } from "react";
import type { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { Segment, Card, Pagination, Container, Header, Icon, Button } from "semantic-ui-react";

import { GiftCard } from "./GiftCard";
import { ErrorMessage } from "./ErrorMessage";
import { useCards } from "../context";
import { useWindowSize } from "../hooks";

const ROWS = 2;
// TODO: Paginate properly on the server side and not on the front end
function chunkArray<T>(array: T[], chunkSize: number) {
  const output = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    output.push(array.slice(i, i + chunkSize));
  }
  return output;
}

function getCardsPerRow(width: number) {
  if (width < 760) {
    return 1;
  }
  if (width < 1100) {
    return 2;
  }
  if (width < 1660) {
    return 4;
  }
  return 8;
}

export const CardGrid: FunctionComponent = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const { data: cards, fetching, error } = useCards();
  const { width } = useWindowSize();
  const showPlaceholder = cards.length === 0 || error;

  const cardsPerRow = getCardsPerRow(width);
  const pages = useMemo(() => chunkArray(cards, ROWS * cardsPerRow), [cardsPerRow, cards]);

  return (
    <Container className="card-grid-container" textAlign="center" fluid>
      <Segment placeholder={showPlaceholder} loading={fetching}>
        {showPlaceholder ? (
          <PlaceholderGrid error={error} fetching={fetching} />
        ) : (
          <Card.Group itemsPerRow={cardsPerRow}>
            {pages[pageIndex].map(card => (
              <GiftCard key={card.id} card={card} />
            ))}
          </Card.Group>
        )}
      </Segment>
      <Pagination
        activePage={pageIndex + 1}
        totalPages={pages.length}
        onPageChange={(_, data) => setPageIndex(Number(data.activePage) - 1)}
      />
    </Container>
  );
};

interface PlaceholderGridProps {
  error: any;
  fetching: boolean;
}

const PlaceholderGrid: FunctionComponent<PlaceholderGridProps> = ({ error, fetching }) => {
  const history = useHistory();
  const { fetcher } = useCards();

  let content = <></>;
  if (error) {
    content = <ErrorMessage error={error} retryFetcher={fetcher} />;
  } else if (fetching === false) {
    content = (
      <>
        <Header icon>
          <Icon name="credit card" />
          No Gift Cards found
        </Header>
        <Button onClick={() => history.push("/card/add")} primary>
          Add Gift Card
        </Button>
      </>
    );
  }

  return <Container>{content}</Container>;
};
