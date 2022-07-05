import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import Text from '@/components/common/Text';

interface SignInButtonGroupProps {
  onReset: () => void;
}

function SignInButtonGroup({ onReset }: SignInButtonGroupProps) {
  const navigation = useNavigation();

  const onPress = (path: any) => {
    onReset();
    navigation.navigate(path);
  };

  return (
    <StyledView>
      {/* <StyledButton onPress={() => handleClick(findId)}>
        <SytledText>아이디 찾기</SytledText>
      </StyledButton> */}
      <StyledButton onPress={() => navigation.navigate('EnterBusinessNumber')}>
        <SytledText>비밀번호 재설정</SytledText>
      </StyledButton>
      <Text text="|" color="#CBCCCE" weight="600" />
      <StyledButton onPress={() => onPress('SignUp')}>
        <SytledText>회원가입</SytledText>
      </StyledButton>
    </StyledView>
  );
}

const StyledView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.TouchableOpacity`
  padding: 0px 10px;
`;

const SytledText = styled.Text`
  font-size: 14px;
  line-height: 22px;
`;

export default SignInButtonGroup;
