import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useReducer } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import styled from 'styled-components/native';

import stepTwo from '@/assets/icons/Auth/stepTwo.png';
import DividingLine from '@/components/common/DividingLine';
import { Input } from '@/components/common/Input';
import InputScrollWrap from '@/components/common/InputScrollWrap';
import BusinessNumberForm from '@/components/SignUp/BusinessNumberForm';
import EmailForm from '@/components/SignUp/EmailForm';
import MobileCertification from '@/components/SignUp/MobileCertification';
import PasswordForm from '@/components/SignUp/PasswordForm';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import { updateAuth } from '@/store/modules/auth';
import { EmailType } from '@/types/user';

const StepProgress = styled.Image`
  width: 100%;
  height: 52px;
  margin: 0 0 28px;
`;

const Container = styled.View`
  padding: 0 20px;
`;

interface IState {
  businessNumber: string;
  isValidBussinessNumber: boolean;
  email: string;
  category: EmailType;
  suffix: string;
}

type ActionType = 'SET_VALUE' | 'SET_ISVALID_BNUMBER' | 'SET_BNUMBER';

interface IAction {
  type: ActionType;
  payload?: any;
}

const initialState: IState = {
  businessNumber: '',
  isValidBussinessNumber: false,
  email: '',
  category: 'naver.com',
  suffix: '',
};

function accountReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        ...(action.payload.name === 'category' && { suffix: '' }),
      };

    case 'SET_ISVALID_BNUMBER':
      return {
        ...state,
        isValidBussinessNumber: true,
      };
    case 'SET_BNUMBER':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        isValidBussinessNumber: false,
      };
    default:
      throw Error(`Unhandled type Error: ${action.type}`);
  }
}

function StepTwo() {
  const auth = useAppSelector(state => state.auth);
  const reduxDispatch = useAppDispatch();
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(accountReducer, {
    businessNumber: auth.businessNumber,
    isValidBussinessNumber: auth.isValidBussinessNumber,
    email: auth.email,
    category: auth.category,
    suffix: auth.suffix,
  });
  const { businessNumber, category, email, isValidBussinessNumber, suffix } =
    state;

  const onChangeBNumber = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const text = e.nativeEvent.text;

    dispatch({
      type: 'SET_BNUMBER',
      payload: { name: 'businessNumber', value: text },
    });
  };

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

  const onSetIsValidBNumber = () => {
    dispatch({
      type: 'SET_ISVALID_BNUMBER',
    });
  };
  //QA
  const isNotButtonActive = useMemo(
    () =>
      !isValidBussinessNumber ||
      !email.trim() ||
      !auth.storeTel ||
      !auth.sellerName ||
      (category === '직접입력' &&
        suffix.match(/[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i) ===
          null),
    [
      isValidBussinessNumber,
      email.storeTel,
      auth.sellerName,
      email,
      category,
      suffix,
    ],
  );

  const onSubmit = (data: any) => {
    if (isNotButtonActive) {
      return;
    }
    //QA
    // reduxDispatch(
    //   updateImpInfo({ sellerName: '홍길동', storeTel: '01025012134' }),
    // );

    reduxDispatch(
      updateAuth({
        email,
        category,
        suffix,
        businessNumber,
        password: data.password,
        confirmPassword: data.confirmPassword,
        isValidBussinessNumber,
      }),
    );
    navigation.navigate('StepThree');
  };

  return (
    <InputScrollWrap>
      <StepProgress source={stepTwo} />
      <MobileCertification />
      <DividingLine height="8px" color="#EDEEEF" full />
      <Container>
        <Input
          isRequired
          defaultValue=""
          placeholder="성명(대표자명)"
          label="성명(대표자명)"
          inputMarginBottom={28}
          editable={false}
          value={auth.sellerName} //QA
          style={{ color: 'black' }}
        />
        <Input
          isRequired
          defaultValue=""
          placeholder="휴대전화번호"
          label="휴대전화번호"
          inputMarginBottom={28}
          editable={false}
          value={auth.storeTel} //QA
          style={{ color: 'black' }}
        />
        <BusinessNumberForm
          onChangeBNumber={onChangeBNumber}
          businessNumber={businessNumber}
          isValidBussinessNumber={isValidBussinessNumber}
          onSetIsValidBNumber={onSetIsValidBNumber}
        />
        <EmailForm
          email={email}
          onChangeEmail={onChangeEmail}
          category={category}
          onChange={onChange}
          suffix={suffix}
        />
      </Container>
      <PasswordForm onSubmit={onSubmit} isButtonActive={!isNotButtonActive} />
    </InputScrollWrap>
  );
}

export default StepTwo;
