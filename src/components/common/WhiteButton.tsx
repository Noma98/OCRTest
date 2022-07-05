import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  size?: string;
  active: boolean;
  style?: object;
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
  height?: number;
  padding?: string;
}

function WhiteButton({
  title,
  fontSize = '18px',
  onPress,
  margin,
  fontWeight,
  active,
  style,
  padding,
  height = 52,
}: ButtonProps) {
  return (
    <StyledTouchableHighlight
      underlayColor="#F5F6F7"
      margin={margin}
      onPress={onPress}
      active={active}
      disabled={!active}
      height={height}
      padding={padding}
      style={style}>
      <StyledText fontSize={fontSize} fontWeight={fontWeight} active={active}>
        {title}
      </StyledText>
    </StyledTouchableHighlight>
  );
}

interface StyledTouchableHighlightProps {
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
  padding?: string;
  radius?: string;
}

export const StyledTouchableHighlight = styled.TouchableHighlight<StyledTouchableHighlightProps>`
  margin: ${props => (props.margin ? props.margin : '35px 0px')};
  height: ${props => props.height || '50'}px;
  padding: ${props => props.padding || '0'};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #cbccce;
  border-radius: 4px;
`;

const StyledText = styled.Text<{
  fontSize?: string;
  fontWeight?: string;
  active: boolean;
}>`
  font-size: ${props => (props.fontSize ? props.fontSize : '12px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '500')};
`;
export default WhiteButton;
