import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled, { css } from 'styled-components/native';

import Text from '@/components/common/Text';

const StyledView = styled.View<{
  height: string;
  color?: string;
  full: boolean;
  version?: 'small' | 'large';
}>`
  display: flex;
  justify-content: center;
  padding: ${props => (props.version === 'large' ? '0 20px' : '0 16px')};
  width: 100%;
  height: ${props => props.height};
  background-color: ${props => props.color};
  ${props => {
    if (props.full) {
      return css`
        margin: 0 0 20px;
        width: 100%;
      `;
    }
  }}
`;
interface DividingLineProps {
  height?: string;
  color?: string;
  text?: string;
  fontColor?: string;
  fontSize?: string;
  full?: boolean;
  version?: 'small' | 'large';
  style?: StyleProp<ViewStyle>;
}

function DividingLine({
  height = '42px',
  color = '#EDEEEF',
  text,
  fontColor = 'black',
  full = false,
  style,
  version = 'large',
}: DividingLineProps) {
  return (
    <StyledView
      height={height}
      color={color}
      full={full}
      version={version}
      style={style}>
      {text && <Text text={text} color={fontColor} size="15px" />}
    </StyledView>
  );
}

export default DividingLine;
