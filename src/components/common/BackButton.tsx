import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import styled, { css } from 'styled-components/native';

import { useAppDispatch } from '@/hooks/useReduxHooks';
import useTermsDispatch from '@/hooks/useTermsDispatch';
import { resetAuth, resetStepThree, resetStepTwo } from '@/store/modules/auth';
import { isAndroid } from '@/utils/check';
import { close, leftArrow } from '@/utils/getImages';

type PressFunctionType =
  | 'STEP_ONE'
  | 'STEP_TWO'
  | 'STEP_THREE'
  | 'IMP'
  | 'DEFAULT';

interface IProps {
  isRight?: boolean;
  pressFuncType?: PressFunctionType;
  params?: Object | undefined;
}

function BackButton({
  isRight = false,
  pressFuncType = 'DEFAULT',
  params,
}: IProps) {
  const dispatch = useTermsDispatch();
  const appDispatch = useAppDispatch();
  const navigation = useNavigation();
  let onPress;

  const onPressDefault = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onPressIMP = useCallback(() => {
    navigation.navigate('MobileCertification', params);
  }, [navigation, params]);

  const onPressStepOne = useCallback(() => {
    dispatch({ type: 'DISAGREE_ALL' });
    appDispatch(resetAuth());
    navigation.goBack();
  }, [navigation, dispatch, appDispatch]);

  const onPressStepTwo = useCallback(() => {
    appDispatch(resetStepTwo());
    navigation.goBack();
  }, [navigation, appDispatch]);

  const onPressStepThree = useCallback(() => {
    appDispatch(resetStepThree());
    navigation.goBack();
  }, [navigation, appDispatch]);

  switch (pressFuncType) {
    case 'STEP_ONE':
      onPress = onPressStepOne;
      break;
    case 'STEP_TWO':
      onPress = onPressStepTwo;
      break;
    case 'STEP_THREE':
      onPress = onPressStepThree;
      break;
    case 'IMP':
      onPress = onPressIMP;
      break;
    default:
      onPress = onPressDefault;
  }

  return (
    <ButtonWrapper isRight={isRight} onPress={onPress}>
      <Arrow source={isRight ? close : leftArrow} />
    </ButtonWrapper>
  );
}
const ButtonWrapper = styled.TouchableOpacity<{ isRight: boolean }>`
  ${props =>
    props.isRight
      ? css`
          margin-right: 20px;
        `
      : css`
          margin-left: ${isAndroid() ? '30px' : '20px'};
        `}
`;

const Arrow = styled.Image`
  width: 25px;
  height: 25px;
`;
export default BackButton;
