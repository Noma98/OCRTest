import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

import InfoBlack from '@/assets/icons/Market/infoBlack.png';
import ErrorNotiIcon from 'assets/icons/Auth/error.png';

interface IProps {
  error?: string;
  backendError?: string;
  isBlack?: boolean;
  style?: StyleProp<ViewStyle>;
}
function ErrorMessage({ error, backendError, isBlack = false, style }: IProps) {
  return (
    <ErrorWrapper style={style}>
      <ErrorIcon source={isBlack ? InfoBlack : ErrorNotiIcon} />
      <Error isBlack={isBlack}>{error || backendError}</Error>
    </ErrorWrapper>
  );
}
export default ErrorMessage;

const ErrorWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding-right: 20px;
  margin: 0 0 8px;
`;

const ErrorIcon = styled.Image`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  margin-top: 2px;
`;

const Error = styled.Text<{ isBlack: boolean }>`
  font-size: 14px;
  color: ${props => (props.isBlack ? 'black' : '#ff5239')};
  line-height: 22px;
`;
