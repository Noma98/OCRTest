import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import styled from 'styled-components/native';

import Button from '@/components/common/Button';
import InputScrollWrap from '@/components/common/InputScrollWrap';
import LoadingView from '@/components/common/LoadingView';
import TopText from '@/components/common/TopText';
import Caution from '@/components/ScanMode/PurchaseInfo/Caution';
import PurchaseInfoForm from '@/components/ScanMode/PurchaseInfo/PurchaseInfoForm';
import RefundLimit from '@/components/ScanMode/RefundInquiry/RefundLimit';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { Refund } from '@/types/refund';

const Container = styled.View`
  padding: 0 20px 40px;
`;

interface IProps {
  refundData: Refund;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onClick: () => void;
}

function Presenter({ refundData, onChange, onClick }: IProps) {
  const { inquiryInfo, passportInfo, status } = useAppSelector(
    state => state.refund,
  );
  const isActiveBtn = Boolean(
    refundData?.originPrice &&
      refundData?.originPrice.trim() !== '' &&
      refundData?.originPrice !== '0',
  );

  return (
    <>
      <InputScrollWrap>
        <TopText
          isHighlightSecond
          textFirst="상품금액을"
          textSecond="입력해주세요"
        />
        <RefundLimit
          limit={inquiryInfo?.beforeDeduction || '0'}
          name={`${passportInfo?.lastName} ${passportInfo?.firstName}`}
        />
        <Container>
          <Caution text="정확하게 입력해주세요" />
          <PurchaseInfoForm refundData={refundData} onChange={onChange} />
        </Container>
        {status === 'loading' && <LoadingView isOpacity />}
      </InputScrollWrap>
      <Button
        isPadding
        title="환급하기"
        backgroundColor="#3A3B3E"
        position="bottom fixed"
        color="white"
        margin="0 20px"
        onPress={onClick}
        active={isActiveBtn}
      />
    </>
  );
}

export default Presenter;
