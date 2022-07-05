import { AxiosError } from 'axios';
import { format } from 'date-fns';
import React from 'react';
import { Alert } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components/native';

import { getNoticeDetail } from '@/api/notice';
import BodyWrap from '@/components/common/BodyWrap';
import DividingLine from '@/components/common/DividingLine';
import LoadingView from '@/components/common/LoadingView';
import Text from '@/components/common/Text';
import { IGetNoticeDetailResponse, LinkType } from '@/types/api/notice';
import { IError } from '@/types/common';
import { NoticeDetailScreenProps } from '@/types/navigation';

interface IProps {
  navigation: NoticeDetailScreenProps['navigation'];
  route: NoticeDetailScreenProps['route'];
}
function NoticeDetail({ navigation, route }: IProps) {
  const { noticeIndex } = route.params;
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<
    IGetNoticeDetailResponse,
    AxiosError<IError>
  >('NoticeDetail', () => getNoticeDetail(noticeIndex), {
    onError: err => {
      err.response &&
        Alert.alert('KTP', '삭제된 게시글입니다.', [
          {
            text: '확인',
            onPress: () => {
              queryClient.invalidateQueries('noticeList');
              navigation.goBack();
            },
          },
        ]);
    },
    retry: false,
  });
  const onPress = (termType: LinkType) => {
    navigation.navigate('Terms', { type: termType });
  };
  if (isLoading || !data) {
    return <LoadingView isOpacity />;
  }
  return (
    <BodyWrap>
      {data?.title && (
        <Text
          text={data.title}
          size="18px"
          lineHeight={26}
          weight="500"
          marginTop={20}
        />
      )}
      {data?.scheduledDate && (
        <Text
          text={format(new Date(data.scheduledDate), 'yyyy.MM.dd')}
          color="#9FA1A7"
          size="14px"
          lineHeight={22}
          marginTop={12}
        />
      )}
      <DividingLine height="1" style={{ marginVertical: 20 }} />
      {data.mainImg !== '' && <ContentImage source={{ uri: data.mainImg }} />}
      {data.subTitle1 !== '' && <SubTitle>{data?.subTitle1}</SubTitle>}
      {data.subImg1 !== '' && <ContentImage source={{ uri: data.subImg1 }} />}
      {data.content1 !== '' && <ContentText text={data.content1} />}
      {data.subTitle2 !== '' && <SubTitle>{data?.subTitle2}</SubTitle>}
      {data.subImg2 !== '' && <ContentImage source={{ uri: data.subImg2 }} />}
      {data.content2 !== '' && <ContentText text={data.content2} />}
      {data.subTitle3 !== '' && <SubTitle>{data?.subTitle3}</SubTitle>}
      {data.subImg3 !== '' && <ContentImage source={{ uri: data.subImg3 }} />}
      {data.content3 !== '' && <ContentText text={data.content3} />}
      {data.link !== 'NONE' && (
        <LinkWrap>
          <LinkButton onPress={() => onPress(data.link)} activeOpacity={0.85}>
            <LinkText
              text={`[현행 ${
                data.link === 'PERSONAL_TYPE'
                  ? '개인정보 처리방침'
                  : data.link === 'SERVICE_TYPE'
                  ? '서비스 이용 약관'
                  : data.link === 'POINT_TYPE'
                  ? 'T.POINT 이용 약관'
                  : 'CMS 출금 약관'
              } 보기]`}
            />
          </LinkButton>
          <LinkButton onPress={() => onPress(data.link)} activeOpacity={0.85}>
            <LinkText
              text={`[개정 ${
                data.link === 'PERSONAL_TYPE'
                  ? '개인정보 처리방침'
                  : data.link === 'SERVICE_TYPE'
                  ? '서비스 이용 약관'
                  : data.link === 'POINT_TYPE'
                  ? 'T.POINT 이용 약관'
                  : 'CMS 출금 약관'
              } 보기]`}
            />
          </LinkButton>
        </LinkWrap>
      )}
    </BodyWrap>
  );
}
const ContentImage = styled.Image`
  width: 100%;
  height: 250px;
  border-radius: 12px;
  margin-bottom: 20px;
`;
const SubTitle = styled.Text`
  font-size: 18px;
  font-weight: 26px;
  font-weight: 500;
  margin-bottom: 20px;
`;
const ContentText = styled(Text)`
  margin-bottom: 48px;
`;
const LinkText = styled(Text)`
  color: #005f83;
  text-decoration: underline;
  margin-bottom: 12px;
`;
const LinkButton = styled.TouchableOpacity``;
const LinkWrap = styled.View`
  margin-bottom: 80px;
`;
export default NoticeDetail;
