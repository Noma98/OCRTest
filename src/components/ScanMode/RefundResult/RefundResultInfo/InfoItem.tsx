import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

import TextCommon from '@/components/common/Text';
import FlexWrap from '@/components/common/FlexWrap';

const StyledWrap = styled(FlexWrap)`
  margin-top: 16px;
  justify-content: space-between;
  align-items: center;
`;

const PriceWrap = styled(FlexWrap)`
  align-items: flex-end;
`;

const LabelWrapper = styled.View`
  flex-direction: row;
`;

interface InfoItemProps {
  label: string;
  price: string;
  isKOR?: boolean;
  style?: StyleProp<ViewStyle>;
  labelMarginTop?: string;
}
function InfoItem({
  label,
  price,
  isKOR,
  style,
  labelMarginTop,
}: InfoItemProps) {
  return (
    <StyledWrap style={style}>
      <LabelWrapper>
        <TextCommon text={label} marginTop={labelMarginTop} />
      </LabelWrapper>
      <PriceWrap>
        <TextCommon text={price} size="24px" weight="500" lineHeight={32} />
        <TextCommon
          text={isKOR ? '원' : '₩'}
          size="14px"
          lineHeight={22}
          marginLeft={4}
        />
      </PriceWrap>
    </StyledWrap>
  );
}

export default InfoItem;
