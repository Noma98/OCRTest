import React from 'react';
import DashedLine from 'react-native-dashed-line';
import styled from 'styled-components/native';

import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';

const LineContainer = styled.View`
  flex: 1;
  padding-top: 13px;
`;
const Item = styled(FlexWrap)`
  margin-bottom: 24px;
`;

interface IProps {
  label: string;
  value: string;
}

function DashedItem({ label, value }: IProps) {
  return (
    <Item>
      <Text marginRight={10} text={label} />
      <LineContainer>
        <DashedLine
          dashColor="#9FA1A7"
          dashLength={5}
          dashThickness={1}
          dashGap={3}
        />
      </LineContainer>
      <Text marginLeft={10} text={value} weight="500" />
    </Item>
  );
}

export default DashedItem;
