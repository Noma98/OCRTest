import React from 'react';
import { ImageSourcePropType } from 'react-native';
import styled, { css } from 'styled-components/native';

import Text from '@/components/common/Text';

const ButtonWrap = styled.TouchableOpacity<{
  btnPadding?: string;
  bgColor?: string;
  borderColor?: string;
  borderRadius?: string;
  margin?: string;
  reverse?: boolean;
  justifyContent?: string;
}>`
  display: flex;
  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};
  margin: ${props => props.margin || '0px'};
  align-items: center;
  padding: ${props => props.btnPadding || '0px'};
  justify-content: ${props => props.justifyContent || 'center'};
  background-color: ${props => props.bgColor || 'transparent'};
  border-radius: ${props => props.borderRadius || '0px'};
  ${props =>
    props.borderColor &&
    css`
      border-width: 1px;
      border-color: ${props.borderColor};
    `}
`;
const Icon = styled.Image<{
  iconSize: string;
  gap?: string;
  reverse?: boolean;
}>`
  width: ${props => props.iconSize};
  height: ${props => props.iconSize};
  ${props =>
    props.gap &&
    css`
      margin-right: ${props.reverse ? '0px' : props.gap};
      margin-left: ${props.reverse ? props.gap : '0px'};
    `}
`;

interface IProps {
  onPress?: () => void;
  iconSize: string;
  fontSize?: string;
  btnPadding?: string;
  gap?: string;
  text?: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  borderRadius?: string;
  fontWeight?: string;
  iconSource: ImageSourcePropType;
  margin?: string;
  style?: object;
  reverse?: boolean;
  justifyContent?: string;
  activeOpacity?: number;
}
function ButtonWithIcon({
  onPress,
  iconSize,
  fontSize = '18px',
  btnPadding,
  gap,
  textColor,
  bgColor,
  borderColor,
  borderRadius,
  text,
  fontWeight = '500',
  iconSource,
  margin,
  style,
  reverse,
  justifyContent,
  activeOpacity = 0.85,
}: IProps) {
  return (
    <ButtonWrap
      btnPadding={btnPadding}
      bgColor={bgColor}
      borderColor={borderColor}
      borderRadius={borderRadius}
      style={style}
      reverse={reverse}
      onPress={onPress}
      margin={margin}
      justifyContent={justifyContent}
      activeOpacity={activeOpacity}>
      <Icon
        iconSize={iconSize}
        gap={gap}
        source={iconSource}
        reverse={reverse}
      />
      {text && (
        <Text
          text={text}
          color={textColor}
          size={fontSize}
          weight={fontWeight}
        />
      )}
    </ButtonWrap>
  );
}

export default ButtonWithIcon;
