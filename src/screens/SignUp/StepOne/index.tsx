import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { isIphoneX } from 'react-native-iphone-x-helper';

import stepOne from '@/assets/icons/Auth/stepOne.png';
import Button from '@/components/common/Button';
import TermsAgree from '@/components/SignUp/TermsAgree';
import BlockWrap from '@/components/common/BlockWrap';
import useTermsState from '@/hooks/useTermsState';

const StepProgress = styled.Image`
  width: 100%;
  height: 52px;
  margin: 0 0 100px;
`;
const ButtonWrapper = styled.View`
  flex: 1;
`;

function StepOne() {
  const { personalTerms, serviceTerms } = useTermsState();
  const navigation = useNavigation();

  const onPress = () => {
    if (!personalTerms || !serviceTerms) {
      return;
    }
    navigation.navigate('StepTwo');
  };

  return (
    <>
      <StepProgress source={stepOne} />
      <BlockWrap>
        <TermsAgree />
        <ButtonWrapper>
          <Button
            title="다음"
            position="bottom fixed"
            active={personalTerms && serviceTerms}
            margin={isIphoneX() ? '-30px 0' : '0'}
            onPress={onPress}
          />
        </ButtonWrapper>
      </BlockWrap>
    </>
  );
}

export default StepOne;
