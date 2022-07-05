import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { StyleProp, TextInputProps, TextStyle } from 'react-native';
import { Input } from '@/components/common/Input';

interface FormInputProps extends TextInputProps {
  label?: string;
  name: string;
  rules: object;
  defaultValue: string;
  secureTextEntry?: boolean;
  isRequired?: boolean;
  inputMarginBottom?: number;
  backendError?: string;
  style?: StyleProp<TextStyle>;
  mutation?: any;
}

export default function FormInput({
  label,
  name,
  rules,
  defaultValue,
  secureTextEntry,
  isRequired = false,
  inputMarginBottom,
  backendError,
  style,
  mutation,
  ...inputProps
}: FormInputProps) {
  const formContext = useFormContext();
  const { control } = formContext;
  const { errors } = formContext.formState;

  const { field } = useController({ name, control, rules, defaultValue });

  return (
    <Input
      {...inputProps}
      label={label}
      error={errors[name]?.message}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      secureTextEntry={secureTextEntry}
      backendError={backendError}
      isRequired={isRequired}
      inputMarginBottom={inputMarginBottom}
      value={field.value}
      style={style}
      mutation={mutation}
    />
  );
}
