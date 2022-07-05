import React from 'react';
import styled from 'styled-components/native';
import format from 'date-fns/format';

import { StyledText } from '@/components/common/Text';
import FlexWrap from '@/components/common/FlexWrap';
import { SalesAnalysisPeriodType } from '@/types/refund';

const Text = styled(StyledText)`
  font-size: 15px;
  line-height: 22px;
  font-weight: 400;
`;
const StyledWrap = styled(FlexWrap)`
  margin-top: 10px;
  padding: 9px 14px;
  border: 1px solid #cbccce;
`;

interface IProps {
  period: SalesAnalysisPeriodType;
}

function DateBox({ period }: IProps) {
  let periodString = '';
  const day = 1000 * 60 * 60 * 24;

  if (period === 'TODAY') {
    periodString = format(new Date(), 'yyyy.MM.dd');
  } else if (period === 'WEEK') {
    const startDate = format(
      new Date(new Date().getTime() - day * 8),
      'yyyy.MM.dd',
    );

    periodString = `${startDate} ~ ${format(new Date(), 'yyyy.MM.dd')}`;
  } else if (period === 'MONTH') {
    const startDate = format(
      new Date(new Date().getTime() - day * 30),
      'yyyy.MM.dd',
    );

    periodString = `${startDate} ~ ${format(new Date(), 'yyyy.MM.dd')}`;
  } else {
    // TODO: #4 CUSTOM 기간 조회
    periodString = format(new Date(), 'yyyy.MM.dd');
  }

  return (
    <StyledWrap dir="column">
      <Text>{periodString}</Text>
    </StyledWrap>
  );
}

export default DateBox;
