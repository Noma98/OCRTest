import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';

import { getFranchiseeAccount } from '@/api/user';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { IFranchiseeAccountResponse } from '@/types/api/user';
import { IError } from '@/types/common';
import { IUserInfo } from '@/types/user';
import { useRoute } from '@react-navigation/core';

function BankAccount() {
  const route = useRoute();
  const { franchiseeIndex } = useAppSelector(
    state => state.user.userInfo as IUserInfo,
  );
  const { data: accountInfo } = useQuery<
    IFranchiseeAccountResponse,
    AxiosError<IError>
  >(
    ['accountInfo', franchiseeIndex],
    () => getFranchiseeAccount(franchiseeIndex),
    {
      retry: false,
      enabled: Boolean(franchiseeIndex),
    },
  );

  return (
    <>
      <ItemWrap>
        <Label>예금주</Label>
        <ItemValue>{accountInfo?.sellerName}</ItemValue>
      </ItemWrap>
      <ItemWrap>
        <Label>은행명</Label>
        <ItemValue>{accountInfo?.bankName}</ItemValue>
      </ItemWrap>
      <ItemWrap>
        <Label>계좌번호</Label>
        <ItemValue>{accountInfo?.accountNumber}</ItemValue>
      </ItemWrap>
      <ItemWrap>
        <Label>{route.name === 'Account' ? '자동이체 출금일' : '입금일'}</Label>
        <ItemValue>
          {route.name === 'Account' && '매월 '}
          {accountInfo?.withdrawalDate}
        </ItemValue>
      </ItemWrap>
    </>
  );
}
const Label = styled.Text`
  color: #9fa1a7;
  font-size: 15px;
  line-height: 22px;
  margin-bottom: 8px;
`;
const ItemValue = styled.Text`
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 20px;
`;
const ItemWrap = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #edeeef;
  margin-bottom: 20px;
`;
export default BankAccount;
