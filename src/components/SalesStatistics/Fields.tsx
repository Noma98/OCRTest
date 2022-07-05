import React from 'react';
import styled from 'styled-components/native';

import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';

interface IProps {
  fieldArr: string[];
}
function Fields({ fieldArr }: IProps) {
  return (
    <FlexWrap>
      <FieldItem>
        <Box color="#ff5239" />
        <Text text={fieldArr[0]} />
      </FieldItem>
      <FieldItem>
        <Box color="#E5E6E8" />
        <Text text={fieldArr[1]} />
      </FieldItem>
    </FlexWrap>
  );
}

const FieldItem = styled(FlexWrap)`
  align-items: center;
  flex: 1;
`;
const Box = styled.View<{ color: string }>`
  height: 14px;
  width: 50px;
  background-color: ${props => props.color};
  margin-right: 10px;
  border: 1px solid #3a3b3e;
`;
export default Fields;
