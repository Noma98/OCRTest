import React from 'react';
import { TextStyle } from 'react-native';
import styled from 'styled-components/native';

import TextCommon from '@/components/common/Text';

interface TopText {
  textFirst: string;
  textSecond: string;
  isHighlightFirst?: boolean;
  isHighlightSecond?: boolean;
  isPadding?: boolean;
  textFirstSize?: string;
  textSecondSize?: string;
  textFirstLineHeight?: number;
  textSecondLineHeight?: number;
  gap?: number;
  center?: boolean;
  textFirstStyle?: TextStyle;
  textSecondStyle?: TextStyle;
}

function TopText({
  textFirst,
  textSecond,
  isHighlightFirst = false,
  isHighlightSecond = false,
  isPadding = true,
  textFirstSize = '22px',
  textSecondSize = '22px',
  textFirstLineHeight = 30,
  textSecondLineHeight = 30,
  gap = 0,
  center = false,
  textFirstStyle,
  textSecondStyle,
}: TopText) {
  return (
    <StyledView isPadding={isPadding}>
      <TextCommon
        text={textFirst}
        size={textFirstSize}
        lineHeight={textFirstLineHeight}
        weight={isHighlightFirst ? '500' : '400'}
        marginBottom={gap}
        center={center}
        style={textFirstStyle}
      />
      <TextCommon
        text={textSecond}
        size={textSecondSize}
        lineHeight={textSecondLineHeight}
        weight={isHighlightSecond ? '500' : '400'}
        center={center}
        style={textSecondStyle}
      />
    </StyledView>
  );
}

const StyledView = styled.View<{ isPadding: boolean }>`
  padding: ${props => (props.isPadding ? '20px 20px 28px' : '20px 0px 28px')};
`;
export default TopText;
