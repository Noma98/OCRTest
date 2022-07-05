import { AxiosError } from 'axios';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useMutation } from 'react-query';
import styled from 'styled-components/native';

import { createBarcode } from '@/api/pos';
import BlockWrap from '@/components/common/BlockWrap';
import LoadingView from '@/components/common/LoadingView';
import Text from '@/components/common/Text';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { IGetBarcodePayload, IGetBarcodeResponse } from '@/types/api/pos';
import { IError } from '@/types/common';
import { BarcodeScanScreenProps } from '@/types/navigation';
import { IUserInfo } from '@/types/user';

interface IProps {
  navigation: BarcodeScanScreenProps['navigation'];
  route: BarcodeScanScreenProps['route'];
}
function BarcodeScan({ navigation, route }: IProps) {
  const {
    referrer,
    payload: { lastName, nationality, passportNumber, totalAmount, saleDate },
  } = route.params;
  const [barcodeImg, setBarcodeImg] = useState();
  const indexRef = useRef<number>();
  const { franchiseeIndex } = useAppSelector(
    state => state.user.userInfo,
  ) as IUserInfo;

  //바코드 이미지 + externalRefundIndex 요청
  const mutation = useMutation<
    IGetBarcodeResponse,
    AxiosError<IError>,
    IGetBarcodePayload
  >(payload => createBarcode(payload), {
    retry: false,
    onSuccess: data => {
      setBarcodeImg(data.s3Path);
      indexRef.current = data.externalRefundIndex;
      // fetchRefundState();
    },
  });
  //환급 상태 확인
  // const { refetch: fetchRefundState } = useQuery<any, AxiosError<IError>>(
  //   'refundResult',
  //   () => getRefundResult(indexRef.current),
  //   {
  //     retry: 55,
  //     retryDelay: 5000,
  //     enabled: false,
  //     onSuccess: data => {
  //       if (data.type === 'SUCCESS') {
  //         navigation.navigate('RefundResult', {
  //           data: data.refundData,
  //           referrer,
  //         });
  //       } else {
  //         Alert.alert(
  //           'KTP',
  //           `서버 요청에 실패했습니다.\n고객센터로 문의해주세요.\n02-6213-8011 (08:30~16:30)`,
  //           [
  //             {
  //               text: '확인',
  //               onPress: () => navigation.goBack(),
  //             },
  //           ],
  //         );
  //       }
  //     },
  //   },
  // );
  useLayoutEffect(() => {
    mutation.mutate({
      franchiseeIndex,
      name: lastName,
      nationality,
      passportNumber,
      totalAmount,
      saleDate,
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      Alert.alert(
        'KTP',
        `환급 요청에 실패했습니다.\n고객센터로 문의해주세요.\n02-6213-8011 (08:30~16:30)`,
        [{ text: '확인', onPress: () => navigation.goBack() }],
      );
    }, 180000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <BlockWrap>
      {barcodeImg ? (
        <>
          <Text
            text="바코드 이용안내"
            size="18px"
            lineHeight={26}
            margin={[20, 0, 12]}
          />
          <Text
            text="외국인 관광객의 잔여 환급한도를 조회할 수 있습니다."
            color="#5F6165"
          />
          <BarcodeWrap>
            <Barcode source={{ uri: barcodeImg }} resizeMode="contain" />
          </BarcodeWrap>
        </>
      ) : (
        <LoadingView isOpacity />
      )}
    </BlockWrap>
  );
}

const BarcodeWrap = styled.View`
  border: 1px solid #cbccce;
  border-radius: 14px;
  width: 100%;
  height: 160px;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

//크기를 정해주지 않으면 바코드 이미지가 안보임
//비율을 resize contain으로 맞추기 때문에 width, height은 피그마에 명시된 수치와 다르게 지정함
const Barcode = styled.Image`
  width: 330px;
  height: 330px;
`;
export default BarcodeScan;
