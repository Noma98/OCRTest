import React, { useEffect } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import styled from 'styled-components/native';

import { Input } from '@/components/common/Input';
import { StyledText } from '@/components/common/Text';
import SelectCategory from '@/components/common/SelectCategory';
import FormInput from '@/components/common/FormInput';
import { emailList } from '@/constants/signUp';
import { isAndroid } from '@/utils/check';
import { EmailType } from '@/types/user';

const Container = styled.View`
  margin: 0 0 20px;
`;

const EmailWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 0 10px;
`;

const InputWrapper = styled.View`
  flex: 1;
`;

interface IProps {
  email: string;
  onChangeEmail: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  category: EmailType;
  prevSuffix: string;
  onChange: (name: 'category' | 'suffix', value: EmailType | string) => void;
}

function EmailForm(props: IProps) {
  const { email, onChangeEmail, category, onChange, prevSuffix } = props;
  const onCategoryChange = (value: EmailType) => {
    onChange('category', value);
    value !== '직접입력' && formMethods.reset();
  };
  const formMethods = useForm({ mode: 'onTouched' });
  const suffix = formMethods.watch('suffix');

  useEffect(() => {
    onChange('suffix', suffix);
  }, [suffix]);

  return (
    <Container>
      <EmailWrapper>
        <InputWrapper>
          <Input
            isRequired
            label="이메일"
            placeholder="이메일 입력"
            defaultValue=""
            onChange={onChangeEmail}
            value={email}
            keyboardType="email-address"
            inputMarginBottom={0}
            autoCapitalize="none"
            returnKeyType="done"
          />
        </InputWrapper>
        <StyledText
          style={{ marginTop: isAndroid() ? 45 : 40 }}
          marginLeft={10}
          marginRight={10}
          marginBottom={16}
          lineHeight={18}>
          @
        </StyledText>
        <InputWrapper>
          <SelectCategory<EmailType>
            category={category}
            onCategoryChange={onCategoryChange}
            isSelected
            label=""
            itemList={emailList}
            {...(category === '직접입력' && { hideiOSModal: true })}
          />
        </InputWrapper>
      </EmailWrapper>
      {category === '직접입력' && (
        <>
          <FormProvider {...formMethods}>
            <FormInput
              rules={{
                pattern: {
                  value: /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                  message: '이메일 형식에 맞지 않습니다. 다시 입력해주세요.',
                },
              }}
              name="suffix"
              defaultValue={prevSuffix}
              placeholder="직접 입력"
              autoCapitalize="none"
              keyboardType="email-address"
              autoFocus={isAndroid()}
            />
          </FormProvider>
        </>
      )}
    </Container>
  );
}

export default EmailForm;
