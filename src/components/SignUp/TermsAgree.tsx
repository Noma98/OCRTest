import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import styled from 'styled-components/native';

import CheckBox from '@/components/common/CheckBox';
import CheckTermItem from '@/components/common/CheckTermItem';
import Text from '@/components/common/Text';
import useTermsDispatch from '@/hooks/useTermsDispatch';
import useTermsState from '@/hooks/useTermsState';

function TermsAgree() {
  const dispatch = useTermsDispatch();
  const { personalTerms, serviceTerms } = useTermsState();
  const navigation = useNavigation();

  const onGoPersonalTerms = useCallback(() => {
    navigation.navigate('Terms', { type: 'PERSONAL_TYPE' });
  }, [navigation]);

  const onGoServiceTerms = useCallback(() => {
    navigation.navigate('Terms', { type: 'SERVICE_TYPE' });
  }, [navigation]);

  const onTogglePersonalTerms = useCallback(() => {
    dispatch({ type: 'TOGGLE_PERSONAL_TERMS' });
  }, [dispatch]);

  const onToggleServiceTerms = useCallback(() => {
    dispatch({ type: 'TOGGLE_SERVICE_TERMS' });
  }, [dispatch]);

  const onAgreeAll = useCallback(() => {
    dispatch({ type: 'TOGGLE_ALL' });
  }, [dispatch]);

  return (
    <View>
      <CheckBoxWrap>
        <Wrap>
          <RowWrapper onPress={onAgreeAll}>
            <CheckBox isSelected={serviceTerms && personalTerms} />
            <Text text="전체 동의" size="18px" marginLeft={8} />
          </RowWrapper>
        </Wrap>
      </CheckBoxWrap>
      <Border />
      <CheckTermItem
        onToggleCheck={onTogglePersonalTerms}
        isSelected={personalTerms}
        onGoToTerms={onGoPersonalTerms}
        title="[필수] 개인정보 이용/수집 동의"
      />
      <CheckTermItem
        onToggleCheck={onToggleServiceTerms}
        isSelected={serviceTerms}
        onGoToTerms={onGoServiceTerms}
        title="[필수] 서비스 이용약관"
      />
    </View>
  );
}
export default TermsAgree;

const Border = styled.View`
  height: 1px;
  background-color: #e5e6e8;
  margin: 15px 0;
`;

const RowWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 4px;
`;

const CheckBoxWrap = styled.View`
  margin: 10px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Wrap = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
