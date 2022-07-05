import { AxiosError } from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useQuery } from 'react-query';

import { validateUserId } from '@/api/user';
import FormInput from '@/components/common/FormInput';
import { StyledText } from '@/components/common/Text';
import { IError } from '@/types/common';

interface IProps {
  setUserId: Dispatch<SetStateAction<string>>;
  isValidUserId: boolean;
  setIsValidUserId: Dispatch<SetStateAction<boolean>>;
}

function IdForm({ setUserId, isValidUserId, setIsValidUserId }: IProps) {
  const formMethods = useForm({ mode: 'onTouched' });
  const userId = formMethods.watch('userId');
  const { refetch, error } = useQuery<number, AxiosError<IError>>(
    ['isNotDuplicated', userId],
    () => validateUserId({ userId }),
    {
      enabled: false,
      retry: false,
      onSuccess: () => {
        setIsValidUserId(true);
        setUserId(userId);
      },
      onError: err => {
        err.response &&
          Alert.alert(
            'KTP',
            '이미 사용중인 아이디입니다.\n다시 입력해주세요.',
            [{ text: '확인' }],
          );
      },
    },
  );
  const onValidationUserId = () => {
    if (!userId.trim()) {
      Alert.alert('KTP', '아이디를 입력한 후\n중복확인 해주세요.');
      return;
    }
    refetch();
  };
  return (
    <>
      <FormProvider {...formMethods}>
        <FormInput
          isRequired
          label="아이디"
          rules={{
            pattern: {
              value: /^[A-Za-z0-9+]{6,20}$/,
              message: '아이디는 6~20자의 영문 또는 숫자로 입력해주세요.',
            },
          }}
          name="userId"
          defaultValue=""
          backendError={
            error ? '이미 사용중인 아이디입니다. 다시 입력해주세요.' : undefined
          }
          placeholder="6~20자의 영문 또는 숫자"
          autoCapitalize="none"
          isButton
          setValidation={setIsValidUserId}
          isActive={!isValidUserId}
          buttonTitle="중복확인"
          onPress={formMethods.handleSubmit(onValidationUserId)}
        />
      </FormProvider>
      {isValidUserId && (
        <StyledText marginBottom={30} lineHeight={18} color="#005F83">
          사용 가능한 아이디입니다.
        </StyledText>
      )}
    </>
  );
}
export default IdForm;
