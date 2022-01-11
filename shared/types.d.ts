export interface IGiftCard {
  id: string;
  created_at: string;
  last_edited: string;
  name: string;
  image: string;
  min_value: string;
  max_value: string;
  theme: string;
  valid_from: string;
  valid_until: string;
  purchases: number;
  revenue: number;
}
