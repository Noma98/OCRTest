import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';

import errorIcon from '@/assets/icons/Market/MyPage/error.png';
import BlockWrap from '@/components/common/BlockWrap';
import Button from '@/components/common/Button';
import DividingLine from '@/components/common/DividingLine';
import Text from '@/components/common/Text';

function RejectedFranchisee() {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('FranchiseeReApplication');
  };

  return (
    <>
      <BlockWrap>
        <ErrorIcon source={errorIcon} />
        <Text
          text="가맹점 신청이 거절되었습니다."
          size="20px"
          lineHeight={28}
          weight="500"
          marginBottom={20}
          center
        />
        <DividingLine height="1px" color="#EDEEEF" />
        <Text
          marginTop={20}
          center
          text={`자세한 사항은 고객센터로 문의해주세요.\n02-6213-8011 (08:30~16:30)`}
        />
      </BlockWrap>
      <Button
        title="다시 신청하기"
        position="bottom fixed"
        active
        isPadding
        margin="0"
        onPress={onPress}
      />
    </>
  );
}

const ErrorIcon = styled.Image`
  width: 48px;
  height: 48px;
  margin: 100px auto 10px;
`;

export default RejectedFranchisee;
