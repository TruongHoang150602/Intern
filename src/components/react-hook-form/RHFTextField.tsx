import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller, FieldValues } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface RHFTextFieldProps {
  name: string;
}

const RHFTextField: React.FC<RHFTextFieldProps & TextFieldProps> = ({ name, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
      )}
    />
  );
};

RHFTextField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default RHFTextField;
