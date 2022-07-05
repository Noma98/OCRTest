import { AxiosError } from 'axios';
import React, { useCallback, useReducer, useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useMutation } from 'react-query';
import styled from 'styled-components/native';

import { withdrawalPoint } from '@/api/store';
import BodyWrap from '@/components/common/BodyWrap';
import Button from '@/components/common/Button';
import CheckTermItem from '@/components/common/CheckTermItem';
import DividingLine from '@/components/common/DividingLine';
import ErrorMessage from '@/components/common/ErrorMessage';
import FlexWrap from '@/components/common/FlexWrap';
import { Input } from '@/components/common/Input';
import Text from '@/components/common/Text';
import Confirm from '@/components/Modal/Confirm';
import BankAccount from '@/components/StoreMode/Tpoints/BankAccount';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { IWithdrawalPayload, IWithdrawalResponse } from '@/types/api/store';
import { IError } from '@/types/common';
import { RequestWithdrawalScreenProps } from '@/types/navigation';
import { IUserInfo } from '@/types/user';
import { comma, removeLetter } from '@/utils/format';

interface IState {
  amount: string;
  isSelected: boolean;
}
type IAction = { type: 'TOGGLE' } | { type: 'SET_AMOUNT'; payload: string };
const initialState: IState = {
  isSelected: false,
  amount: '',
};

const pointReducer = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, isSelected: !state.isSelected };
    case 'SET_AMOUNT':
      return { ...state, amount: action.payload };
  }
};

interface IProps {
  route: RequestWithdrawalScreenProps['route'];
  navigation: RequestWithdrawalScreenProps['navigation'];
}

function RequestWithdrawal({ route, navigation }: IProps) {
  const { tpoint } = route.params;
  const [isModal, setIsModal] = useState(false);

  const [state, dispatch] = useReducer(pointReducer, initialState);
  const { amount, isSelected } = state;
  const { franchiseeIndex } = useAppSelector(
    state => state.user.userInfo as IUserInfo,
  );

  const toggleCheckbox = useCallback(() => {
    dispatch({ type: 'TOGGLE' });
  }, []);

  const withdrawalAll = useCallback(() => {
    dispatch({
      type: 'SET_AMOUNT',
      payload: tpoint === '0' ? '' : tpoint ? comma(tpoint) : '',
    });
  }, [tpoint]);

  const onChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const value = e.nativeEvent.text;
      if (value === '0') {
        return;
      }
      if (Number(removeLetter(value)) > Number(tpoint)) {
        withdrawalAll();
        return;
      }

      dispatch({
        type: 'SET_AMOUNT',
        payload: comma(removeLetter(value)),
      });
    },
    [tpoint, withdrawalAll],
  );

  const mutation = useMutation<
    IWithdrawalResponse,
    AxiosError<IError>,
    IWithdrawalPayload
  >(payload => withdrawalPoint(payload), {
    retry: false,
    onSuccess: data => {
      navigation.navigate('WithdrawalResult', { data });
    },
  });

  const onCloseModal = useCallback(() => {
    setIsModal(false);
  }, []);

  const onSubmit = useCallback(() => {
    setIsModal(true);
  }, []);

  const onConfirm = useCallback(() => {
    setIsModal(false);
    mutation.mutate({ franchiseeIndex, amount: removeLetter(amount) });
  }, [amount, franchiseeIndex, mutation]);

  const onGoToTerm = useCallback(() => {
    navigation.navigate('Terms', { type: 'POINT_TYPE' });
  }, [navigation]);

  return (
    <BodyWrap isPadding={false}>
      <DividingLine color="#EDEEEF" text="출금할 T.POINT 금액 입력" full />
      <PaddingWrap>
        <Input
          label="출금할 T.POINT 금액"
          isRequired
          isButton
          buttonTitle="전액출금"
          isActive
          keyboardType="number-pad"
          placeholder="0"
          value={amount}
          onChange={onChange}
          onPress={withdrawalAll}
        />
        <TextWrap>
          <Text text="보유 T.POINT  " size="14px" lineHeight={22} />
          <Text
            text={`${comma(tpoint || '0')} P`}
            size="14px"
            lineHeight={22}
            color="#005F83"
            weight={500}
          />
        </TextWrap>
      </PaddingWrap>
      <DividingLine color="#EDEEEF" text="입금 계좌 확인" full />
      <PaddingWrap>
        <BankAccount />
        <ErrorMessage
          error="신청하신 T.POINT 출금은 취소 또는 정정할 수 없습니다."
          style={{ marginTop: 8 }}
        />
        <ErrorMessage
          isBlack
          error="입금 계좌는 CMS 출금 계좌와 동일합니다."
          style={{ marginBottom: 28 }}
        />
      </PaddingWrap>
      <DividingLine height="8px" color="#EDEEEF" full />
      <PaddingWrap>
        <CheckTermItem
          onToggleCheck={toggleCheckbox}
          onGoToTerms={onGoToTerm}
          isSelected={isSelected}
          title="[필수] T.POINT 이용약관"
        />
        <Button
          title="신청하기"
          margin={isIphoneX() ? '52px 0 0' : '52px 0 20px'}
          active={Boolean(isSelected && amount)}
          onPress={onSubmit}
        />
      </PaddingWrap>
      <Confirm
        onConfirm={onConfirm}
        onRequestClose={onCloseModal}
        modalVisible={isModal}
        message={`T.POINT를 출금하시겠습니까?\n신청하신 포인트 출금은 취소 또는\n정정할 수 없습니다.`}
      />
    </BodyWrap>
  );
}

const TextWrap = styled(FlexWrap)`
  margin-bottom: 30px;
`;
const PaddingWrap = styled.View`
  padding: 0 20px;
`;
export default RequestWithdrawal;
