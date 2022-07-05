import { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useMutation } from 'react-query';
import styled from 'styled-components/native';

import { checkBNumExists } from '@/api/user';
import Form from '@/components/common/Form';
import FormInput from '@/components/common/FormInput';
import InputScrollWrap from '@/components/common/InputScrollWrap';
import { ICheckBNumExistsPayload } from '@/types/api/user';
import { IError } from '@/types/common/index';
import { EnterBusinessNumberScreenProps } from '@/types/navigation';
import { checkScreenHeight, isAndroid } from '@/utils/check';
interface IProps {
  navigation: EnterBusinessNumberScreenProps['navigation'];
}
function EnterBusinessNumber({ navigation }: IProps) {
  const formMethods = useForm({ mode: 'onTouched' });
  const businessNumber = formMethods.watch('businessNumber');

  const height = checkScreenHeight();
  const mutation = useMutation<
    number,
    AxiosError<IError>,
    ICheckBNumExistsPayload
  >(['bNumExists', businessNumber], payload => checkBNumExists(payload), {
    retry: false,
    onSuccess: () => {
      formMethods.reset();
      navigation.navigate('MobileCertification', { businessNumber });
    },
  });
  const onSubmit = () => {
    mutation.mutate({ businessNumber });
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
          formMethods={formMethods}
          buttonMargin={
            isAndroid() ? '20px 0' : isIphoneX() ? '0 0 -10px' : '0'
          }
          buttonTitle="다음"
          isButtonActive={Boolean(businessNumber)}
          onSubmit={onSubmit}>
          <FormInput
            label="사업자등록번호"
            isRequired={true}
            defaultValue=""
            placeholder="- 없이 숫자만 입력"
            name="businessNumber"
            autoCapitalize="none"
            keyboardType="number-pad"
            maxLength={10}
            mutation={mutation}
            rules={{
              minLength: {
                value: 10,
                message: '사업자등록번호는 10자리의 숫자로 입력해주세요.',
              },
            }}
            backendError={
              mutation.error?.response
                ? '가입 내역이 존재하지 않습니다. 다시 입력해주세요.'
                : undefined
            }
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

export default EnterBusinessNumber;
