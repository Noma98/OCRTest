import React from 'react';
import styled from 'styled-components/native';

import { SalesAnalysisPeriodType } from '@/types/refund';

interface IButtonITem {
  type: 'TODAY' | 'WEEK' | 'MONTH';
  period: SalesAnalysisPeriodType;
  onClick: (period: SalesAnalysisPeriodType) => void;
}
function ButtonItem({ type, period, onClick }: IButtonITem) {
  return (
    <StyledButton
      underlayColor="#F5F6F7"
      onPress={() => {
        onClick(type);
      }}
      disabled={period === type}
      isSelected={period === type}>
      <StyledText isSelected={period === type}>
        {type === 'TODAY' ? '오늘' : type === 'WEEK' ? '1주일' : '1개월'}
      </StyledText>
    </StyledButton>
  );
}
interface ButtonGroupProps {
  onClick: (period: SalesAnalysisPeriodType) => void;
  onClickPeriod: () => void;
  period: SalesAnalysisPeriodType;
}
function ButtonGroup({ onClick, onClickPeriod, period }: ButtonGroupProps) {
  return (
    <StyledView>
      {['TODAY', 'WEEK', 'MONTH'].map(type => (
        <ButtonItem type={type} period={period} onClick={onClick} />
      ))}
      {/* <StyledButton onPress={onClickPeriod} isSelected={period === 'CUSTOM'}>
        <StyledText isSelected={period === 'CUSTOM'}>기간조회</StyledText>
      </StyledButton> */}
    </StyledView>
  );
}
const StyledButton = styled.TouchableHighlight<{ isSelected: boolean }>`
  border: ${props =>
    props.isSelected ? '1px solid #3A3B3E' : '1px solid #cbccce'};
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isSelected ? '#3a3b3e' : '#fff')};
`;

const StyledView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  height: 40px;
`;

const StyledText = styled.Text<{ isSelected: boolean }>`
  font-size: 16px;
  color: ${props => (props.isSelected ? '#fff' : '#000')};
`;
export default React.memo(ButtonGroup);
