import BodyWrap from '@/components/common/BodyWrap';
import React, { useCallback, useLayoutEffect } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components/native';

import checkIcon from '@/assets/icons/Market/checkCircle.png';
import Text from '@/components/common/Text';
import ErrorMessage from '@/components/common/ErrorMessage';
import FlexWrap from '@/components/common/FlexWrap';
import Button from '@/components/common/Button';

import { WithdrawalResultScreenProps } from '@/types/navigation';
import { comma } from '@/utils/format';
import { isIphoneX } from 'react-native-iphone-x-helper';

interface IProps {
  route: WithdrawalResultScreenProps['route'];
  navigation: WithdrawalResultScreenProps['navigation'];
}

function WithdrawalResult({ route, navigation }: IProps) {
  const { amount, accountNumber, bankName, restPoint } = route.params.data;
  const queryClient = useQueryClient();

  const onPress = useCallback(() => {
    queryClient.invalidateQueries('pointInfo');
    queryClient.invalidateQueries('tpointList');
    navigation.navigate('Tpoint');
  }, [navigation, queryClient]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <></>,
    });
  }, [navigation]);

  return (
    <BodyWrap>
      <Icon source={checkIcon} />
      <Text
        text="T.POINT 출금신청 완료"
        center
        weight="500"
        lineHeight="28"
        size="20px"
        margin={[0, 0, 20]}
      />
      <Container>
        <Text text="신청내역" />
        <ItemWrap>
          <StyledText>출금금액</StyledText>
          <StyledText>{comma(amount)} P</StyledText>
        </ItemWrap>
        <ItemWrap>
          <StyledText>입금계좌</StyledText>
          <StyledText>
            {bankName} {accountNumber}
          </StyledText>
        </ItemWrap>
        <ItemWrap>
          <StyledText>출금 후 잔여 T.POINT</StyledText>
          <StyledText>{comma(restPoint)} P</StyledText>
        </ItemWrap>
      </Container>
      <ErrorMessage
        error="신청하신 T.POINT 출금은 취소 또는 정정할 수 없습니다."
        style={{ marginTop: 20 }}
      />
      <Button
        title="확인"
        active
        position="bottom fixed"
        margin={isIphoneX() ? '-30px 0' : '0'}
        onPress={onPress}
      />
    </BodyWrap>
  );
}
const StyledText = styled.Text`
  font-size: 16px;
  line-height: 24px;
  margin-top: 12px;
  font-weight: 400;
`;
const ItemWrap = styled(FlexWrap)`
  justify-content: space-between;
`;
const Container = styled.View`
  padding: 20px 0;
  border-color: #edeeef;
  border-top-width: 1;
  border-bottom-width: 1;
`;
const Icon = styled.Image`
  height: 36px;
  width: 36px;
  margin: 105px auto 16px;
`;
export default WithdrawalResult;
