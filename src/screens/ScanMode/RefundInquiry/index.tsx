import { AxiosError } from 'axios';
import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { useMutation } from 'react-query';

import { getRefundLimit } from '@/api/refund';
import LoadingView from '@/components/common/LoadingView';
import ErrorController from '@/controllers/ErrorController';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import RefundInquiryPresenter from '@/screens/ScanMode/RefundInquiry/Presenter';
import { refundLimitSuccess } from '@/store/modules/refund';
import { IRefundLimitResponse } from '@/types/api/refund';
import { IError } from '@/types/common';
import { RefundInquiryScreenProps } from '@/types/navigation';
import { IRefundLimitNavigationPayload } from '@/types/refund';

interface IProps {
  route: RefundInquiryScreenProps['route'];
  navigation: RefundInquiryScreenProps['navigation'];
}

function RefundInquiry({ route, navigation }: IProps) {
  const dispatch = useAppDispatch();
  const { inquiryInfo, passportInfo } = useAppSelector(state => state.refund);
  const { referrer } = route.params;

  const onClick = useCallback(() => {
    navigation.navigate('PurchaseInfo', { referrer });
  }, [navigation, referrer]);

  const mutation = useMutation<
    IRefundLimitResponse,
    AxiosError<IError>,
    IRefundLimitNavigationPayload
  >(data => getRefundLimit(data), {
    retry: false,
    onError: error => {
      if (error.response) {
        const message = error.response.data.message;
        const errorController = new ErrorController();
        if (errorController.checkIsRefundError(message)) {
          Alert.alert('KTP', errorController.getRefundAlertMessage(message));
          return;
        }
      }
    },
    onSuccess: data => {
      dispatch(refundLimitSuccess(data));
    },
  });

  if (mutation.isLoading) {
    return <LoadingView isOpacity />;
  }

  if (!inquiryInfo || !passportInfo) {
    return <LoadingView isOpacity />;
  }
  return (
    <RefundInquiryPresenter
      inquiryInfo={inquiryInfo}
      passportInfo={passportInfo}
      onClick={onClick}
    />
  );
}
export default RefundInquiry;
