import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { isIphoneX } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import Form from '@/components/common/Form';
import FormInput from '@/components/common/FormInput';
import { checkPasswordMatch } from '@/utils/check';

const Container = styled.View`
  padding: 0 20px;
`;

interface IProps {
  onSubmit: (data: any) => void;
  isButtonActive: boolean;
}

function StepTwoForm({ onSubmit, isButtonActive }: IProps) {
  const formMethods = useForm({
    mode: 'onTouched',
  });
  const passwordRef = useRef({});
  passwordRef.current = formMethods.watch('password', '');

  const formData = formMethods.watch();

  return (
    <Form
      formMethods={formMethods}
      onSubmit={onSubmit}
      isButtonPadding
      buttonTitle="다음"
      buttonMargin={isIphoneX() ? '60px 0 0' : '60px 0 20px'}
      isButtonActive={
        isButtonActive &&
        Boolean(formData.password) &&
        Boolean(formData.confirmPassword)
      }>
      <Container>
        <FormInput
          defaultValue=""
          placeholder="영문, 숫자, 특수문자 포함 8자리 이상"
          name="password"
          label="비밀번호"
          isRequired
          inputMarginBottom={28}
          secureTextEntry
          returnKeyType="done"
          rules={{
            required: '비밀번호는 필수 항목입니다.',
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g,
              message:
                '비밀번호는 영문, 숫자, 특수문자가 포함된 8자리 이상으로 입력해주세요.',
            },
          }}
        />
        <FormInput
          defaultValue=""
          placeholder="비밀번호 확인"
          name="confirmPassword"
          label="비밀번호 확인"
          isRequired
          inputMarginBottom={28}
          secureTextEntry
          returnKeyType="done"
          rules={{
            required: '비밀번호 확인은 필수 항목입니다.',
            validate: (value: string) => checkPasswordMatch(value, passwordRef),
          }}
        />
      </Container>
    </Form>
  );
}

export default StepTwoForm;
