import { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getIsValidPwd } from '@/api/user';
import Form from '@/components/common/Form';
import FormInput from '@/components/common/FormInput';
import InputScrollWrap from '@/components/common/InputScrollWrap';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { IError } from '@/types/common/index';
import { EnterCurrentPwdScreenProps } from '@/types/navigation';
import { IUserInfo } from '@/types/user';
import { checkScreenHeight, isAndroid } from '@/utils/check';

interface IProps {
  navigation: EnterCurrentPwdScreenProps['navigation'];
}
function EnterCurrentPwd({ navigation }: IProps) {
  const { franchiseeIndex } = useAppSelector(
    state => state.user.userInfo,
  ) as IUserInfo;
  const height = checkScreenHeight();
  const formMethods = useForm({ mode: 'onTouched' });
  const password = formMethods.watch('password');
  const { refetch } = useQuery<number, AxiosError<IError>>(
    ['isValidPwd', franchiseeIndex, password],
    () => getIsValidPwd({ franchiseeIndex, password }),
    {
      enabled: false,
      retry: false,
      onSuccess: () => {
        formMethods.reset();
        navigation.navigate('ResetPasswordInside');
      },
      onError: error => {
        error.response &&
          Alert.alert(
            'KTP',
            '고객님의 비밀번호와 일치하지\n않습니다. 다시 입력해주세요.',
          );
      },
    },
  );
  const onSubmit = () => {
    refetch();
  };

  return (
    <InputScrollWrap>
      <Wrap height={height}>
        <Form
          style={{
            paddingTop: 20,
            flex: 1,
            justifyContent: 'space-between',
          }}
          buttonMargin={
            isAndroid() ? '20px 0' : isIphoneX() ? '0 0 -10px' : '0'
          }
          formMethods={formMethods}
          buttonTitle="다음"
          isButtonActive={Boolean(password)}
          onSubmit={onSubmit}>
          <FormInput
            label="현재 비밀번호 입력"
            isRequired={true}
            defaultValue=""
            placeholder="영문, 숫자, 특수문자 포함 8자리 이상"
            name="password"
            autoCapitalize="none"
            secureTextEntry={true}
            rules={{
              pattern: {
                message:
                  '비밀번호는 영문, 숫자, 특수문자가 포함된 \n8자리 이상으로 입력해주세요.',
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              },
            }}
          />
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
export default EnterCurrentPwd;
