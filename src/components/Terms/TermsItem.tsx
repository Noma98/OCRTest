import React from 'react';
import styled from 'styled-components/native';

const InfoWrapper = styled.View`
  margin: 0 0 28px;
`;

const MarginWrapper = styled.View<{ isFirst?: boolean }>`
  margin-left: ${props => (props.isFirst ? '0' : '10px')};
  margin-bottom: 3px;
`;

const Title = styled.Text`
  margin: 0 0 8px;
`;

const Content = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #7b7b7b;
`;

const Bold = styled.Text`
  font-weight: 600;
  line-height: 20px;
`;

interface IPersonalTermsItem {
  title: string;
  subtitle?: string;
  firstContents?: string[];
  secondContents?: string[];
}

function PersonalTermsItem({
  title,
  subtitle,
  firstContents,
  secondContents,
}: IPersonalTermsItem) {
  return (
    <InfoWrapper>
      <Title>
        <Bold>{title} </Bold>
      </Title>
      {subtitle && <Content>{subtitle}</Content>}
      <MarginWrapper isFirst>
        {firstContents &&
          firstContents.map(content => (
            <Content key={content}>{content}</Content>
          ))}
      </MarginWrapper>
      <MarginWrapper>
        {secondContents &&
          secondContents.map(content => (
            <Content key={content}>{content}</Content>
          ))}
      </MarginWrapper>
    </InfoWrapper>
  );
}

export default PersonalTermsItem;
