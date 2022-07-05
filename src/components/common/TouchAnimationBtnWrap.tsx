import React, { useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

const StyledPressable = styled.Pressable``;

interface IItemProps {
  onPress: () => void;
  children: React.ReactNode;
  customStyle?: Object;
}

function TouchAnimationBtnWrap(props: IItemProps) {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const { onPress, children, customStyle } = props;

  const fadeIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onPress();
  };

  const btnInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255,255,255)', 'rgb(245,246,247)'],
  });
  const animatedStyle = {
    backgroundColor: btnInterpolation,
  };

  return (
    <StyledPressable onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View style={{ ...animatedStyle, ...customStyle }}>
        <>{children}</>
      </Animated.View>
    </StyledPressable>
  );
}

export default TouchAnimationBtnWrap;
