import React from 'react';
import { Modal, View } from 'react-native';
import styled, { css } from 'styled-components/native';

import checkIcon from '@/assets/icons/Etc/check.png';
import { StyledText } from '@/components/common/Text';
import Button from '@/components/common/Button';
import FlexWrap from '@/components/common/FlexWrap';
import DividingLine from '@/components/common/DividingLine';

interface ApplicantProps {
  modalVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

function Applicant({
  modalVisible,
  onClose,
  onCancel,
  onConfirm,
}: ApplicantProps) {
  return (
    <View>
      <StyeldModal
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <ModalContentWrap>
          <ApplicantView
            onClose={onClose}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        </ModalContentWrap>
      </StyeldModal>
    </View>
  );
}

interface ApplicantViewProps {
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

function ApplicantView({ onClose, onConfirm, onCancel }: ApplicantViewProps) {
  return (
    <ApplicantViewWrap dir="column">
      <Icon source={checkIcon} />
      <Text
        center
        type="title"
        marginTop={38}
        marginBottom={14}>{`KTP 앱 이용을 위해\n가맹점을 신청해주세요!`}</Text>
      <DividingLine height={1} color="#E5E6E8" />
      <Text center type="message" marginTop={20} marginBottom={20}>
        <Text type="highlight">[상점모드 - 마이페이지]</Text>
        {`에서\n 가맹점 승인을 위한 자료를 업로드하면,\nKTP 가맹점으로 승인됩니다.\n(2~3일 소요, 주말/공휴일 제외)`}
      </Text>
      <Button
        title="가맹점 신청하기"
        onPress={onConfirm}
        backgroundColor="#005f83"
        color="white"
        active={true}
        fontSize="16"
        fontWeight="500"
        radius="30"
        margin="0 0 20px"
        style={{ paddingHorizontal: 28, paddingVertical: 10 }}
      />
      <ButtonWrap>
        <StyledBtn rightBorder={true} onPress={onClose}>
          <Text type="message">더이상 보지않기</Text>
        </StyledBtn>
        <StyledBtn onPress={onCancel}>
          <Text type="message">나중에 하기</Text>
        </StyledBtn>
      </ButtonWrap>
    </ApplicantViewWrap>
  );
}

const Text = styled(StyledText)<{ type: string }>`
  ${props => {
    switch (props.type) {
      case 'title':
        return css`
          font-size: 18px;
          font-weight: 500;
          line-height: 27px;
        `;
      case 'message':
        return css`
          font-size: 15px;
          line-height: 22px;
        `;
      case 'highlight':
        return css`
          font-size: 15px;
          color: #005f83;
        `;
    }
  }}
`;

const Icon = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: -24;
`;
const StyledBtn = styled.TouchableOpacity<{ rightBorder?: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 14px 20px;

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
const ApplicantViewWrap = styled(FlexWrap)`
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

export default Applicant;
