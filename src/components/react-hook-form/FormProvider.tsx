import React from "react";
import { FormProvider as FormProviderHook, SubmitHandler, UseFormReturn } from "react-hook-form";
import PropTypes from "prop-types";

interface FormProviderProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<any>; // Thay bằng kiểu dữ liệu chính xác của dữ liệu form
  methods: UseFormReturn<any>; // Thay bằng kiểu dữ liệu chính xác của dữ liệu form
}

const FormProvider: React.FC<FormProviderProps> = ({ children, onSubmit, methods }) => {
  return (
    <FormProviderHook {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProviderHook>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormProvider;
