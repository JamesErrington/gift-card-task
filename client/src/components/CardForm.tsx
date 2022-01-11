import React, { useReducer, useMemo, useState, useEffect, useRef } from "react";
import type { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { Form, Message } from "semantic-ui-react";

import { ImageUpload } from "./ImageUpload";
import { ConfirmModal } from "./ConfirmModal";
import { formReducer, initialFormState } from "../reducers/form";
import { useCards, useSelectedCard } from "../context";

function generateFormData(data: Record<string, any>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }

  return formData;
}

export const CardForm: FunctionComponent = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [{ name, validFrom, validUntil, minValue, maxValue, theme, image, submitting, success, error }, dispatch] =
    useReducer(formReducer, initialFormState);
  const { data: cards, fetcher: fetchCards } = useCards();
  const { data: selectedCard, fetcher: fetchSelectedCard } = useSelectedCard();
  const history = useHistory();
  const successRef = useRef(success);

  const editing = selectedCard !== undefined;

  useEffect(() => {
    if (editing) {
      dispatch({ type: "LOAD_CARD", payload: selectedCard });
    }
  }, [editing, selectedCard]);

  function handleSubmit() {
    setConfirmOpen(true);
  }

  async function handleConfirm() {
    dispatch({ type: "SUBMITTING_START" });
    successRef.current = false;

    try {
      const formDataValues: Record<string, any> = { name, validFrom, validUntil, minValue, maxValue, theme, image };
      if (editing) {
        formDataValues.id = selectedCard.id;
      }
      const formData = generateFormData(formDataValues);

      const endpoint = `/api/card/${editing ? selectedCard.id : "add"}`;
      const response = await fetch(endpoint, { method: "POST", body: formData });

      if (response.ok) {
        dispatch({ type: "SUBMITTING_SUCCESS" });
        fetchCards();
        if (editing) {
          successRef.current = true;
          fetchSelectedCard();
        }
      } else {
        dispatch({ type: "SUBMITTING_ERROR", payload: `${response.statusText}: ${await response.text()}` });
      }
    } catch (ex) {
      console.log(ex);
      dispatch({ type: "SUBMITTING_ERROR", payload: ex });
    }
  }
  // TODO: Validate on the server side as well as the client
  const isNameValid = name.length > 0;
  const isValidFromValid = validFrom.length > 0;
  const isValidUntilValid = isValidFromValid && validUntil.length > 0 && new Date(validFrom) < new Date(validUntil);
  const isMinValueValid = Number(minValue) > 0;
  const isMaxValueValid = Number(maxValue) > 0 && Number(minValue) <= Number(maxValue);
  const isThemeValid = theme.length > 0;
  const isImageValid = image != null || selectedCard?.image;
  const isButtonDisabled = [
    isNameValid,
    isValidFromValid,
    isValidUntilValid,
    isMinValueValid,
    isMaxValueValid,
    isThemeValid,
    isImageValid,
  ].some(value => value === false);
  const themeOptions = useMemo(
    () => Array.from(new Set(cards.map(card => card.theme))).map(value => <option key={value} value={value} />),
    [cards],
  );

  return (
    <Form loading={submitting} error={error ? true : false} success={(editing && successRef.current) || success}>
      <ConfirmModal editing={editing} open={confirmOpen} setOpen={setConfirmOpen} onConfirm={handleConfirm} />
      <FormMessage editing={editing} errorMessage={error} />
      <div className="add-card-form-inputs-container">
        <div className="add-card-form-inputs">
          <Form.Input
            label="Name"
            type="text"
            placeholder="Name of gift card"
            value={name}
            error={!isNameValid && "Please enter a name"}
            onChange={event => dispatch({ type: "SET_NAME", payload: event.target.value })}
          />
          <Form.Group widths="equal">
            <Form.Input
              label="Valid From"
              type="date"
              value={validFrom}
              error={!isValidFromValid && "Please enter a valid start date"}
              onChange={event => dispatch({ type: "SET_VALID_FROM", payload: event.target.value })}
            />
            <Form.Input
              label="Valid Until"
              type="date"
              value={validUntil}
              error={!isValidUntilValid && "Please enter a valid end date"}
              onChange={event => dispatch({ type: "SET_VALID_UNTIL", payload: event.target.value })}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Min Value ($)"
              type="number"
              value={minValue}
              error={!isMinValueValid && "Please enter a valid minimum value"}
              onChange={event => dispatch({ type: "SET_MIN_VALUE", payload: event.target.value })}
            />
            <Form.Input
              label="Max Value ($)"
              type="number"
              value={maxValue}
              error={!isMaxValueValid && "Please enter a valid maximum value"}
              onChange={event => dispatch({ type: "SET_MAX_VALUE", payload: event.target.value })}
            />
          </Form.Group>
          <Form.Input
            list="card-themes-list"
            placeholder="Select theme"
            value={theme}
            error={!isThemeValid && "Please enter a theme"}
            onChange={event => dispatch({ type: "SET_THEME", payload: event.target.value })}
          />
          <datalist id="card-themes-list">{themeOptions}</datalist>
          <Form.Group style={{ justifyContent: "space-between" }}>
            <Form.Button id="home-button" onClick={() => history.push("/")}>
              Back
            </Form.Button>
            <Form.Button id="upload-button" disabled={isButtonDisabled} onClick={handleSubmit} positive>
              {selectedCard ? "Update Card" : "Add Card"}
            </Form.Button>
          </Form.Group>
        </div>
        <div className="add-card-form-image-upload">
          <ImageUpload
            editing={editing}
            src={selectedCard?.image}
            file={image}
            onFileUpload={file => dispatch({ type: "SET_IMAGE", payload: file })}
          />
        </div>
      </div>
    </Form>
  );
};

interface FormMessageProps {
  editing: boolean;
  errorMessage?: string;
}

const FormMessage: FunctionComponent<FormMessageProps> = ({ editing, errorMessage }) => {
  return (
    <div className="form-message-container">
      <Message success>
        <Message.Header>Success</Message.Header>
        <Message.Content>{editing ? "Card edited successfully" : "New card added successfully"}</Message.Content>
      </Message>
      <Message error>
        <Message.Header>Error</Message.Header>
        <Message.Content>{errorMessage}</Message.Content>
      </Message>
    </div>
  );
};
