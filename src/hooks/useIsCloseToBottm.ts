import { NativeScrollEvent } from 'react-native';

function useIsCloseToBottom() {
  const isCloseToBottom = (
    nativeEvent: NativeScrollEvent,
    paddingToBottom: number = 20,
  ) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return { isCloseToBottom };
}

export default useIsCloseToBottom;
