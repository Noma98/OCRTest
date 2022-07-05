import React from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import { HomeBtn, HomeWithSettingBtn, LeftPoPArrow } from '@/components/Header';

interface IContainerProps {
  height: number;
}

interface ITextProps {
  isSetting?: boolean;
}

const Container = styled.View<IContainerProps>`
  margin-top: ${props => props.height}px;
  width: 100%;
`;

const Flex = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: #edeeef;
  width: 100%;
  height: 50px;
`;

const Title = styled.Text<ITextProps>`
  flex: ${props => (props.isSetting ? 0.8 : 1)};
  font-size: 18px;
  line-height: 27px;
  font-weight: 500;
`;

const EmptySpace = styled.View`
  width: 30px;
`;

interface IProps {
  title: string;
  isSetting?: boolean;
  isHome?: boolean;
}

function StoreHeader({ title, isSetting = false, isHome = true }: IProps) {
  const statusBarHeight = getStatusBarHeight();

  return (
    <Container height={statusBarHeight}>
      <Flex>
        <LeftPoPArrow />
        <Title isSetting={isSetting}>{title}</Title>
        {isHome ? (
          isSetting ? (
            <HomeWithSettingBtn />
          ) : (
            <HomeBtn />
          )
        ) : (
          <EmptySpace />
        )}
      </Flex>
    </Container>
  );
}

export default StoreHeader;
