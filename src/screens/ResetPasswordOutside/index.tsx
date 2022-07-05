import { AxiosError } from 'axios';
import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useMutation } from 'react-query';
import styled from 'styled-components/native';

import { updatePasswordOutside } from '@/api/user';
import BackButton from '@/components/common/BackButton';
import Form from '@/components/common/Form';
import FormInput from '@/components/common/FormInput';
import InputScrollWrap from '@/components/common/InputScrollWrap';
import { IUpdatePwdOutsidePayload } from '@/types/api/user';
import { IError } from '@/types/common/index';
import { ResetPasswordOutsideScreenProps } from '@/types/navigation';
import {
  checkPasswordMatch,
  checkScreenHeight,
  isAndroid,
} from '@/utils/check';

interface IProps {
  navigation: ResetPasswordOutsideScreenProps['navigation'];
  route: ResetPasswordOutsideScreenProps['route'];
}
function ResetPasswordOutside({ navigation, route }: IProps) {
  const { businessNumber } = route.params;
  const formMethods = useForm({ mode: 'onTouched' });
  const { newPassword, newPasswordCheck } = formMethods.watch();
  const passwordRef = useRef({});
  passwordRef.current = formMethods.watch('newPassword');
  const height = checkScreenHeight();

  useLayoutEffect(() =>
    navigation.setOptions({
      headerLeft: () => (
        <BackButton pressFuncType="IMP" params={{ businessNumber }} />
      ),
    }),
  );

  const mutation = useMutation<
    number,
    AxiosError<IError>,
    IUpdatePwdOutsidePayload
  >(['updatePassword'], payload => updatePasswordOutside(payload), {
    retry: false,
    onSuccess: () => {
      Alert.alert('KTP', '비밀번호가 변경되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.navigate('SignIn'),
        },
      ]);
    },
  });

  const onSubmit = () => {
    mutation.mutate({ businessNumber, newPassword, newPasswordCheck });
  };

  const isButtonActive = useMemo(
    () => Boolean(newPassword) && Boolean(newPasswordCheck),
    [newPassword, newPasswordCheck],
  );
  return (
    <InputScrollWrap>
      <Wrap height={height}>
        <Form
          style={{
            height: '100%',
            paddingTop: 20,
            justifyContent: 'space-between',
          }}
          formMethods={formMethods}
          buttonTitle="완료"
          buttonMargin={
            isAndroid() ? '20px 0' : isIphoneX() ? '0 0 -10px' : '0'
          }
          isButtonActive={isButtonActive}
          onSubmit={onSubmit}>
          <InputWrap>
            <FormInput
              isRequired={true}
              defaultValue=""
              placeholder="비밀번호 (알파벳, 숫자, 특수문자 포함 8자리 이상)"
              name="newPassword"
              label="새 비밀번호"
              autoCapitalize="none"
              secureTextEntry={true}
              inputMarginBottom={28}
              rules={{
                pattern: {
                  message:
                    '비밀번호는 영문, 숫자, 특수문자가 포함된 8자리 이상으로 입력해주세요.',
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                },
              }}
            />
            <FormInput
              isRequired={true}
              defaultValue=""
              placeholder="비밀번호 확인"
              name="newPasswordCheck"
              label="새 비밀번호 확인"
              autoCapitalize="none"
              secureTextEntry={true}
              rules={{
                required: '비밀번호가 일치하지 않습니다.',
                validate: (value: string) =>
                  checkPasswordMatch(value, passwordRef),
              }}
            />
          </InputWrap>
        </Form>
      </Wrap>
    </InputScrollWrap>
  );
}
const Wrap = styled.View<{ height?: number }>`
  flex: 1;
  height: ${props => props.height};
  padding: 0 20px;
`;

const InputWrap = styled.View``;
export default ResetPasswordOutside;
