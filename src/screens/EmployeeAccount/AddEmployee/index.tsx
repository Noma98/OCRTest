import { AxiosError } from 'axios';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components/native';

import { addEmployee } from '@/api/user';
import Form from '@/components/common/Form';
import FormInput from '@/components/common/FormInput';
import InputScrollWrap from '@/components/common/InputScrollWrap';
import IdForm from '@/components/EmployeeAccount/IdForm';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { IAddEmployeePayload } from '@/types/api/user';
import { IError } from '@/types/common/index';
import { AddEmployeeScreenProps } from '@/types/navigation';
import {
  checkPasswordMatch,
  checkScreenHeight,
  isAndroid,
} from '@/utils/check';

interface IProps {
  navigation: AddEmployeeScreenProps['navigation'];
}
function AddEmployee({ navigation }: IProps) {
  const { franchiseeIndex } = useAppSelector(state => state.user.userInfo);
  const height = checkScreenHeight();
  const passwordRef = useRef({});

  const [userId, setUserId] = useState('');
  const [isValidUserId, setIsValidUserId] = useState(false);

  const queryClient = useQueryClient();
  const formMethods = useForm({ mode: 'onTouched' });
  const { name, password, passwordCheck } = formMethods.watch();
  passwordRef.current = password;

  const mutation = useMutation<number, AxiosError<IError>, IAddEmployeePayload>(
    payload => addEmployee(payload),
    {
      retry: false,
      onSuccess: () => {
        Alert.alert('KTP', '직원이 추가되었습니다.', [
          {
            text: '확인',
            onPress: () => {
              queryClient.refetchQueries(['EmployeeList']);
              navigation.navigate('EmployeeAccount');
            },
          },
        ]);
      },
    },
  );

  const onSubmit = () => {
    if (!isValidUserId) {
      Alert.alert('KTP', '아이디 중복확인을 해주세요.', [{ text: '확인' }]);
      return;
    }

    mutation.mutate({ franchiseeIndex, userId, password, name, passwordCheck });
  };
  return (
    <InputScrollWrap>
      <Wrap height={height}>
        <Form
          formMethods={formMethods}
          style={{
            paddingTop: 20,
            flex: 1,
            justifyContent: 'space-between',
          }}
          buttonMargin={
            isAndroid() ? '20px 0' : isIphoneX() ? '0 0 -15px' : '0'
          }
          buttonTitle="완료"
          isButtonActive={Boolean(name && password && passwordCheck)}
          onSubmit={onSubmit}>
          <Container>
            <FormInput
              label="성명"
              isRequired
              defaultValue=""
              placeholder="성명 입력"
              name="name"
              inputMarginBottom={28}
              rules={{
                required: '성명은 필수 입력 항목입니다.',
              }}
            />
            <IdForm
              setUserId={setUserId}
              isValidUserId={isValidUserId}
              setIsValidUserId={setIsValidUserId}
            />
            <FormInput
              label="비밀번호"
              isRequired
              defaultValue=""
              placeholder="영문, 숫자, 특수문자 포함 8자리 이상"
              name="password"
              inputMarginBottom={28}
              secureTextEntry
              rules={{
                required: '비밀번호는 필수 입력 항목입니다.',
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g,
                  message:
                    '비밀번호는 영문, 숫자, 특수문자가 포함된 8자리 이상으로 입력해주세요.',
                },
              }}
            />
            <FormInput
              label="비밀번호 확인"
              isRequired
              defaultValue=""
              placeholder="비밀번호 확인"
              name="passwordCheck"
              secureTextEntry
              rules={{
                required: '비밀번호 확인은 필수 항목입니다.',
                validate: (value: string) =>
                  checkPasswordMatch(value, passwordRef),
              }}
            />
          </Container>
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
const Container = styled.View``;
export default AddEmployee;
