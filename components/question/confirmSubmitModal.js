import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  selectIsOpenModal,
  submit,
} from "../../redux/slices/question";
import { createUserAPI } from "../../redux/slices/user";
export default function ConfirmSubmitModal(props) {
  const { open, score } = props;
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeModal());
  };

  const onClickConfirmSubmit = () => {
    dispatch(submit());
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Submit</DialogTitle>
      <DialogContent>Supmit test?</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onClickConfirmSubmit}>
          submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
