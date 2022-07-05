import React from 'react';
import styled from 'styled-components/native';

import TermsItem from '@/components/Terms/TermsItem';
import { ITermsInfo } from '@/constants/terms';

const Container = styled.View`
  margin: 0 0 66px;
`;

interface IProps {
  content: ITermsInfo[];
}

function TermsList({ content }: IProps) {
  return (
    <Container>
      {content.map(info => (
        <TermsItem key={info.id} {...info} />
      ))}
    </Container>
  );
}

export default TermsList;
