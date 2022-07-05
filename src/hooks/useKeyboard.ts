import { useCallback, useEffect, useState } from 'react';
import { Dimensions, Keyboard, KeyboardEvent, StatusBar } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { isAndroid } from '@/utils/check';
import { getScreenSize } from '@/utils/common';

function useKeyboard() {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { height: screenHeight } = getScreenSize();
  const { height: windowHeight } = Dimensions.get('window');

  const onKeyboardDidShow = useCallback(
    (event: KeyboardEvent) => {
      setIsKeyboardShow(true);
      const height = event.endCoordinates.height;
      if (isAndroid()) {
        const statusBarHeight = StatusBar.currentHeight || 0;
        const navigationBarHeight =
          screenHeight - windowHeight - statusBarHeight;
        setKeyboardHeight(height + navigationBarHeight);
      } else {
        setKeyboardHeight(height + getBottomSpace());
      }
    },
    [windowHeight, screenHeight],
  );

  const onKeyboardDisHide = useCallback(() => {
    setIsKeyboardShow(false);
    setKeyboardHeight(0);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDisHide,
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [onKeyboardDidShow, onKeyboardDisHide]);

  return { isKeyboardShow, keyboardHeight };
}

export default useKeyboard;
