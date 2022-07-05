import { AxiosError } from 'axios';
import IMP, { CallbackRsp } from 'iamport-react-native';
import React, { useLayoutEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useMutation } from 'react-query';
import styled from 'styled-components/native';

import { axiosInstance } from '@/api';
import { checkIsOwner } from '@/api/user';
import LoadingView from '@/components/common/LoadingView';
import { useAppDispatch } from '@/hooks/useReduxHooks';
import { updateImpInfo } from '@/store/modules/auth';
import { ICheckIsOwnerPayload } from '@/types/api/user';
import { IError } from '@/types/common/index';
import { IMPScreenProps } from '@/types/navigation';
import { IIamport } from '@/types/user';

function Loading() {
  const { container } = styles;
  return (
    <View style={container}>
      <LoadingView isOpacity />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});

const Container = styled.SafeAreaView`
  flex: 1;
`;

interface IProps {
  navigation: IMPScreenProps['navigation'];
  route: IMPScreenProps['route'];
}

function IamportCertification({ navigation, route }: IProps) {
  const dispatch = useAppDispatch();
  const { headerTitle, businessNumber } = route.params;

  const mutation = useMutation<
    number,
    AxiosError<IError>,
    ICheckIsOwnerPayload
  >(['isOwner'], payload => checkIsOwner(payload), {
    retry: false,
    onSuccess: () => {
      Alert.alert('알림', '본인인증 완료', [
        {
          text: '확인',
          onPress: () =>
            navigation.navigate('ResetPasswordOutside', {
              businessNumber,
            }),
        },
      ]);
    },
    onError: error => {
      // Alert.alert('알림', '본인인증 완료', [
      //   {
      //     text: '확인',
      //     onPress: () =>
      //       navigation.navigate('ResetPasswordOutside', {
      //         businessNumber,
      //       }),
      //   },
      // ]);
      //QA 목적으로 제한 풀어둠
      error.response &&
        Alert.alert(
          'KTP',
          '해당 사업자등록번호로 가입된\n대표자명과 휴대전화번호가 아닙니다.\n다시 본인인증 해주세요.',
          [
            {
              text: '확인',
              onPress: () =>
                navigation.navigate('MobileCertification', { businessNumber }),
            },
          ],
        );
    },
  });

  async function callback(response: CallbackRsp) {
    const { success, imp_uid } = response;
    if (success && imp_uid) {
      try {
        const res = await axiosInstance.get<IIamport>(
          `/certifications/${imp_uid}`,
        );
        if (res.status === 200) {
          const { name: sellerName, phoneNumber: storeTel } = res.data;
          if (businessNumber) {
            //로그인화면 - 비밀번호 재설정 -> 경로에서는 businessNumber를 넘겨줌
            mutation.mutate({
              businessNumber,
              name: sellerName,
              phoneNumber: storeTel,
            });
          } else {
            //회원가입 - 본인인증
            dispatch(updateImpInfo({ sellerName, storeTel }));
            Alert.alert('알림', '본인인증 완료', [{ text: '확인' }]);
            navigation.goBack();
          }
        }
      } catch {
        navigation.goBack();
      }
    }
  }

  /* [필수입력] 본인인증에 필요한 데이터를 생성합니다. */
  const data = {
    merchant_uid: `mid_${new Date().getTime()}`,
    company: 'Noonch',
    name: '',
    phone: '',
    min_age: '',
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation, headerTitle]);

  return (
    <Container>
      <IMP.Certification
        userCode={'imp35409296'} // 가맹점 식별코드
        loading={<Loading />} // 웹뷰 로딩 컴포넌트 => custom loading view로 전환 예정
        data={data} // 본인인증 데이터
        callback={callback} // 본인인증 종료 후 콜백
      />
    </Container>
  );
}

export default IamportCertification;
