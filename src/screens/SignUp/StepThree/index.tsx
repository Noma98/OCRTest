import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import React, { useMemo, useReducer } from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { useMutation } from 'react-query';
import styled from 'styled-components/native';

import { signUp } from '@/api/auth';
import stepThree from '@/assets/icons/Auth/stepThree.png';
import DividingLine from '@/components/common/DividingLine';
import { Input } from '@/components/common/Input';
import InputScrollWrap from '@/components/common/InputScrollWrap';
import LoadingView from '@/components/common/LoadingView';
import AddressForm from '@/components/SignUp/AddressForm';
import NameForm from '@/components/SignUp/NameForm';
import ProductCategoryForm from '@/components/SignUp/ProductCategoryForm';
import RadioCheckForm from '@/components/SignUp/RadioCheckForm';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import { resetAuth } from '@/store/modules/auth';
import { ISignUpPayload } from '@/types/api/auth';
import { IError } from '@/types/common';
import { CategoryType } from '@/types/user';
import { attachedHyphens } from '@/utils/format';
import { getFcmToken } from '@/utils/pushNotification';

const StepProgress = styled.Image`
  width: 100%;
  height: 52px;
  margin: 0 0 28px;
`;

const Container = styled.View`
  padding: 0 20px;
`;

interface IState {
  storeName: string;
  signboard: string;
  storeAddressDetail: string;
  productCategory: CategoryType;
  etc: string;
  storeNumber: string;
  isTaxRefundShop: boolean;
}

type ActionType = 'SET_VALUE';
interface IAction {
  type: ActionType;
  payload?: any;
}

const initialState: IState = {
  storeName: '',
  signboard: '',
  storeAddressDetail: '',
  productCategory: '판매상품 종목 선택',
  etc: '',
  storeNumber: '',
  isTaxRefundShop: false,
};

function storeRecuder(state = initialState, action: IAction) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      throw Error(`Unhandled type Error: ${action.type}`);
  }
}

function StepThree() {
  const [state, dispatch] = useReducer(storeRecuder, initialState);
  const {
    productCategory,
    etc,
    signboard,
    storeAddressDetail,
    storeName,
    storeNumber,
    isTaxRefundShop,
  } = state;
  const {
    sellerName,
    storeTel,
    businessNumber,
    email,
    category,
    suffix,
    password,
    storeAddressNumber,
    storeAddressBasic,
  } = useAppSelector(reduxState => reduxState.auth);
  const reduxDispatch = useAppDispatch();
  const navigation = useNavigation();

  const mutation = useMutation<number, AxiosError<IError>, ISignUpPayload>(
    payload => signUp(payload),
    {
      retry: false,
      onError: error => {
        let message;
        switch (error.response?.data.code) {
          case 'R0001':
            message =
              '이미 등록된 사업자등록번호입니다.\n다른 사업자등록번호를 사용해주세요.';
            break;
          case 'P0001':
            message =
              '유효하지 않은 비밀번호 형식입니다.\n형식에 맞게 입력해주세요.';
            break;
          case 'B001':
            message =
              '유효하지 않은 사업자등록번호 형식입니다.\n형식에 맞게 입력해주세요.';
            break;
          default:
            message =
              '오류가 발생했습니다.\n고객센터로 문의해주세요.\n02-6213-8011 (08:30~16:30)';
            break;
        }
        error.response && Alert.alert('알림', message);
      },
      onSuccess: () => {
        Alert.alert('KTP', '가입 완료되었습니다.\n소중한 가입 감사합니다.', [
          {
            text: '완료',
            onPress: () => {
              reduxDispatch(resetAuth());
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              });
            },
          },
        ]);
      },
    },
  );

  const onChangeStoreNumber = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const value = e.nativeEvent.text;

    dispatch({
      type: 'SET_VALUE',
      payload: { name: 'storeNumber', value },
    });
  };

  const onChange = (
    name:
      | 'storeName'
      | 'signboard'
      | 'storeAddressDetail'
      | 'productCategory'
      | 'etc',
    value: string,
  ) => {
    dispatch({
      type: 'SET_VALUE',
      payload: { name, value },
    });
  };

  const onPressRadio = (value: boolean) => {
    dispatch({
      type: 'SET_VALUE',
      payload: { name: 'isTaxRefundShop', value },
    });
  };

  const isButtonActive = useMemo(
    () =>
      productCategory !== '판매상품 종목 선택' &&
      Boolean(storeAddressDetail) &&
      Boolean(storeName) &&
      Boolean(productCategory === '기타' ? etc.trim() : true),
    [productCategory, storeAddressDetail, storeName, etc],
  );

  const onSubmit = async () => {
    if (!isButtonActive) {
      return;
    }
    const pushToken = await getFcmToken();
    const payload: ISignUpPayload = {
      pushToken,
      sellerName,
      storeTel,
      businessNumber: attachedHyphens(businessNumber),
      email: email + '@' + (category !== '직접입력' ? category : suffix),
      password,
      storeName,
      signboard,
      storeAddressNumber,
      storeAddressBasic,
      storeAddressDetail,
      productCategory,
      storeNumber,
      isTaxRefundShop: isTaxRefundShop ? 'Y' : 'N',
    };

    mutation.mutate(payload);
  };

  return (
    <>
      <InputScrollWrap>
        <StepProgress source={stepThree} />
        <Container>
          <NameForm
            signboard={signboard}
            storeName={storeName}
            onChange={onChange}
          />
          <AddressForm
            storeAddressDetail={storeAddressDetail}
            onChange={onChange}
          />
          <ProductCategoryForm
            productCategory={productCategory}
            onChange={onChange}
            etc={etc}
          />
          <Input
            defaultValue=""
            placeholder="- 없이 숫자만 입력"
            label="매장 전화번호"
            keyboardType="number-pad"
            returnKeyType="done"
            inputMarginBottom={28}
            maxLength={11}
            value={storeNumber}
            onChange={onChangeStoreNumber}
          />
        </Container>
        <DividingLine height="8px" color="#EDEEEF" full />
        <RadioCheckForm
          isTaxRefundShop={isTaxRefundShop}
          onPressRadio={onPressRadio}
          isButtonActive={isButtonActive}
          onSubmit={onSubmit}
        />
      </InputScrollWrap>
      {mutation.isLoading && <LoadingView isOpacity isDark />}
    </>
  );
}

export default StepThree;
