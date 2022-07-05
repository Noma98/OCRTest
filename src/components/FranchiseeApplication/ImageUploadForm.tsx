import React from 'react';
import { Asset } from 'react-native-image-picker';
import styled from 'styled-components/native';

import uploadIcon from '@/assets/icons/Market/upload.png';
import whiteClose from '@/assets/icons/Market/whiteClose.png';
import Text from '@/components/common/Text';
import RequiredLabel from '@/components/common/RequiredLabel';

interface IProps {
  onPress: () => void;
  selectedImage: Asset | null;
  onDeleteImage: () => void;
}

function ImageUploadForm(props: IProps) {
  const { onPress, selectedImage, onDeleteImage } = props;
  return (
    <Container>
      <RequiredLabel title="외국인 관광객 면세판매장 지정증 이미지 첨부" />
      <ImageFormWrapper>
        <UploadBox onPress={onPress} underlayColor="#E5E6E8">
          <>
            <UploadIcon source={uploadIcon} />
            <Text
              text={`이미지 ${selectedImage ? '수정' : '첨부'}`}
              size="15px"
              lineHeight={22}
              color="#3A3B3E"
            />
          </>
        </UploadBox>
        {selectedImage && (
          <SelectedImageBox>
            <SelectedImage source={{ uri: selectedImage.uri }} />
            <DeleteButton onPress={onDeleteImage} activeOpacity={0.85}>
              <DeleteIcon source={whiteClose} />
            </DeleteButton>
          </SelectedImageBox>
        )}
      </ImageFormWrapper>
    </Container>
  );
}
const Container = styled.View`
  padding: 0 20px;
  margin: 0 0 28px;
`;

const ImageFormWrapper = styled.View`
  flex-direction: row;
`;

const UploadBox = styled.TouchableHighlight`
  width: 99px;
  height: 99px;
  border-width: 1px;
  border-color: #cbccce;
  background-color: #f5f6f7;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const UploadIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin: 0 0 4px;
`;

const SelectedImageBox = styled.View`
  position: relative;
`;

const SelectedImage = styled.Image`
  width: 99px;
  height: 99px;
  border-width: 1px;
  border-color: #cbccce;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #5f6165;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;

const DeleteIcon = styled.Image`
  width: 14px;
  height: 14px;
`;
export default ImageUploadForm;
