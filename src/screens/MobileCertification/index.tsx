import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import phoneIcon from '@/assets/icons/Auth/phone.png';
import BodyWrap from '@/components/common/BodyWrap';
import Text from '@/components/common/Text';
import TouchAnimationBtnWrap from '@/components/common/TouchAnimationBtnWrap';
import { MobileCertificationScreenProps } from '@/types/navigation';

interface IProps {
  navigation: MobileCertificationScreenProps['navigation'];
  route: MobileCertificationScreenProps['route'];
}
function MobileCertification({ navigation, route }: IProps) {
  const onPress = () =>
    navigation.navigate('Vertification', {
      headerTitle: '본인인증',
      businessNumber: route.params.businessNumber,
    });
  return (
    <Container>
      <TouchAnimationBtnWrap onPress={onPress} customStyle={styles.root}>
        <Icon source={phoneIcon} />
        <Text text="휴대폰 본인인증" />
      </TouchAnimationBtnWrap>
    </Container>
  );
}
const Icon = styled.Image`
  height: 24px;
  width: 24px;
  margin-right: 4px;
`;
const Container = styled(BodyWrap)`
  padding: 20px;
`;
const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CBCCCE',
    marginTop: 20,
  },
});
export default MobileCertification;
