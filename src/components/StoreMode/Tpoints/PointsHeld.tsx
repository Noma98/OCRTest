import { useNavigation } from '@react-navigation/core';
import { AxiosError } from 'axios';
import React from 'react';
import { Alert } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';

import { getTpointInfo } from '@/api/store';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';
import WhiteButton from '@/components/common/WhiteButton';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { ITPointInfoResponse } from '@/types/api/store';
import { IError } from '@/types/common';
import { IUserInfo } from '@/types/user';
import { comma } from '@/utils/format';

function PointsHeld() {
  const { franchiseeIndex, franchiseeStatus } = useAppSelector(
    state => state.user.userInfo as IUserInfo,
  );
  const navigation = useNavigation();
  const { data } = useQuery<ITPointInfoResponse, AxiosError<IError>>(
    ['pointInfo', franchiseeIndex],
    () => getTpointInfo({ franchiseeIndex }),
    {
      enabled: Boolean(franchiseeIndex),
      retry: false,
    },
  );
  const onPress = () => {
    if (franchiseeStatus !== 'ACCEPTED') {
      Alert.alert('KTP', 'T.POINT 출금은\n가맹점 승인 후 이용할 수 있습니다.', [
        { text: '확인' },
      ]);
      return;
    }
    navigation.navigate('RequestWithdrawal', {
      tpoint: data?.totalPoint,
    });
  };
  return (
    <Container>
      <PointWrap>
        <Text text="출금가능한 T.POINT" color="#5F6165" />
        <Text
          text={`${comma(data ? data.totalPoint : '0')} P`}
          size="24px"
          lineHeight={35}
          color="#005F83"
        />
      </PointWrap>
      <ItemWrap>
        <StyledText>적립 예정</StyledText>
        <StyledText>{comma(data ? data.scheduledPoint : '0')} P</StyledText>
      </ItemWrap>
      <ItemWrap>
        <StyledText>한달이내 소멸</StyledText>
        <StyledText>{comma(data ? data.disappearPoint : '0')} P</StyledText>
      </ItemWrap>
      <WhiteButton
        onPress={onPress}
        active
        title="T.POINT 출금하기"
        margin="28px 0"
      />
    </Container>
  );
}
const StyledText = styled.Text`
  font-size: 16px;
  color: #5f6165;
  line-height: 24px;
  margin-top: 8px;
`;
const PointWrap = styled(FlexWrap)`
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-color: #edeeef;
`;
const ItemWrap = styled(FlexWrap)`
  align-items: center;
  justify-content: space-between;
`;
const Container = styled.View`
  padding: 0 20px;
`;
export default PointsHeld;
