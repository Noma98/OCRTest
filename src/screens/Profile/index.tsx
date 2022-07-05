import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';

import { getFranchiseeInfo } from '@/api/store';
import BodyWrap from '@/components/common/BodyWrap';
import Button from '@/components/common/Button';
import DividingLine from '@/components/common/DividingLine';
import LoadingView from '@/components/common/LoadingView';
import { StyledText } from '@/components/common/Text';
import { useAppSelector } from '@/hooks/useReduxHooks';

const Container = styled.View`
  padding-top: 20px;
`;

function Profile() {
  const franchiseeIndex = useAppSelector(
    state => state.user.userInfo?.franchiseeIndex as number,
  );

  const navigation = useNavigation();
  const { isLoading, data } = useQuery(
    ['franchiseeInfo'],
    () => getFranchiseeInfo(franchiseeIndex),
    { retry: false },
  );

  if (isLoading || !data) {
    <LoadingView isOpacity />;
  }

  const list = [
    {
      label: '성명(대표자명)',
      content: data?.sellerName,
    },
    {
      label: '휴대전화번호',
      content: data?.storeTel,
    },
    {
      label: '사업자등록번호',
      content: data?.businessNumber,
    },
    {
      label: '이메일',
      content: data?.email,
    },
    {
      label: '상호(법인명)',
      content: data?.storeName,
    },
    {
      label: '간판명',
      content: data?.signboard || data?.storeName,
    },
    {
      label: '사업장 주소',
      content: `${data?.storeAddressBasic}\n${data?.storeAddressDetail || '-'}`,
    },
    {
      label: '판매상품 종목',
      content: data?.productCategory,
    },
    {
      label: '매장 전화번호',
      content: data?.storeNumber,
    },
  ];

  const onPress = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <BodyWrap isPadding>
      {list.map(item => (
        <Container key={item.label}>
          <StyledText
            size="15px"
            lineHeight={22}
            marginBottom={8}
            color="#9FA1A7">
            {item.label}
          </StyledText>
          <StyledText marginBottom={20}>{item.content || '-'}</StyledText>
          {item.label !== '매장 전화번호' && (
            <DividingLine color="#EDEEEF" height="1px" />
          )}
        </Container>
      ))}
      <Button
        title="변경하기"
        active
        margin={isIphoneX() ? '52px 0 0' : '52px 0 20px'}
        onPress={onPress}
      />
    </BodyWrap>
  );
}

export default Profile;
