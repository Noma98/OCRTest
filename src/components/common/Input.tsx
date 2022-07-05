import React, { Dispatch, SetStateAction } from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';

import Button from '@/components/common/Button';
import ErrorMessage from '@/components/common/ErrorMessage';
import FlexWrap from '@/components/common/FlexWrap';
import { isAndroid } from '@/utils/check';

const Wrapper = styled.View<{ inputMarginBottom: number }>`
  margin: 0 0 ${props => props.inputMarginBottom}px;
  width: 100%;
`;

interface ITextInput {
  isError: boolean;
  isEditable: boolean;
}

const StyledInput = styled.TextInput<ITextInput>`
  font-size: 15px;
  border: 1px solid #cbccce;
  border-color: ${props => (props.isError ? 'red' : '#cbccce')};
  border-width: 1px;
  padding: ${isAndroid() ? '10px 14px' : '15px 14px'};
  margin: ${props => (props.isError ? '0 0 8px' : '0')};
  border-radius: 4px;
  background-color: ${props => (props.isEditable ? '#fff' : '#f5f6f7')};
`;

const LabelWrapper = styled.View`
  flex-direction: row;
`;

const RequiredDot = styled.Text`
  color: #ff5239;
  margin-left: 2px;
`;

const Label = styled.Text`
  color: gray;
  font-size: 16px;
  font-weight: 400;
  color: black;
  margin: 0 0 12px;
`;

const StyledInputWithBtn = styled(StyledInput)`
  flex: 1;
`;
interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  inputMarginBottom?: number;
  isRequired?: boolean;
  secureTextEntry?: boolean;
  backendError?: string;
  mutation?: any;
  isButton?: boolean;
  isActive?: boolean;
  buttonTitle?: string;
  onPress?: () => void;
  placeholderTextColor?: string;
  setValidation?: Dispatch<SetStateAction<boolean>>;
}

export const Input = ({
  label,
  error,
  secureTextEntry = false,
  inputMarginBottom = 12,
  isRequired,
  backendError,
  style,
  editable,
  mutation,
  isButton,
  isActive,
  buttonTitle,
  onPress,
  setValidation,
  placeholderTextColor,
  ...textInputProps
}: InputProps) => {
  const isError = Boolean(error);
  const onChange = () => {
    mutation && mutation.reset();
    setValidation && setValidation(false);
  };
  return (
    <Wrapper inputMarginBottom={inputMarginBottom}>
      {Boolean(label) && (
        <LabelWrapper>
          <Label>{label}</Label>
          {isRequired && <RequiredDot>*</RequiredDot>}
        </LabelWrapper>
      )}
      {isButton ? (
        <FlexWrap>
          <StyledInputWithBtn
            isEditable={editable !== false}
            editable={editable}
            style={style}
            isError={isError || Boolean(backendError)}
            secureTextEntry={secureTextEntry}
            onChange={onChange}
            placeholderTextColor={placeholderTextColor || '#9FA1A7'}
            {...textInputProps}
          />
          <Button
            activeOpacity={1}
            title={buttonTitle}
            margin="0 0 0 8px"
            fontSize="16px"
            style={{ width: 87 }}
            active={isActive}
            onPress={onPress}
          />
        </FlexWrap>
      ) : (
        <StyledInput
          isEditable={editable !== false}
          editable={editable}
          style={style}
          isError={isError || Boolean(backendError)}
          secureTextEntry={secureTextEntry}
          onChange={onChange}
          placeholderTextColor={placeholderTextColor || '#9FA1A7'}
          {...textInputProps}
        />
      )}
      {(isError || backendError) && (
        <ErrorMessage error={error} backendError={backendError} />
      )}
    </Wrapper>
  );
};
