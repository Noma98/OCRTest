import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import styled, { css } from 'styled-components/native';

import FlexWrap from '@/components/common/FlexWrap';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  position?: string;
  size?: string;
  active: boolean;
  style?: object;
  margin?: string;
  fixed?: string;
  fontSize?: string;
  fontWeight?: string;
  height?: number;
  isPadding?: boolean;
  radius?: string;
  activeOpacity?: number;
}

function Button({
  title,
  fontSize = '18px',
  backgroundColor,
  color,
  onPress,
  borderColor,
  margin,
  position,
  fixed,
  fontWeight,
  active,
  style,
  isPadding = false,
  radius,
  height = 52,
  activeOpacity = 0.85,
}: ButtonProps) {
  return (
    <>
      {isPadding ? (
        <Container isPadding={isPadding}>
          <StyledTouchableOpacity
            isPadding={isPadding}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            activeOpacity={activeOpacity}
            margin={margin}
            onPress={onPress}
            position={position}
            fixed={fixed}
            active={active}
            disabled={!active}
            height={height}
            radius={radius}
            style={style}>
            <StyledText
              color={color}
              fontSize={fontSize}
              fontWeight={fontWeight}
              active={active}>
              {title}
            </StyledText>
          </StyledTouchableOpacity>
        </Container>
      ) : (
        <StyledTouchableOpacity
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          activeOpacity={activeOpacity}
          margin={margin}
          onPress={onPress}
          position={position}
          fixed={fixed}
          active={active}
          disabled={!active}
          height={height}
          radius={radius}
          style={style}>
          <StyledText
            color={color}
            fontSize={fontSize}
            fontWeight={fontWeight}
            active={active}>
            {title}
          </StyledText>
        </StyledTouchableOpacity>
      )}
    </>
  );
}

interface StyledTouchableOpacityProps {
  backgroundColor?: string;
  borderColor?: string;
  position?: string;
  size?: string;
  active: boolean;
  style?: object;
  margin?: string;
  fixed?: string;
  fontSize?: string;
  height?: number;
  radius?: string;
  isPadding?: boolean;
}

export const StyledTouchableOpacity = styled.TouchableOpacity<StyledTouchableOpacityProps>`
  margin: ${props =>
    props.margin ? props.margin : isIphoneX() ? '30px 0' : '20px 0'};
  height: ${props => props.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props =>
    props.isPadding &&
    css`
      width: 100%;
    `}
  background-color: ${props =>
    props.active
      ? props.backgroundColor
        ? props.backgroundColor
        : props.theme.colors.active
      : '#EDEEEF'};
  border: ${props =>
    props.borderColor && props.active
      ? `1px solid ${props.borderColor}`
      : '1px solid white'};

  border-radius: ${props => (props.radius ? props.radius : 4)}px;
  ${props => {
    if (props.position === 'bottom fixed') {
      return css`
        width: 100%;
        position: absolute;
        bottom: ${isIphoneX() ? '30px' : '20px'};
      `;
    }
  }};
`;

const Container = styled(FlexWrap)<{ isPadding?: boolean }>`
  padding: ${props => (props.isPadding ? '0 20px' : '0')};
  justify-content: center;
  width: 100%;
`;
const StyledText = styled.Text<{
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  active: boolean;
}>`
  color: ${props =>
    props.active ? (props.color ? props.color : 'white') : '#9FA1A7'};
  font-size: ${props => props.fontSize};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '500')};
`;
export default Button;
