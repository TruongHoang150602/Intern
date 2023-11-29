import React, { forwardRef } from "react";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input::placeholder": {
    color: "#007AFF",
    fontWeight: "600",
    opacity: "1",
    fontSize: "16px",
  },
});

const RHFTextField = forwardRef((props, ref) => {
  const { name, control, label, rules, ...rest } = props;

  const {
    field: { ref: inputRef, ...inputProps },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <StyledTextField
      label={label}
      fullWidth
      inputRef={(inputElement) => {
        inputRef(inputElement);
        if (ref) {
          if (typeof ref === "function") {
            ref(inputElement);
          } else if (ref.hasOwnProperty("current")) {
            ref.current = inputElement;
          }
        }
      }}
      error={!!error}
      helperText={error && error.message}
      {...inputProps}
      {...rest}
    />
  );
});

RHFTextField.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
};

export default RHFTextField;
