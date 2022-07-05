import React from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { View } from 'react-native';
import styled from 'styled-components/native';

import Button from '@components/common/Button';
import TwoButton from '@components/common/TwoButton';

const ButtonWrapper = styled.View<{ isButtonPadding: boolean }>`
  padding: ${props => (props.isButtonPadding ? '0 20px' : '0')};
`;

interface FormProps {
  formMethods: UseFormReturn<FieldValues>;
  onSubmit?: (data: any) => void;
  children: JSX.Element | JSX.Element[];
  buttonTitle?: string;
  buttonMargin?: string;
  isTwoButton?: boolean;
  isButtonPadding?: boolean;
  isButtonActive?: boolean;
  subTitle?: string;
  onSubClick?: () => void;
  style?: object;
  isVisibleButton?: boolean;
}

function Form({
  children,
  onSubmit,
  buttonTitle,
  buttonMargin,
  formMethods,
  isTwoButton = false,
  isButtonPadding = false,
  isButtonActive = true,
  onSubClick,
  subTitle,
  style,
  isVisibleButton = true,
}: FormProps) {
  const onErrors = (errors: object) => {
    console.warn(errors);
  };

  return (
    <View style={style}>
      <FormProvider {...formMethods}>
        {(Array.isArray(children) ? [...children] : [children]).map(child => {
          return child;
        })}
      </FormProvider>
      {isTwoButton && subTitle && onSubClick && (
        <TwoButton
          isLeftExtend
          onLeftClick={onSubClick}
          leftBtnTitle={subTitle}
          onRightClick={
            formMethods && formMethods.handleSubmit(onSubmit, onErrors)
          }
          rightBtnTitle={buttonTitle}
        />
      )}
      {isVisibleButton && (
        <ButtonWrapper isButtonPadding={isButtonPadding}>
          <Button
            active={isButtonActive}
            title={buttonTitle}
            onPress={
              formMethods && formMethods.handleSubmit(onSubmit, onErrors)
            }
            margin={buttonMargin}
          />
        </ButtonWrapper>
      )}
    </View>
  );
}

export default Form;
