import React, { useLayoutEffect, useMemo } from 'react';
import styled from 'styled-components/native';

import TermsList from '@/components/Terms/TermsList';
import {
  personalTermsInfo,
  serviceTermsInfo,
  cmsTermsInfo,
  pointTermsInfo,
} from '@/constants/terms';
import { TermsScreenProps } from '@/types/navigation';

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Title = styled.Text`
  margin: 28px 0 20px;
  font-size: 16px;
  font-weight: 600;
`;

const Content = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #7b7b7b;
  margin: 0 0 20px;
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

const ScrollContainer = styled.View`
  flex: 1;
  padding: 0 20px;
`;

interface ITermsProps {
  route: TermsScreenProps['route'];
  navigation: TermsScreenProps['navigation'];
}

function Terms({ route, navigation }: ITermsProps) {
  const {
    params: { type },
  } = route;

  const isPersonalTerms = type === 'PERSONAL_TYPE';
  const { headerTitle, contentTitle, content } = useMemo(() => {
    switch (type) {
      case 'PERSONAL_TYPE':
        return {
          headerTitle: '개인정보 이용/수집',
          contentTitle: '<석세스모드> 개인정보 처리방침',
          content: personalTermsInfo,
        };
      case 'SERVICE_TYPE':
        return {
          headerTitle: '서비스 이용 약관',
          contentTitle: 'KTP 가맹점 약관',
          content: serviceTermsInfo,
        };
      case 'CMS_TYPE':
        return {
          headerTitle: 'CMS 출금동의',
          contentTitle: 'CMS 관련 개인정보 수집 동의',
          content: cmsTermsInfo,
        };
      case 'POINT_TYPE':
        return {
          headerTitle: 'T.POINT 이용약관',
          contentTitle: 'KTP 포인트(T.POINT) 이용약관',
          content: pointTermsInfo,
        };
    }
  }, [type]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation, isPersonalTerms, headerTitle]);

  return (
    <StyledSafeAreaView>
      <Scroll>
        <ScrollContainer>
          <Title>{contentTitle}</Title>
          {isPersonalTerms && (
            <Content>
              본 계약과 관련하여 귀사가 본인의 개인(신용)정보를 수집 이용하고자
              하는 경우에는 “개인정보보호법” 제 15조 및 제 22조, 제 24조,
              “신용정보의 이용 및 보호에 관한 법률” 제 34조에 따라 본인의 동의를
              얻어야 합니다. 이에 본인은 귀사가 아래와 같이 본인의 개인(신용)
              정보를 수집 이용하는 것에 대하여 동의합니다.
            </Content>
          )}
          <TermsList content={content} />
        </ScrollContainer>
      </Scroll>
    </StyledSafeAreaView>
  );
}

export default Terms;
