import React from 'react';
import { TextStyle } from 'react-native';
import styled, { css } from 'styled-components/native';

import { CalculateBlock, MPB } from '@/utils/common';

interface TextCommonProps {
  text: string;
  size?: string;
  weight?: string;
  color?: string;
  margin?: [number, number?, number?, number?];
  lineHeight?: number;
  className?: string;
  center?: boolean;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  children?: React.ReactNode;
  style?: TextStyle;
}
function TextCommon({
  text,
  size,
  weight,
  color,
  className,
  lineHeight,
  margin = [0],
  center,
  children,
  style,
  ...textProps
}: TextCommonProps) {
  const marginProps = CalculateBlock(margin, MPB.Margin);

  const styleProps = {
    ...marginProps,
  };

  return (
    <StyledText
      {...styleProps}
      className={className}
      size={size}
      weight={weight}
      color={color}
      center={center}
      lineHeight={lineHeight}
      style={style}
      {...textProps}>
      {text}
      <>{children}</>
    </StyledText>
  );
}

export const StyledText = styled.Text<{
  size?: string;
  weight?: string;
  color?: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  lineHeight?: number;
  className?: string;
  center?: boolean;
}>`
  font-size: ${props => (props.size ? props.size : '16px')};
  font-weight: ${props => (props.weight ? props.weight : '400')};
  line-height: ${props => (props.lineHeight ? props.lineHeight : 24)}px;
  color: ${props => (props.color ? props.color : 'black')};
  ${props =>
    props.marginRight &&
    css`
      margin-right: ${props.marginRight}px;
    `};
  ${props =>
    props.marginLeft &&
    css`
      margin-left: ${props.marginLeft}px;
    `};
  ${props =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop}px;
    `};
  ${props =>
    props.marginBottom &&
    css`
      margin-bottom: ${props.marginBottom}px;
    `};
  ${props =>
    props.center &&
    css`
      text-align: center;
    `};
`;

export default TextCommon;
