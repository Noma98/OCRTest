import React from 'react';
import styled from 'styled-components/native';

import Text from '@/components/common/Text';
import FlexWrap from '@/components/common/FlexWrap';

interface IBarData {
  info: string[];
  date: string;
}
interface IBarProps {
  data: IBarData;
  heightArr: number[];
}

function BarItems({ data: { date, info }, heightArr }: IBarProps) {
  return (
    <Container dir="column">
      <BarItemsWrap>
        <Bar height={heightArr[0]} color="#ff5239">
          <Text
            text={info[0]}
            center
            style={{
              position: 'absolute',
              top: -30,
              width: 100,
              left: 0,
              transform: [{ translateX: -33 }],
            }}
          />
        </Bar>
        <Bar height={heightArr[1]} color="#E5E6E8">
          <Text
            text={info[1]}
            center
            style={{
              position: 'absolute',
              top: -30,
              width: 100,
              left: 0,
              transform: [{ translateX: -33 }],
            }}
          />
        </Bar>
      </BarItemsWrap>
      <Text text={date} center />
    </Container>
  );
}
const Container = styled(FlexWrap)`
  flex: 1;
`;
const BarItemsWrap = styled(FlexWrap)`
  justify-content: center;
  align-items: flex-end;
  border-bottom-width: 1px;
  border-bottom-color: #3a3b3e;
  margin-bottom: 16px;
`;
const Bar = styled.View<{ height: number; color: string }>`
  position: relative;
  margin: 0 15px;
  height: ${props => props.height}px;
  width: 33px;
  background-color: ${props => props.color};
  border: 1px solid #3a3b3e;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-width: 0px;
`;
export default BarItems;
