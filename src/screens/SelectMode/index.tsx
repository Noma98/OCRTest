import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQuery } from 'react-query';

import { getFranchiseeStatus, updateFAPopupState } from '@/api/user';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import SelectModePresenter from '@/screens/SelectMode/Presenter';
import {
  updateFAPopUpState,
  updateFranchiseeStatusSuccess,
} from '@/store/modules/user';
import { IFranchiseeStatusResponse } from '@/types/api/user';
import { IError } from '@/types/common';
import { SelectModeScreenProps } from '@/types/navigation';
import { IUserInfo } from '@/types/user';
import { checkIsAccepted } from '@/utils/check';

interface IProps {
  navigation: SelectModeScreenProps['navigation'];
  route: SelectModeScreenProps['route'];
}

function SelectMode({ navigation, route }: IProps) {
  const dispatch = useAppDispatch();

  const {
    franchiseeIndex,
    franchiseeStatus,
    popUp,
    isConnectedPos,
    isActiveSound,
    isActiveVibration,
  } = useAppSelector(state => state.user.userInfo) as IUserInfo;
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isToast, setIsToast] = useState(Boolean(route.params?.referrer));

  const mutation = useMutation<number, AxiosError<IError>, number>(
    payload => updateFAPopupState(payload),
    {
      retry: false,
      onSuccess: () => {
        setIsModal(false);
        dispatch(updateFAPopUpState());
      },
    },
  );
  // ## checkIsAccepted()
  // : Scan 모듈 셋업 시 Scandit Device Counting이 이루어지므로
  // 가맹점 승인이 나지 않은 가맹점주의 경우 해당 화면으로 넘어가지 못하게 막는 안전장치
  const goApprovalScreen = () => {
    if (!checkIsAccepted(franchiseeStatus)) {
      return;
    }

    navigation.navigate('ScanMode', {
      referrer: 'Approval',
      isConnectedPos,
      isActiveSound,
      isActiveVibration,
    });
  };
  const goCancelScreen = () => {
    if (!checkIsAccepted(franchiseeStatus)) {
      return;
    }

    navigation.navigate('ScanMode', {
      referrer: 'Cancel',
      isConnectedPos,
      isActiveSound,
      isActiveVibration,
    });
  };
  const goToSalesAnalysis = () => {
    navigation.navigate('StoreMode');
  };
  const goToMyPage = () => {
    navigation.navigate('StoreMode', { screen: 'MyPage' });
  };
  const goToTpoint = () => {
    navigation.navigate('StoreMode', { screen: 'Tpoint' });
  };

  const doItLater = () => {
    setIsModal(false);
  };
  const dontWatchItAnymore = () => {
    mutation.mutate(franchiseeIndex);
  };
  const goToFranchiseeApplicant = () => {
    setTimeout(() => navigation.navigate('FranchiseeApplication'), 400);
    setIsModal(false);
  };
  useQuery<IFranchiseeStatusResponse, AxiosError<IError>>(
    'franchiseeStatus',
    () => getFranchiseeStatus(franchiseeIndex),
    {
      retry: false,
      onSuccess: data => {
        if (franchiseeStatus === 'WAIT' || franchiseeStatus === 'REAPPLIED') {
          if (data.franchiseeStatus === 'ACCEPTED') {
            Alert.alert(
              'KTP',
              'KTP 가맹점으로 승인되었습니다.\n이제 모든 서비스를 이용하실 수\n있습니다.',
            );
          } else if (data.franchiseeStatus === 'REJECTED') {
            Alert.alert(
              'KTP',
              '가맹점 신청이 거절되었습니다.\n고객센터로 문의해주세요.\n053-217-8011 (08:30~16:30)',
            );
          }
          dispatch(updateFranchiseeStatusSuccess(data));
        } else if (franchiseeStatus === 'INIT' && popUp === true) {
          setTimeout(() => setIsModal(true), 100);
          //다시보지 않기 상태값 불러오는 곳에서 하도록 수정..
        }
      },
    },
  );
  useEffect(() => {
    route.params?.referrer &&
      setIsToast(() => {
        setTimeout(() => setIsToast(false), 6000);
        return true;
      });
  }, [route.params]);
  return (
    <SelectModePresenter
      goApprovalScreen={goApprovalScreen}
      goCancelScreen={goCancelScreen}
      goToSalesAnalysis={goToSalesAnalysis}
      goToMyPage={goToMyPage}
      goToTpoint={goToTpoint}
      isModal={isModal && franchiseeStatus === 'INIT'}
      isToast={isToast}
      doItLater={doItLater}
      dontWatchItAnymore={dontWatchItAnymore}
      goToFranchiseeApplicant={goToFranchiseeApplicant}
    />
  );
}

export default SelectMode;
