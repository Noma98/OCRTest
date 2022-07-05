import React from 'react';
import { ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import { StyledText } from '@/components/common/Text';

const Container = styled.View`
  position: absolute;
  left: 0;
  bottom: 8px;
  width: 100%;
`;

const CloseButton = styled.TouchableOpacity`
  height: 56px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 14px;
`;

const ButtonWrapper = styled.View`
  margin: 0 0 8px;
  height: 112px;
  background-color: #efefef;
  border-radius: 14px;
`;

const CameraButton = styled.TouchableOpacity`
  height: 56px;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #cbccce;
`;

const GalleryButton = styled.TouchableOpacity`
  height: 56px;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  onPressGallery: () => Promise<void>;
  onPressCamera: () => Promise<void>;
}

function ImageSelectModal(props: IProps) {
  const { onPressGallery, isModalVisible, closeModal, onPressCamera } = props;
  const modalStyle: ViewStyle = {
    flex: 1,
    position: 'relative',
  };

  return (
    <Modal
      isVisible={isModalVisible}
      style={modalStyle}
      backdropColor="#000"
      backdropOpacity={0.4}
      onBackdropPress={closeModal}>
      <Container>
        <ButtonWrapper>
          <CameraButton onPress={onPressCamera}>
            <StyledText size="20px" weight="500" color="#007AFF">
              사진 촬영
            </StyledText>
          </CameraButton>
          <GalleryButton onPress={onPressGallery}>
            <StyledText size="20px" weight="500" color="#007AFF">
              앨범에서 사진 선택
            </StyledText>
          </GalleryButton>
        </ButtonWrapper>
        <CloseButton onPress={closeModal}>
          <StyledText size="20px" weight="500" color="#007AFF">
            취소
          </StyledText>
        </CloseButton>
      </Container>
    </Modal>
  );
}

export default ImageSelectModal;
