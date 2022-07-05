import { IUpdateEmployeePayload } from '@/types/api/user';
import { UpdateEmployeeScreenProps } from '@/types/navigation';
import Form from '@/components/common/Form';
import FormInput from '@/components/common/FormInput';
import InputScrollWrap from '@/components/common/InputScrollWrap';
import {
  checkPasswordMatch,
  checkScreenHeight,
  isAndroid,
} from '@/utils/check';
import { AxiosError } from 'axios';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useMutation, useQueryClient } from 'react-query';
import { IError } from '@/types/common/index';
import styled from 'styled-components/native';
import { Input } from '@/components/common/Input';
import { updateEmployee } from '@/api/user';

interface IProps {
  navigation: UpdateEmployeeScreenProps['navigation'];
  route: UpdateEmployeeScreenProps['route'];
}
function UpdateEmployee({ navigation, route }: IProps) {
  const { userId, name: defaultName, employeeIndex } = route.params.data;
  const height = checkScreenHeight();
  const passwordRef = useRef({});

  const queryClient = useQueryClient();
  const formMethods = useForm({ mode: 'onTouched' });
  const { name, password, passwordCheck } = formMethods.watch();
  passwordRef.current = password;

  useEffect(() => {
    formMethods.setValue(name, defaultName);
  }, []);

  const mutation = useMutation<
    number,
    AxiosError<IError>,
    IUpdateEmployeePayload
  >(payload => updateEmployee(payload), {
    retry: false,
    onSuccess: () => {
      Alert.alert('KTP', '직원 정보가 변경되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            queryClient.refetchQueries(['EmployeeList']);
            navigation.navigate('EmployeeAccount');
          },
        },
      ]);
    },
  });

  const onSubmit = () => {
    mutation.mutate({ employeeIndex, name, password, passwordCheck });
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
          buttonTitle="변경 완료"
          isButtonActive={Boolean(name)}
          onSubmit={onSubmit}>
          <Container>
            <FormInput
              label="성명"
              isRequired
              defaultValue={defaultName}
              placeholder="성명"
              name="name"
              inputMarginBottom={28}
              rules={{
                required: '성명은 필수 입력 항목입니다.',
              }}
            />
            <Input
              label="아이디"
              inputMarginBottom={28}
              isRequired
              value={userId}
              editable={false}
            />
            <FormInput
              label="새 비밀번호"
              defaultValue=""
              placeholder="영문, 숫자, 특수문자 포함 8자리 이상"
              name="password"
              inputMarginBottom={28}
              secureTextEntry
              rules={{
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g,
                  message:
                    '비밀번호는 영문, 숫자, 특수문자가 포함된 8자리 이상으로 입력해주세요.',
                },
              }}
            />
            <FormInput
              label="새 비밀번호 확인"
              defaultValue=""
              placeholder="비밀번호 확인"
              name="passwordCheck"
              secureTextEntry
              rules={{
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
export default UpdateEmployee;
