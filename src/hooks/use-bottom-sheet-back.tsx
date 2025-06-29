import * as React from 'react';
import { BackHandler } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';

export const useBottomSheetBack = (
  bottomSheetOpen: boolean,
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>,
  onClose?: () => void,
) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (bottomSheetOpen && bottomSheetModalRef?.current) {
          bottomSheetModalRef?.current.close();
          onClose?.();
          return true;
        }
        return false;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [bottomSheetModalRef, bottomSheetOpen, onClose]),
  );
};
