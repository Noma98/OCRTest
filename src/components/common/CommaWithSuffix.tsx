import React from 'react';
import styled from 'styled-components/native';
import FlexWrap from '@/components/common/FlexWrap';

import Text from '@/components/common/Text';
import { comma } from '@/utils/format';

interface IProps {
  price: number | string;
  isBig?: boolean;
  isColored?: boolean;
  suffix?: '원' | '건' | '₩' | 'P';
  bracketText?: number | undefined;
  size?: string;
}
function CommaWithSuffix({
  price,
  suffix = '원',
  isBig = false,
  isColored = false,
  bracketText,
  size,
}: IProps) {
  return (
    <PriceWrap>
      <Text
        text={comma(price)}
        size={size ? size : isBig ? '36px' : '20px'}
        weight="500"
        color={isColored ? '#005F83' : 'black'}
        lineHeight={isBig ? 54 : 27}
      />
      <Text text={suffix} marginLeft={4} marginBottom={isBig && '8'} />
      {bracketText?.toString() && (
        <Text text={`(${bracketText}${suffix})`} marginLeft={4} />
      )}
    </PriceWrap>
  );
}
const PriceWrap = styled(FlexWrap)`
  align-items: flex-end;
`;

export default CommaWithSuffix;
