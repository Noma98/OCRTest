import React from 'react';
import styled from 'styled-components/native';

import TextCommon from '@/components/common/Text';
interface TopText {
  textFirst: string;
  textSecond: string;
}
function TopText(props: TopText) {
  return (
    <StyledView>
      <TextCommon text={props.textFirst} size="22px" lineHeight={30} />
      <TextCommon text={props.textSecond} size="22px" lineHeight={30} />
    </StyledView>
  );
}

const StyledView = styled.View`
  margin: 20px 0px 30px 0px;
  padding: 0 20px;
`;
export default TopText;
