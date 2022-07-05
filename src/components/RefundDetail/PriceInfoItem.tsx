import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import styled from 'styled-components/native';

import Text from '@/components/common/Text';
import FlexWrap from '@/components/common/FlexWrap';

const PriceWrap = styled(FlexWrap)`
  align-items: flex-end;
`;

const InfoWrap = styled(FlexWrap)`
  padding: 0 14px 16px;
  justify-content: space-between;
  align-items: center;
`;

interface IProps {
  label: string;
  price: string | number;
  style?: StyleProp<TextStyle>;
}

function PriceInfoItem({ label, price, style }: IProps) {
  return (
    <InfoWrap style={style}>
      <Text text={label} />
      <PriceWrap>
        <Text text={price} size="20px" weight="500" marginRight={4} />
        <Text text="원" color="#3A3B3E" />
      </PriceWrap>
    </InfoWrap>
  );
}

export default PriceInfoItem;
