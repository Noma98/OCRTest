import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import React, { useMemo, useReducer } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components/native';

import { updateFranchiseeAccount } from '@/api/user';
import BlockWrap from '@/components/common/BlockWrap';
import Button from '@/components/common/Button';
import AccountInfoForm from '@/components/FranchiseeApplication/AccountInfoForm';
import { useAppSelector } from '@/hooks/useReduxHooks';
import {
  IFranchiseeAccountResponse,
  IUpdateFranchiseeAccountPayload,
} from '@/types/api/user';
import { IError } from '@/types/common';
import { BankType, TransferDaysType } from '@/types/user';

const Container = styled.View`
  margin: 20px 0 0;
`;

export interface IFAState {
  selectedBank: BankType;
  accountNumber: string;
  transferDay: TransferDaysType;
  isValidAccountNumber: boolean;
}

const initialState: IFAState = {
  selectedBank: '은행 선택',
  accountNumber: '',
  transferDay: '출금일 선택',
  isValidAccountNumber: false,
};

type ActionType = 'SET_VALUE';
interface IAction {
  type: ActionType;
  payload?: any;
}

function applyReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        ...(action.payload.name === 'accountNumber' && {
          isValidAccountNumber: false,
        }),
        ...(action.payload.name === 'selectedBank' && {
          isValidAccountNumber: false,
        }),
      };
    default:
      throw Error(`Unhandled type Error: ${action.type}`);
  }
}

function EditAccount() {
  const franchiseeIndex = useAppSelector(
    state => state.user.userInfo?.franchiseeIndex,
  ) as number;
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const existedData = queryClient.getQueryData<IFranchiseeAccountResponse>([
    'accountInfo',
    franchiseeIndex,
  ]);
  const [state, dispatch] = useReducer(applyReducer, {
    selectedBank: (existedData?.bankName || '은행 선택') as BankType,
    accountNumber: existedData?.accountNumber || '',
    transferDay: (existedData?.withdrawalDate ||
      '출금일 선택') as TransferDaysType,
    isValidAccountNumber: false,
  });
  const { accountNumber, selectedBank, transferDay, isValidAccountNumber } =
    state;

  const mutation = useMutation<
    IFranchiseeAccountResponse,
    AxiosError<IError>,
    IUpdateFranchiseeAccountPayload
  >(payload => updateFranchiseeAccount(payload), {
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries(['accountInfo', franchiseeIndex]);
      Alert.alert('KTP', '계좌 정보 변경이 완료되었습니다.', [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    },
  });

  const isButtonAcitve = useMemo(
    () =>
      selectedBank !== '은행 선택' &&
      transferDay !== '출금일 선택' &&
      Boolean(accountNumber.trim()),
    [selectedBank, transferDay, accountNumber],
  );

  const onPress = () => {
    if (!isButtonAcitve) {
      return;
    }
    //QA 목적 => 완료되면 수정 필요
    // if (!isValidAccountNumber) {
    //   Alert.alert('KTP', '계좌번호를 인증해주세요.');
    //   return;
    // }

    mutation.mutate({
      franchiseeIndex,
      accountNumber,
      bankName: selectedBank,
      withdrawalDate: transferDay,
    });
  };

  return (
    <>
      <BlockWrap isPadding={false}>
        <Container>
          <AccountInfoForm state={state} dispatch={dispatch} isUpdate />
        </Container>
      </BlockWrap>
      <Button
        position="bottom fixed"
        active={isButtonAcitve}
        title="변경완료"
        margin="0"
        isPadding
        onPress={onPress}
      />
    </>
  );
}

export default EditAccount;
