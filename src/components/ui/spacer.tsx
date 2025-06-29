import * as React from 'react';
import { View } from 'react-native';
import type { ViewStyle, StyleProp, DimensionValue } from 'react-native';

type Orientation = 'horizontal' | 'vertical';

export type SpacerProps = {
  /** Sets the spacer's size in both width & height if `orientation` is not set */
  size?: number;

  /** Set explicit width */
  width?: DimensionValue;

  /** Set explicit height */
  height?: DimensionValue;

  /** Controls the primary axis in flex containers */
  orientation?: Orientation;

  /** If true, spacer will grow using flex: 1 */
  grow?: boolean;

  /** Shrinks to 0px instead of applying default height/width */
  shrink?: boolean;

  /** Optional custom style */
  style?: StyleProp<ViewStyle>;
};

export const Spacer = React.memo(
  ({
    size,
    width,
    height,
    orientation,
    grow = false,
    shrink = false,
    style,
  }: SpacerProps) => {
    const finalStyle: ViewStyle = {
      ...(grow ? { flex: 1 } : {}),
      ...(shrink
        ? { width: 0, height: 0 }
        : size !== undefined
          ? orientation === 'vertical'
            ? { height: size }
            : orientation === 'horizontal'
              ? { width: size }
              : { width: size, height: size }
          : {
            width: width ?? (orientation === 'horizontal' ? 8 : undefined),
            height: height ?? (orientation === 'vertical' ? 8 : undefined),
          }),
    };

    return <View style={[finalStyle, style]} />;
  }
);
