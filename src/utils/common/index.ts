import { Dimensions } from 'react-native';
import Sound from 'react-native-sound';

import { isAndroid } from '@/utils/check';

export function CalculateBox(
  targetArr: [number, number?, number?, number?],
): string {
  let resultArr: [number, number, number, number] = [
    targetArr[0],
    targetArr[0],
    targetArr[0],
    targetArr[0],
  ];

  if (targetArr.length === 2) {
    if (targetArr[1] !== undefined) {
      resultArr = [targetArr[0], targetArr[1], targetArr[0], targetArr[1]];
    }
  } else if (targetArr.length === 3) {
    if (targetArr[1] !== undefined && targetArr[2] !== undefined) {
      resultArr = [targetArr[0], targetArr[1], targetArr[2], targetArr[1]];
    }
  } else if (targetArr.length === 4) {
    if (
      targetArr[1] !== undefined &&
      targetArr[2] !== undefined &&
      targetArr[3] !== undefined
    ) {
      resultArr = [targetArr[0], targetArr[1], targetArr[2], targetArr[3]];
    }
  }

  return `${resultArr.toString().replace(/,/gi, 'px ')}px`;
}

export enum MPB {
  Margin = 'margin',
  Padiing = 'padding',
  Border = 'border',
  BorderRadius = 'borderRadius',
}

export function CalculateBlock(
  targetArr: [number, number?, number?, number?],
  styleType: MPB,
): Record<string, number> {
  let resultArr: [number, number, number, number] = [
    targetArr[0],
    targetArr[0],
    targetArr[0],
    targetArr[0],
  ];

  if (targetArr.length === 2) {
    if (targetArr[1] !== undefined) {
      resultArr = [targetArr[0], targetArr[1], targetArr[0], targetArr[1]];
    }
  } else if (targetArr.length === 3) {
    if (targetArr[1] !== undefined && targetArr[2] !== undefined) {
      resultArr = [targetArr[0], targetArr[1], targetArr[2], targetArr[1]];
    }
  } else if (targetArr.length === 4) {
    if (
      targetArr[1] !== undefined &&
      targetArr[2] !== undefined &&
      targetArr[3] !== undefined
    ) {
      resultArr = [targetArr[0], targetArr[1], targetArr[2], targetArr[3]];
    }
  }

  let styleProps: Record<string, number> = {};

  if (styleType === MPB.Margin) {
    styleProps = {
      marginTop: resultArr[0],
      marginRight: resultArr[1],
      marginBottom: resultArr[2],
      marginLeft: resultArr[3],
    };
  } else if (styleType === MPB.Padiing) {
    styleProps = {
      paddingTop: resultArr[0],
      paddingRight: resultArr[1],
      paddingBottom: resultArr[2],
      paddingLeft: resultArr[3],
    };
  } else if (styleType === MPB.Border) {
    styleProps = {
      borderTopWidth: resultArr[0],
      borderRightWidth: resultArr[1],
      borderBottomWidth: resultArr[2],
      borderLeftWidth: resultArr[3],
    };
  } else {
    styleProps = {
      borderTopLeftRadius: resultArr[0],
      borderBottomLeftRadius: resultArr[1],
      borderTopRightRadius: resultArr[2],
      borderBottomRightRadius: resultArr[3],
    };
  }

  return styleProps;
}

export const formatNum = (num: number) => {
  if (isAndroid()) {
    if (`${num}`.length <= 1) {
      return `0${num}`;
    } else {
      return num;
    }
  } else {
    return num.toLocaleString(undefined, { minimumIntegerDigits: 2 });
  }
};

export const getScreenSize = () => {
  const { width, height } = Dimensions.get('screen');
  return { width, height };
};
export const playSound = (soundFileName: string) => {
  const sound = new Sound(soundFileName, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('ERROR', error);
    } else {
      sound.play();
    }
  });
};
export const lconfig = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
