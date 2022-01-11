import React from "react";
import type { FunctionComponent } from "react";
import { Button, Modal, Icon } from "semantic-ui-react";

interface Props {
  editing: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
}

export const ConfirmModal: FunctionComponent<Props> = ({ editing, open, setOpen, onConfirm }) => {
  function handleConfirm() {
    setOpen(false);
    onConfirm();
  }

  return (
    <Modal open={open} centered={false}>
      <Modal.Header>Confirm Gift Card {editing && "Edit"}</Modal.Header>
      <Modal.Content>Are you sure you want to {editing ? "edit" : "add"} this card?</Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} negative>
          Cancel
        </Button>
        <Button labelPosition="right" icon onClick={handleConfirm} positive>
          {editing ? "Edit" : "Add"} Card
          <Icon name="checkmark" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
