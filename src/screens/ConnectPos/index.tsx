import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useMutation } from 'react-query';
import styled from 'styled-components/native';

import { updatePosInfo } from '@/api/pos';
import Button from '@/components/common/Button';
import DividingLine from '@/components/common/DividingLine';
import FlexWrap from '@/components/common/FlexWrap';
import SelectCategory from '@/components/common/SelectCategory';
import Text from '@/components/common/Text';
import ToggleButton from '@/components/common/ToggleButton';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import { updateUserPosInfo } from '@/store/modules/user';
import { IUpdatePosInfoPayload } from '@/types/api/pos';
import { IError } from '@/types/common';
import { ConnectPosScreenProps } from '@/types/navigation';
import { IUserInfo, PosType } from '@/types/user';

interface IProps {
  navigation: ConnectPosScreenProps['navigation'];
}
function ConnectPos({ navigation }: IProps) {
  const {
    franchiseeIndex,
    isConnectedPos: prevIsConnected,
    posType: prevPosType,
  } = useAppSelector(state => state.user.userInfo) as IUserInfo;
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(prevIsConnected);
  const [posType, setPosType] = useState<PosType>(prevPosType);
  const toggleActive = async () => {
    setActive(state => !state);
    return true;
  };
  const onCategoryChange = (value: PosType) => {
    setPosType(value);
  };
  const mutation = useMutation<
    number,
    AxiosError<IError>,
    IUpdatePosInfoPayload
  >(payload => updatePosInfo(payload), {
    retry: false,
    onSuccess: () => {
      dispatch(
        updateUserPosInfo({
          isConnectedPos: active,
          posType: active ? posType : '사용중인 포스기 선택',
        }),
      );
      navigation.navigate('SelectMode', {
        referrer: 'POS',
        isConnectedPos: active,
      });
    },
  });
  const onSubmit = () => {
    Alert.alert(
      'KTP',
      active
        ? '선택하신 포스기와 연결하여 사용하시겠습니까?'
        : '포스기와 연결을 해제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: () =>
            mutation.mutate({
              franchiseeIndex,
              isConnectedPos: active,
              posType: active ? posType : '사용중인 포스기 선택',
            }),
          style: 'default',
        },
      ],
    );
  };
  return (
    <>
      <Container>
        <DividingLine text="포스기와 연결 설정" />
        <ContentWrap>
          <FlexItem>
            <Text text="포스기와 연결하기" />
            <ToggleButton onToggleCallback={toggleActive} active={active} />
          </FlexItem>
          {active && (
            <SelectCategory<PosType>
              category={posType as PosType}
              isSelected={posType !== '사용중인 포스기 선택'}
              itemList={[
                '사용중인 포스기 선택',
                '그로잉세일즈',
                // 'OK 포스',
                // '포스뱅크',
              ]}
              label="포스기 선택"
              onCategoryChange={onCategoryChange}
              isRequired
            />
          )}
        </ContentWrap>
      </Container>
      <Button
        active={!active || posType !== '사용중인 포스기 선택'}
        title="완료"
        onPress={onSubmit}
        isPadding
        position="bottom fixed"
        margin="0"
      />
    </>
  );
}
const Container = styled.SafeAreaView`
  flex: 1;
`;
const ContentWrap = styled.View`
  padding: 0 20px;
`;
const FlexItem = styled(FlexWrap)`
  align-items: center;
  justify-content: space-between;
  height: 64px;
  border-bottom-width: 1px;
  border-color: #edeeef;
  margin-bottom: 20px;
`;

export default ConnectPos;
