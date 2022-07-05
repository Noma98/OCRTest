import React from 'react';
import { isIphoneX } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import Button from '@/components/common/Button';
import TopText from '@/components/common/TopText';
import PassportInfo from '@/components/ScanMode/RefundInquiry/PassPortInfo';
import RefundLimit from '@/components/ScanMode/RefundInquiry/RefundLimit';
import useToday from '@/hooks/useToday';
import { IPassportInfo } from '@/types/passport';
import { IRefundLimit } from '@/types/refund';

const Container = styled.SafeAreaView`
  flex: 1;
  position: relative;
`;

const Wrapper = styled.View`
  flex: 1;
`;

interface IProps {
  passportInfo: IPassportInfo;
  inquiryInfo: IRefundLimit;
  onClick: () => void;
}

function RefundInquiryPresenter({
  passportInfo,
  inquiryInfo,
  onClick,
}: IProps) {
  const { date, daysOfWeek, isAm, time } = useToday();

  return (
    <Container>
      <Wrapper>
        <TopText
          textFirst={`${date} ${daysOfWeek}`}
          textSecond={`${time} ${isAm}`}
        />
        <RefundLimit
          limit={inquiryInfo.beforeDeduction}
          name={`${passportInfo.lastName} ${passportInfo.firstName}`}
        />
        <PassportInfo passportInfo={passportInfo} />
      </Wrapper>
      <Button
        title="다음"
        backgroundColor="#3A3B3E"
        color="white"
        borderColor="#3A3B3E"
        onPress={onClick}
        margin={isIphoneX() ? '0 20px' : '20px'}
        active={true}
      />
    </Container>
  );
}

export default RefundInquiryPresenter;
