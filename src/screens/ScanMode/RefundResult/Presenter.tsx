import { StackNavigationProp } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/native';

import BlockWrap from '@/components/common/BlockWrap';
import Button from '@/components/common/Button';
import ButtonGruop from '@/components/ScanMode/RefundResult/ButtonGroup';
import RefundResultInfo from '@/components/ScanMode/RefundResult/RefundResultInfo';
import TopCompleteNotice from '@/components/ScanMode/RefundResult/TopCompleteNotice';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { MainStackNavigationParamList } from '@/types/navigation';
import { IPassportInfo } from '@/types/passport';
import { Refund } from '@/types/refund';
import { IUserInfo } from '@/types/user';
import { isAndroid } from '@/utils/check';

interface IProps {
  refundData: Refund;
  navigation: StackNavigationProp<MainStackNavigationParamList, 'RefundResult'>;
}

function RefundResultPresenter({ refundData, navigation }: IProps) {
  const { nationality } = useAppSelector(
    state => state.refund.passportInfo as IPassportInfo,
  );
  const { userSelector, isActiveSound, isActiveVibration, isConnectedPos } =
    useAppSelector(state => state.user.userInfo as IUserInfo);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${
        nationality === 'CHN'
          ? '退税成功 / '
          : nationality === 'JPN'
          ? '還付完了 / '
          : nationality !== 'KOR'
          ? 'Refund Completed / '
          : ''
      }환급완료`,
    });
  }, [navigation, nationality]);

  const onPressLeft = () => {
    navigation.reset({
      index: 1,
      routes: [
        { name: 'SelectMode' },
        {
          name: 'ScanMode',
          params: {
            referrer: 'Approval',
            isActiveSound,
            isActiveVibration,
            isConnectedPos,
          },
        },
      ],
    });
  };
  const onPressRight = () => {
    navigation.navigate('StoreMode');
    navigation.reset({
      index: 1,
      routes: [{ name: 'SelectMode' }, { name: 'StoreMode' }],
    });
  };
  return (
    <>
      <BlockWrap>
        <TopCompleteNotice nationality={nationality} />
        <RefundResultInfo nationality={nationality} refundData={refundData} />
      </BlockWrap>
      {userSelector === 'FRANCHISEE' ? (
        <ButtonGruop
          onPressLeft={onPressLeft}
          onPressRight={onPressRight}
          textLeft="확인"
          textRight="환급현황 보기"
        />
      ) : (
        <BtnWrap>
          <Button
            active
            onPress={onPressLeft}
            title="확인"
            position="bottom fixed"
            margin={isAndroid() ? '0' : undefined}
          />
        </BtnWrap>
      )}
    </>
  );
}
const BtnWrap = styled.View`
  padding: 0 20px;
  display: flex;
  align-items: center;
`;
export default RefundResultPresenter;
