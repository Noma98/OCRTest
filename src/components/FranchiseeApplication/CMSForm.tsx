import React, { Dispatch, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useMutation } from 'react-query';
import styled from 'styled-components/native';

import { applyFranchisee } from '@/api/user';
import Button from '@/components/common/Button';
import CheckBoxWrap from '@/components/common/CheckBoxWrap';
import Confirm from '@/components/Modal/Confirm';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { IApplyFranchiseePayload } from '@/types/api/user';
import { IError } from '@/types/common';
import { IFAState } from '@/types/user';
import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';

const Container = styled.View`
  padding: 0 20px;
`;

type ActionType = 'SET_VALUE' | 'TOGGLE_ISCMS';
interface IAction {
  type: ActionType;
  payload?: any;
}

interface IProps {
  state: IFAState;
  dispatch: Dispatch<IAction>;
  isReApply: boolean;
  existedData: IFAState | null;
}

function CMSForm({ state, dispatch, isReApply, existedData }: IProps) {
  const {
    isCMS,
    isValidAccountNumber,
    accountNumber,
    selectedBank,
    selectedImage,
    transferDay,
  } = state;
  const navigation = useNavigation();
  const [isModal, setIsModal] = useState(false);
  const franchiseeIndex = useAppSelector(
    reduxState => reduxState.user.userInfo?.franchiseeIndex,
  ) as number;

  const mutation = useMutation<
    number,
    AxiosError<IError>,
    IApplyFranchiseePayload
  >(payload => applyFranchisee(payload), {
    retry: false,
    // onError: () => {
    //   Alert.alert(
    //     'KTP',
    //     '오류가 발생했습니다.\n고객센터로 문의해주세요.\n02-6213-8011 (08:30~16:30)',
    //   );
    // },
    onSuccess: () => {
      const message = `가맹점 ${
        isReApply ? '재' : ''
      }신청이 완료되었습니다.\n가맹점 승인은 2~3일 소요됩니다.`;
      setIsModal(false);
      Alert.alert('KTP', message, [
        {
          text: '확인',
          onPress: () => {
            if (isReApply) {
              navigation.navigate('MyPage');
            } else {
              navigation.goBack();
            }
          },
        },
      ]);
    },
  });

  const onPressBox = () => {
    dispatch({ type: 'TOGGLE_ISCMS' });
  };

  const onPressArrow = () => {
    navigation.navigate('Terms', { type: 'CMS_TYPE' });
  };

  const isButtonAcitve = useMemo(
    () =>
      Boolean(accountNumber) &&
      Boolean(selectedBank) &&
      Boolean(selectedImage) &&
      isCMS,
    [isCMS, accountNumber, selectedBank, selectedImage],
  );
  const updateFAInfo = () => {
    const { fileName, uri, type } = selectedImage as Asset;

    const formData = new FormData();
    //재신청에서 이미지 변경 없으면 fileName 없음
    if (fileName) {
      formData.append('uploadImage', {
        name: fileName,
        type,
        uri,
      });
      formData.append('imageCategory', 'T');
    } else {
      formData.append('uploadImage', null);
      formData.append('imageCategory', 'X');
    }

    formData.append(
      'franchiseeBankInfo',
      JSON.stringify({
        accountNumber,
        bankName: selectedBank,
        withdrawalDate: transferDay,
      }),
    );

    mutation.mutate({
      formData,
      franchiseeIndex,
      isReApply,
    });
  };
  const onSubmit = () => {
    if (!isButtonAcitve) {
      return;
    }
    if (isReApply) {
      const {
        accountNumber: existedAccount,
        selectedBank: existedBank,
        selectedImage: { uri: existedImage },
        transferDay: existedTransferDay,
      } = existedData;
      if (
        existedAccount === accountNumber &&
        existedBank === selectedBank &&
        existedImage === selectedImage.uri &&
        transferDay === existedTransferDay
      ) {
        setIsModal(true);
      } else {
        updateFAInfo();
      }
    } else {
      updateFAInfo();
    }
    //QA 목적 => 완료되면 수정 필요
    // if (!isValidAccountNumber) {
    //   Alert.alert('KTP', '계좌번호를 인증해주세요.');
    //   return;
    // }
  };

  return (
    <Container>
      <CheckBoxWrap
        isSelected={isCMS}
        title="[필수] CMS 출금 동의"
        margin={[0, 0, 70]}
        onPressBox={onPressBox}
        onPressArrow={onPressArrow}
      />
      <Button
        title={isReApply ? '재신청하기' : '신청하기'}
        active={isButtonAcitve}
        margin={isIphoneX() ? '0' : '0 0 20px'}
        onPress={onSubmit}
      />
      <Confirm
        modalVisible={isModal}
        onConfirm={updateFAInfo}
        onRequestClose={() => setIsModal(false)}
        message={`바뀐 정보가 없습니다.\n이대로 가맹점을 신청하시겠습니까?`}
      />
    </Container>
  );
}

export default CMSForm;
