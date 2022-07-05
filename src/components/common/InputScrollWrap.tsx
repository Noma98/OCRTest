import React from 'react';
import styled from 'styled-components/native';
import InputScrollView from 'react-native-input-scroll-view';

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

interface IProps {
  children: React.ReactNode;
}

function InputScrollWrap({ children }: IProps) {
  return (
    <StyledSafeAreaView>
      <InputScrollView keyboardOffset={150} useAnimatedScrollView={true}>
        {children}
      </InputScrollView>
    </StyledSafeAreaView>
  );
}

export default InputScrollWrap;
