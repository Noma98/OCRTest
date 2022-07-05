import { AxiosError } from 'axios';
import React, { useState } from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { useMutation } from 'react-query';

import { refundApproval } from '@/api/refund/index';
import ErrorController from '@/controllers/ErrorController';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import PurchaseInfoPresenter from '@/screens/ScanMode/PurchaseInfo/Presenter';
import { refundApprovalSuccess } from '@/store/modules/refund';
import {
  IRefundApprovalPayload,
  IRefundLimitResponse,
  IRefundResponse,
} from '@/types/api/refund';
import { IError } from '@/types/common';
import { PurchaseInfoScreenProps } from '@/types/navigation';
import { Refund } from '@/types/refund';
import { IUserInfo } from '@/types/user';
import { checkIsAccepted } from '@/utils/check';
import { formatRefundPrice, removeLetter } from '@/utils/format';

interface IProps {
  navigation: PurchaseInfoScreenProps['navigation'];
  route: PurchaseInfoScreenProps['route'];
}

function PurchaseInfo({ navigation, route }: IProps) {
  const dispatch = useAppDispatch();
  const [refundData, setRefundData] = useState<Refund>({
    originPrice: '',
    refundPrice: '0',
    paymentPrice: '0',
  });

  const { franchiseeIndex, franchiseeStatus, userSelector, employeeIndex } =
    useAppSelector(state => state.user.userInfo) as IUserInfo;
  const { customerIndex } = useAppSelector(
    state => state.refund.inquiryInfo,
  ) as IRefundLimitResponse;

  const onChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {
    const { text } = e.nativeEvent;

    const replaceValue = removeLetter(
      text.length > 1 ? text.replace(/^0/, '') : text,
    );
    const refundPrice = String(Math.round(formatRefundPrice(replaceValue)));
    const paymentPrice = String(
      Math.round(parseInt(replaceValue, 10) - parseInt(refundPrice, 10)),
    );

    setRefundData(state => ({
      ...state,
      originPrice: replaceValue,
      refundPrice,
      paymentPrice,
    }));
  };

  const mutation = useMutation<
    IRefundResponse,
    AxiosError<IError>,
    IRefundApprovalPayload
  >(payload => refundApproval(payload), {
    retry: false,
    onError: error => {
      const response = error.response;
      if (response) {
        const errorController = new ErrorController();
        if (errorController.checkIsRefundError(response.data.message)) {
          Alert.alert(
            'KTP',
            errorController.getRefundAlertMessage(response.data.message),
          );
          return;
        }
      }
    },
    onSuccess: async data => {
      const { originPrice, paymentPrice, refundPrice } = refundData;
      dispatch(refundApprovalSuccess(data));
      navigation.reset({
        index: 1,
        routes: [
          { name: 'SelectMode' },
          {
            name: 'RefundResult',
            params: {
              referrer: route.params.referrer,
              data: {
                originPrice,
                paymentPrice,
                refundPrice,
              },
            },
          },
        ],
      });
    },
  });

  const onClick = async () => {
    if (!checkIsAccepted(franchiseeStatus)) {
      return;
    }

    const formattedPrice = removeLetter(refundData.originPrice);

    if (formattedPrice === '0' || formattedPrice.trim() === '') {
      return;
    }

    if (+formattedPrice < 30000) {
      Alert.alert('KTP', '30,000원 이상부터\n환급할 수 있습니다.');
      return;
    }
    if (+formattedPrice > 499999) {
      Alert.alert('KTP', '500,000원 미만까지\n환급할 수 있습니다.');
      return;
    }
    mutation.mutate({
      customerIndex,
      price: formattedPrice,
      userSelector,
      ...(userSelector === 'FRANCHISEE'
        ? { franchiseeIndex }
        : { employeeIndex }),
    });
  };

  return (
    <PurchaseInfoPresenter
      refundData={refundData}
      onChange={onChange}
      onClick={onClick}
    />
  );
}

export default PurchaseInfo;
