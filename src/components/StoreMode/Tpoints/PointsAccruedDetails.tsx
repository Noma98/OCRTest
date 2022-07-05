import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

import FlexWrap from '@/components/common/FlexWrap';
import { StyledText } from '@/components/common/Text';
import { PeriodType } from '@/types/point';

interface PointsAccruedDetailsProps {
  period: PeriodType;
  onClick: (period: PeriodType) => void;
  startDate?: string;
  endDate?: string;
}

function PointsAccruedDetails({
  period,
  onClick,
  startDate,
  endDate,
}: PointsAccruedDetailsProps) {
  return (
    <StyledWrap dir="column">
      <TitleWrap dir="column">
        <Text type="title">T.POINT 적립내역</Text>
      </TitleWrap>
      <ButtonGroup period={period} onClick={onClick} />
      <PeriodWrap dir="column">
        <Text type="period">
          조회 기간 : {startDate} - {endDate}
        </Text>
      </PeriodWrap>
    </StyledWrap>
  );
}

const StyledWrap = styled(FlexWrap)`
  background-color: #f5f6f7;
`;

const TitleWrap = styled(FlexWrap)`
  border-bottom-width: 1px;
  border-bottom-color: #cbccce;
`;

const PeriodWrap = styled(FlexWrap)`
  padding: 9px 20px;
  background-color: #e5e6e8;
`;

interface ButtonGroupProps {
  period: PeriodType;
  onClick: (period: PeriodType) => void;
}
const ButtonGroup = ({ period, onClick }: ButtonGroupProps) => {
  return (
    <ButtonGroupWrap>
      <TouchableOpacity onPress={() => onClick('week')}>
        <Text type="btn" selected={period === 'week'}>
          1주일
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onClick('month')}>
        <Text type="btn" selected={period === 'month'}>
          1개월
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onClick('tmonth')}>
        <Text type="btn" selected={period === 'tmonth'}>
          3개월
        </Text>
      </TouchableOpacity>
    </ButtonGroupWrap>
  );
};

const ButtonGroupWrap = styled(FlexWrap)`
  padding: 20px 20px 14px 20px;
`;

const Text = styled(StyledText)<{ type: string; selected?: boolean }>`
  ${props => {
    switch (props.type) {
      case 'title':
        return css`
          font-size: 16px;
          font-weight: 500;
          padding: 12px 20px;
        `;
      case 'btn':
        return css`
          color: ${props.selected ? props.theme.colors.main : '#9FA1A7'};
          text-decoration: ${props.selected ? 'underline' : 'none'};
          margin-right: 20px;
          font-size: 15px;
          font-weight: 500;
        `;
      case 'period':
        return css`
          font-size: 15px;
          line-height: 22px;
          color: #5f6165;
        `;
    }
  }}
`;
export default PointsAccruedDetails;
