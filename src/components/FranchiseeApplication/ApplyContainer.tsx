import React, { useReducer, useRef } from 'react';
import { Alert, Linking } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useQuery } from 'react-query';

import { getReApplicationInfo } from '@/api/user';
import BodyWrap from '@/components/common/BodyWrap';
import DividingLine from '@/components/common/DividingLine';
import AccountInfoForm from '@/components/FranchiseeApplication/AccountInfoForm';
import CMSForm from '@/components/FranchiseeApplication/CMSForm';
import ImageSelectModal from '@/components/FranchiseeApplication/ImageSelectModal';
import ImageUploadForm from '@/components/FranchiseeApplication/ImageUploadForm';
import Inquiry from '@/components/FranchiseeApplication/Inquiry';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { requestCameraPermissionsIfNeeded } from '@/screens/ScanMode/Scan/camera-permission-handler';
import { IFAState } from '@/types/user';
import { isAndroid } from '@/utils/check';

const initialState: IFAState = {
  isModalVisible: false,
  selectedImage: null,
  selectedBank: '은행 선택',
  accountNumber: '',
  transferDay: '출금일 선택',
  isCMS: false,
  isValidAccountNumber: false,
  isChanged: false,
};

type ActionType =
  | 'SET_VALUE'
  | 'TOGGLE_ISCMS'
  | 'FETCH_EXISTED_INFO'
  | 'TOGGLE_ISCHANGED';
interface IAction {
  type: ActionType;
  payload?: any;
}

function applyReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        ...(action.payload.name === 'accountNumber' && {
          isValidAccountNumber: false,
        }),
        ...(action.payload.name === 'selectedBank' && {
          isValidAccountNumber: false,
        }),
      };
    case 'FETCH_EXISTED_INFO':
      return action.payload;
    case 'TOGGLE_ISCMS':
      return {
        ...state,
        isCMS: !state.isCMS,
      };
    case 'TOGGLE_ISCHANGED':
      return {
        ...state,
        isChanged: !state.isChanged,
      };
    default:
      throw Error(`Unhandled type Error: ${action.type}`);
  }
}

interface IProps {
  isReApply: boolean | undefined;
}

function ApplyContainer({ isReApply }: IProps) {
  const [state, dispatch] = useReducer(applyReducer, initialState);
  const { isModalVisible, selectedImage, isChanged } = state;
  const franchiseeIndex = useAppSelector(
    reduxState => reduxState.user.userInfo?.franchiseeIndex,
  );
  const existedData = useRef(null);
  if (isChanged) {
    existedData.current = state;
    dispatch({ type: 'TOGGLE_ISCHANGED' });
  }
  useQuery(
    ['existedInfo', franchiseeIndex],
    () => getReApplicationInfo(franchiseeIndex as number),
    {
      retry: false,
      enabled: isReApply,
      onSuccess: data => {
        const {
          uploadImage,
          franchiseeBankInfo: { accountNumber, bankName, withdrawalDate },
        } = data;
        dispatch({
          type: 'FETCH_EXISTED_INFO',
          payload: {
            isModalVisible: false,
            selectedImage: { uri: uploadImage },
            selectedBank: bankName,
            accountNumber: accountNumber,
            transferDay: withdrawalDate,
            isCMS: false,
            isValidAccountNumber: false,
            isChanged: true,
          },
        });
      },
    },
  );
  const openModal = () => {
    dispatch({
      type: 'SET_VALUE',
      payload: { name: 'isModalVisible', value: true },
    });
  };
  const closeModal = () => {
    dispatch({
      type: 'SET_VALUE',
      payload: { name: 'isModalVisible', value: false },
    });
  };
  const onPressCamera = async () => {
    try {
      await requestCameraPermissionsIfNeeded();
      const result = await launchCamera({
        mediaType: 'photo',
        maxWidth: 960,
        maxHeight: 1280,
        quality: 0.9,
      });

      if (result.assets) {
        dispatch({
          type: 'SET_VALUE',
          payload: { name: 'selectedImage', value: result.assets[0] },
        });
      }
      closeModal();
    } catch (error) {
      // #TODO: 스캔과 동일한 카메라 접근 권한 에러 관리
      if (!isAndroid()) {
        Alert.alert(
          'KTP',
          `카메라에 대한 권한 사용을 거부하였습니다. 기능 사용을 원하실 경우 ${
            !isAndroid()
              ? '설정 > KTP에서'
              : '설정 > 애플리케이션 관리자에서 해당 앱의'
          } 카메라 접근 권한을 허용해 주세요.`,
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '설정으로 이동',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
      }
    }
  };

  const onPressGallery = async () => {
    // #TODO: 스캔과 동일한 사진첩 접근 권한 관리

    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 960,
      maxHeight: 1280,
      quality: 0.9,
    });

    if (result.assets) {
      dispatch({
        type: 'SET_VALUE',
        payload: { name: 'selectedImage', value: result.assets[0] },
      });
    }
    closeModal();
  };

  const onDeleteImage = () => {
    dispatch({
      type: 'SET_VALUE',
      payload: { name: 'selectedImage', value: null },
    });
  };
  return (
    <BodyWrap isPadding={false}>
      <DividingLine
        color="#EDEEEF"
        text="외국인 관광객 면세판매장 지정증 첨부"
        full
      />
      <ImageUploadForm
        onPress={openModal}
        selectedImage={selectedImage}
        onDeleteImage={onDeleteImage}
      />
      <Inquiry />
      <DividingLine color="#EDEEEF" text="CMS 이체 계좌 입력" full />
      <AccountInfoForm state={state} dispatch={dispatch} />
      <DividingLine height="8px" color="#EDEEEF" full />
      <CMSForm
        state={state}
        dispatch={dispatch}
        isReApply={isReApply}
        existedData={existedData?.current}
      />
      <ImageSelectModal
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        onPressGallery={onPressGallery}
        onPressCamera={onPressCamera}
      />
    </BodyWrap>
  );
}

export default ApplyContainer;
