import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import React, { useCallback, useMemo, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components/native';

import { updateFranchiseeInfo } from '@/api/user';
import BodyWrap from '@/components/common/BodyWrap';
import Form from '@/components/common/Form';
import FormInput from '@/components/common/FormInput';
import { Input } from '@/components/common/Input';
import InputScrollWrap from '@/components/common/InputScrollWrap';
import EmailForm from '@/components/SignUp/EmailForm';
import { useAppSelector } from '@/hooks/useReduxHooks';
import {
  IFranchiseeInfoResponse,
  IUpdateFranchiseeInfo,
  IUpdateFranchiseeInfoPayload,
} from '@/types/api/store';
import { IError } from '@/types/common';
import { EmailType } from '@/types/user';

const Container = styled.View`
  padding: 20px 0 0;
`;

interface IState {
  email: string;
  category: EmailType;
  suffix: string;
}

type ActionType = 'SET_VALUE';

interface IAction {
  type: ActionType;
  payload?: any;
}

const initialState: IState = {
  email: '',
  category: 'naver.com',
  suffix: '',
};

function profileReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        ...(action.payload.name === 'category' && { suffix: '' }),
      };
    default:
      throw Error(`Unhandled type Error: ${action.type}`);
  }
}

function EditProfile() {
  const navigation = useNavigation();

  const queryClient = useQueryClient();
  const existedData = queryClient.getQueryData<IFranchiseeInfoResponse>([
    'franchiseeInfo',
  ]);

  const formMethods = useForm({
    mode: 'onBlur',
    defaultValues: {
      storeNumber: existedData?.storeNumber,
    },
  });

  const franchiseeIndex = useAppSelector(
    state => state.user.userInfo?.franchiseeIndex,
  ) as number;

  const [emailPrefix, emailSuffix] = (existedData?.email as string).split('@');
  const isEtcEmail =
    emailSuffix !== 'naver.com' &&
    emailSuffix !== 'gmail.com' &&
    emailSuffix !== 'daum.net' &&
    emailSuffix !== 'nate.com' &&
    emailSuffix !== 'hanmail.net';

  const [state, dispatch] = useReducer(profileReducer, {
    email: emailPrefix || '',
    category: isEtcEmail ? '직접입력' : emailSuffix,
    suffix: isEtcEmail ? emailSuffix : '',
  });
  const { category, email, suffix } = state;

  const onChangeEmail = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;

    dispatch({
      type: 'SET_VALUE',
      payload: { name: 'email', value },
    });
  };

  const onChange = useCallback(
    (name: 'category' | 'suffix', value: EmailType | string) => {
      dispatch({
        type: 'SET_VALUE',
        payload: { name, value },
      });
    },
    [],
  );

  const mutation = useMutation<
    IUpdateFranchiseeInfo,
    AxiosError<IError>,
    IUpdateFranchiseeInfoPayload
  >(payload => updateFranchiseeInfo(payload), {
    retry: false,
    onSuccess: data => {
      queryClient.setQueryData(['franchiseeInfo'], {
        ...existedData,
        storeNumber: data.storeNumber,
        email: data.email,
      });
      Alert.alert('KTP', '정보 변경이 완료되었습니다.', [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    },
  });

  const isButtonActive = useMemo(
    () =>
      Boolean(email.trim()) &&
      Boolean(category === '직접입력' ? suffix?.trim() : true),
    [email, category, suffix],
  );

  const onSubmit = async (data: { storeNumber: string }) => {
    if (!isButtonActive) {
      return;
    }

    mutation.mutate({
      franchiseeIndex,
      email: email + '@' + (category === '직접입력' ? suffix : category),
      storeNumber: data.storeNumber,
    });
  };

  return (
    <InputScrollWrap>
      <BodyWrap>
        <Form
          onSubmit={onSubmit}
          buttonTitle="변경완료"
          formMethods={formMethods}
          buttonMargin={isIphoneX() ? '70px 0 0' : '70px 0 20px'}
          isButtonActive={isButtonActive}>
          <Container>
            <Input
              defaultValue=""
              placeholder="성명(대표자명)"
              label="성명(대표자명)"
              inputMarginBottom={28}
              value={existedData?.sellerName}
              editable={false}
            />
            <Input
              defaultValue=""
              placeholder="휴대전화번호"
              label="휴대전화번호"
              inputMarginBottom={28}
              value={existedData?.storeTel}
              editable={false}
            />
            <Input
              defaultValue=""
              placeholder="사업자등록번호"
              label="사업자등록번호"
              inputMarginBottom={28}
              value={existedData?.businessNumber}
              editable={false}
            />
            <EmailForm
              email={email}
              category={category}
              prevSuffix={suffix}
              onChangeEmail={onChangeEmail}
              onChange={onChange}
            />
            <Input
              defaultValue=""
              placeholder="상호명"
              label="상호명"
              inputMarginBottom={28}
              value={existedData?.storeName}
              editable={false}
            />
            <Input
              defaultValue=""
              placeholder="간판명"
              label="간판명"
              inputMarginBottom={28}
              value={existedData?.signboard || existedData?.storeName}
              editable={false}
            />
            <Input
              defaultValue=""
              placeholder="기본 주소"
              label="사업장 주소"
              inputMarginBottom={8}
              value={existedData?.storeAddressBasic}
              editable={false}
            />
            <Input
              defaultValue=""
              placeholder="상세 주소 입력"
              inputMarginBottom={28}
              value={existedData?.storeAddressDetail}
              editable={false}
            />
            <Input
              defaultValue=""
              placeholder="판매상품 종목"
              label="판매상품 종목"
              inputMarginBottom={28}
              value={existedData?.productCategory}
              editable={false}
            />
            <FormInput
              defaultValue=""
              keyboardType="number-pad"
              placeholder="- 없이 숫자만 입력"
              name="storeNumber"
              label="매장 전화번호"
              inputMarginBottom={28}
              maxLength={12}
              rules={{
                required: false,
              }}
            />
          </Container>
        </Form>
      </BodyWrap>
    </InputScrollWrap>
  );
}

export default EditProfile;
