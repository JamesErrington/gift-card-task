import { IGiftCard } from "../../../shared/types";

interface State {
  name: string;
  validFrom: string;
  validUntil: string;
  minValue: string;
  maxValue: string;
  theme: string;
  image: File | null;
  submitting: boolean;
  success: boolean;
  error?: any;
}

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_VALID_FROM"; payload: string }
  | { type: "SET_VALID_UNTIL"; payload: string }
  | { type: "SET_MIN_VALUE"; payload: string }
  | { type: "SET_MAX_VALUE"; payload: string }
  | { type: "SET_THEME"; payload: string }
  | { type: "SET_IMAGE"; payload: File }
  | { type: "SUBMITTING_START" }
  | { type: "SUBMITTING_SUCCESS" }
  | { type: "SUBMITTING_ERROR"; payload: any }
  | { type: "LOAD_CARD"; payload: IGiftCard };

export const initialFormState: State = {
  name: "",
  validFrom: "",
  validUntil: "",
  minValue: "",
  maxValue: "",
  theme: "",
  image: null,
  submitting: false,
  success: false,
  error: undefined,
};

export function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_NAME": {
      return { ...state, name: action.payload };
    }
    case "SET_VALID_FROM": {
      return { ...state, validFrom: action.payload };
    }
    case "SET_VALID_UNTIL": {
      return { ...state, validUntil: action.payload };
    }
    case "SET_MIN_VALUE": {
      return { ...state, minValue: action.payload };
    }
    case "SET_MAX_VALUE": {
      return { ...state, maxValue: action.payload };
    }
    case "SET_THEME": {
      return { ...state, theme: action.payload };
    }
    case "SET_IMAGE": {
      return { ...state, image: action.payload };
    }
    case "SUBMITTING_START": {
      return { ...state, submitting: true, success: false, error: undefined };
    }
    case "SUBMITTING_SUCCESS": {
      return { ...initialFormState, success: true };
    }
    case "SUBMITTING_ERROR": {
      return { ...state, submitting: false, success: false, error: action.payload };
    }
    case "LOAD_CARD": {
      const card = action.payload;

      return {
        ...initialFormState,
        name: card.name,
        validFrom: card.valid_from.split("T")[0],
        validUntil: card.valid_until.split("T")[0],
        minValue: card.min_value,
        maxValue: card.max_value,
        theme: card.theme,
        image: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type ${(action as any).type}`);
    }
  }
}
