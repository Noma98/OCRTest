import React from 'react';
import { Modal, View } from 'react-native';
import styled, { css } from 'styled-components/native';

import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';

interface ConfirmProps {
  modalVisible: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  message: string;
}

function Confirm({
  modalVisible,
  onRequestClose,
  onConfirm,
  message,
}: ConfirmProps) {
  return (
    <View>
      <StyeldModal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <ModalContentWrap>
          <ConfirmView
            onClose={onRequestClose}
            onConfirm={onConfirm}
            message={message}
          />
        </ModalContentWrap>
      </StyeldModal>
    </View>
  );
}

interface ConfirmViewProps {
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

function ConfirmView({ onClose, onConfirm, message }: ConfirmViewProps) {
  return (
    <ConfirmViewWrap dir="column">
      <Text text="KTP" size="18px" weight="500" marginTop={20} />
      <MessageWrap dir="column">
        <Text text={message} center size="13px" lineHeight={20} />
      </MessageWrap>
      <ButtonWrap>
        <Button rightBorder={true} onPress={onClose}>
          <Text text="취소" size="18px" weight="500" color="#007AFF" />
        </Button>
        <Button onPress={onConfirm}>
          <Text text="확인" size="18px" weight="500" color="#007AFF" />
        </Button>
      </ButtonWrap>
    </ConfirmViewWrap>
  );
}

const Button = styled.TouchableOpacity<{ rightBorder?: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 11px 0px;

  ${props => {
    if (props.rightBorder) {
      return css`
        border-right-width: 1px;
        border-right-color: #efefef;
      `;
    }
  }}
`;
const ButtonWrap = styled(FlexWrap)`
  border-top-width: 1px;
  border-top-color: #efefef;

  width: 100%;
`;
const StyeldModal = styled(Modal)``;
const ConfirmViewWrap = styled(FlexWrap)`
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 14px;
  width: 75%;
`;
const ModalContentWrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

const MessageWrap = styled(FlexWrap)`
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 20px;
`;
export default Confirm;
