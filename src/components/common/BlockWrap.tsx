import React from 'react';
import {
  Keyboard,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View<{ isPadding: boolean }>`
  flex: 1;
  padding: ${props => (props.isPadding ? '0 20px' : '0')};
`;

interface IProps {
  children: React.ReactNode;
  isPadding?: boolean;
  style?: StyleProp<ViewStyle>;
}

function BlockWrap({ children, isPadding = true, style }: IProps) {
  const onKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <StyledSafeAreaView>
      <TouchableWithoutFeedback onPress={onKeyboardDismiss}>
        <Container isPadding={isPadding} style={style}>
          {children}
        </Container>
      </TouchableWithoutFeedback>
    </StyledSafeAreaView>
  );
}

export default BlockWrap;
