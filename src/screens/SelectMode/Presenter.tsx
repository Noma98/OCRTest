import { useNavigation } from '@react-navigation/core';
import { AxiosError } from 'axios';
import React, { useLayoutEffect } from 'react';
import Modal from 'react-native-modal';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';

import { getUnreadAlert } from '@/api/push';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';
import TopText from '@/components/common/TopText';
import { AlertBtn, SettingBtn } from '@/components/Header';
import Applicant from '@/components/Modal/Applicant';
import ModeCard from '@/components/SelectMode/ModeCard';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { IError } from '@/types/common';
import { IUserInfo } from '@/types/user';
import BodyWrap from '@components/common/BodyWrap';

interface IProps {
  goApprovalScreen: () => void;
  goCancelScreen: () => void;
  goToSalesAnalysis: () => void;
  goToTpoint: () => void;
  goToMyPage: () => void;
  isModal: boolean;
  isToast: boolean;
  doItLater: () => void;
  dontWatchItAnymore: () => void;
  goToFranchiseeApplicant: () => void;
}

function SelectModePresenter({
  goApprovalScreen,
  goCancelScreen,
  goToSalesAnalysis,
  goToTpoint,
  goToMyPage,
  isModal,
  isToast,
  doItLater,
  dontWatchItAnymore,
  goToFranchiseeApplicant,
}: IProps) {
  const { userSelector, franchiseeIndex, employeeIndex, isConnectedPos } =
    useAppSelector(state => state.user.userInfo) as IUserInfo;
  const navigation = useNavigation();
  const { data: unreadAlertCount } = useQuery<number, AxiosError<IError>>(
    ['unreadAlertCount', franchiseeIndex],
    () => getUnreadAlert(franchiseeIndex),
    {
      enabled: !employeeIndex,
      retry: false,
    },
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight:
        userSelector === 'EMPLOYEE'
          ? SettingBtn
          : () => AlertBtn(unreadAlertCount),
    });
  }, [unreadAlertCount]);

  return (
    <>
      <BodyWrap>
        <TopContainer>
          <TopText
            isPadding={false}
            textFirst="원하는 모드를"
            textSecond="선택해주세요"
            isHighlightSecond
          />
          <Text
            text={`• 포스기 ${isConnectedPos ? '연결완료' : '미연결'}`}
            color={isConnectedPos ? '#005F83' : '#5F6165'}
            size="15px"
            marginBottom={28}
            marginRight={9}
          />
        </TopContainer>
        <ModeCard
          onPress={goApprovalScreen}
          title="환급 모드"
          content="환급받을 고객님의 여권을 스캔해주세요."
          imageName="ScanMode"
        />
        <ModeCard
          onPress={goCancelScreen}
          title="환급 취소 모드"
          content="환급 취소받을 고객님의 여권을 스캔해주세요."
          imageName="CancelMode"
        />
        {userSelector === 'FRANCHISEE' && (
          <>
            <ModeCard
              onPress={goToSalesAnalysis}
              title="매출 내역"
              content="설명을 입력해주세요."
              imageName="StoreMode"
            />
            <ModeCard
              onPress={goToTpoint}
              title="T.POINT"
              content="설명을 입력해주세요."
              imageName="StoreMode"
            />
            <ModeCard
              onPress={goToMyPage}
              title="마이페이지"
              content="설명을 입력해주세요."
              imageName="StoreMode"
            />
          </>
        )}
        <Applicant
          modalVisible={isModal}
          onClose={dontWatchItAnymore}
          onConfirm={goToFranchiseeApplicant}
          onCancel={doItLater}
        />
      </BodyWrap>
      <Modal
        isVisible={isToast}
        animationOut="fadeOut"
        animationOutTiming={250}
        backdropColor="transparent"
        coverScreen={false}
        hasBackdrop={false}
        style={{ justifyContent: 'flex-end', bottom: 20 }}>
        <ModalWrapper>
          <Text
            text={
              isConnectedPos
                ? '포스기와 연결되었습니다.'
                : '포스기와 연결이 해제되었습니다.'
            }
            color="white"
          />
        </ModalWrapper>
      </Modal>
    </>
  );
}
const TopContainer = styled(FlexWrap)`
  justify-content: space-between;
  align-items: flex-end;
`;
const ModalWrapper = styled.View`
  background-color: #5f6165;
  padding: 12px 20px;
  border-radius: 12px;
`;
export default SelectModePresenter;
