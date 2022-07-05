import React, { useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

interface IProps {
  active: boolean;
  onToggleCallback: () => Promise<boolean>;
}
function ToggleButton({ active, onToggleCallback }: IProps) {
  const animRef = useRef(new Animated.Value(active ? 27 : 0)).current;

  const onPress = async () => {
    if (active) {
      const result = await onToggleCallback();
      if (result) {
        Animated.timing(animRef, {
          duration: 300,
          toValue: -1,
          useNativeDriver: true,
        }).start();
      }
    } else {
      const result = await onToggleCallback();
      if (result) {
        Animated.timing(animRef, {
          duration: 300,
          toValue: 27,
          useNativeDriver: true,
        }).start();
      }
    }
  };
  return (
    <Container activeOpacity={0.85} active={active} onPress={onPress}>
      <Animated.View
        style={{
          height: 28,
          width: 28,
          borderRadius: 14,
          backgroundColor: 'white',
          transform: [
            {
              translateX: animRef,
            },
          ],
        }}></Animated.View>
    </Container>
  );
}
const Container = styled.TouchableOpacity<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 60px;
  background-color: ${props => (props.active ? '#005F83' : '#cbccce')};
  border: 2px solid ${props => (props.active ? '#005F83' : '#cbccce')};
  border-radius: 16px;
`;
export default ToggleButton;
