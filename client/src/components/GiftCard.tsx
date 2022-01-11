import React from "react";
import type { FunctionComponent } from "react";
import { Card, Image, Statistic } from "semantic-ui-react";

import type { IGiftCard } from "../../../shared/types";
import { useHistory } from "react-router-dom";

interface Props {
  card: IGiftCard;
}

const GiftCardBase: FunctionComponent<Props> = ({ card }) => {
  const history = useHistory();

  return (
    <Card onClick={() => history.push(`/card/${card.id}`)}>
      <Image
        src={`${card.image}`}
        ui={false}
        label={{
          as: "span",
          color: "blue",
          content: card.theme,
          ribbon: true,
        }}
      />

      <Card.Content className="gift-card-content">
        <Card.Header>{card.name}</Card.Header>
        <Card.Meta>Created: {new Date(card.created_at).toLocaleString()}</Card.Meta>
        <Card.Meta>Last Edited: {new Date(card.last_edited).toLocaleString()}</Card.Meta>
        <Card.Description>
          {new Date(card.valid_from).toLocaleDateString()} - {new Date(card.valid_until).toLocaleDateString()}
        </Card.Description>
        <Card.Description>
          Value: ${card.min_value} - ${card.max_value}
        </Card.Description>
      </Card.Content>
      <Card.Content className="gift-card-extra" extra>
        <Statistic size="mini">
          <Statistic.Value>{card.purchases}</Statistic.Value>
          <Statistic.Label>Purchases</Statistic.Label>
        </Statistic>
        <Statistic size="mini">
          <Statistic.Value>${card.revenue}</Statistic.Value>
          <Statistic.Label>Revenue</Statistic.Label>
        </Statistic>
      </Card.Content>
    </Card>
  );
};

export const GiftCard = React.memo(GiftCardBase);
