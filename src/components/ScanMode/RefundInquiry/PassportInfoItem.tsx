import React from 'react';
import styled from 'styled-components/native';

import { StyledText } from '@/components/common/Text';
import FlexWrap from '@/components/common/FlexWrap';

const StyledWrap = styled(FlexWrap)`
  padding: 14px 0;
  border-bottom-width: 1px;
  border-bottom-color: #e5e6e8;
`;

const Content = styled(StyledText)<{ flex: string }>`
  flex: ${props => props.flex};
  align-items: center;
`;

interface IProps {
  label: string;
  content: string;
}

function PassportInfoItem({ label, content }: IProps) {
  return (
    <StyledWrap>
      <Content color="#5F6165" flex="1">
        {label}
      </Content>
      <Content flex="3">{content}</Content>
    </StyledWrap>
  );
}

export default PassportInfoItem;
