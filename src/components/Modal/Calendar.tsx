import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

interface AlertProps {
  modalVisible: boolean;
  onRequestClose: () => void;
  onSelect: () => void;
  prevDate: string | undefined;
}

function CalendarModal({
  modalVisible,
  onRequestClose,
  prevDate,
  onSelect,
}: AlertProps) {
  return (
    <View>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={200}
        animationOutTiming={200}
        isVisible={modalVisible}
        backdropOpacity={0.5}
        hideModalContentWhileAnimating={true}
        onBackdropPress={onRequestClose}>
        <ModalContentWrap>
          <Calendar
            style={{
              borderRadius: 20,
            }}
            theme={{
              arrowColor: '#187aea',
              textDayFontWeight: '500',
              textDayHeaderFontSize: 16,
              textMonthFontSize: 18,
              textMonthFontWeight: '600',
            }}
            onDayPress={day => {
              onSelect(day.dateString);
              onRequestClose();
            }}
            current={prevDate}
            markingType={'period'}
            markedDates={{
              [prevDate]: {
                textColor: 'white',
                color: '#187aea',
                startingDay: true,
                endingDay: true,
              },
            }}
          />
        </ModalContentWrap>
      </Modal>
    </View>
  );
}

interface AlertViewProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ModalContentWrap = styled.View`
  background-color: white;
  padding: 10px 0 20px;
  border-radius: 20;
`;

export default CalendarModal;
