import * as React from 'react';
import { Pressable, View } from 'react-native';
import type { ViewStyle, StyleProp, PressableProps, DimensionValue, AnimatableNumericValue } from 'react-native';

type FlexWrap = ViewStyle['flexWrap'];
type FlexAlign = ViewStyle['alignItems'];
type FlexPosition = ViewStyle['position'];
type FlexJustify = ViewStyle['justifyContent'];

type Spacing = DimensionValue | undefined;
type Radius = AnimatableNumericValue | undefined;

interface SpacingProps {
  m?: Spacing;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
  mx?: Spacing;
  my?: Spacing;
  p?: Spacing;
  pt?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  pr?: Spacing;
  px?: Spacing;
  py?: Spacing;
}

interface BorderRadiusProps {
  borderRadius?: Radius;
  borderTopLeftRadius?: Radius;
  borderTopRightRadius?: Radius;
  borderBottomLeftRadius?: Radius;
  borderBottomRightRadius?: Radius;
}

interface BorderProps {
  borderWidth?: number;
  borderTopWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderColor?: string;
  borderTopColor?: string;
  borderRightColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
}

type FlexViewProps = SpacingProps & BorderRadiusProps & BorderProps & PressableProps & {
  children?: React.ReactNode;
  direction: 'row' | 'column';
  gap?: string | number;
  gapX?: string | number;
  gapY?: string | number;
  grow?: number;
  shrink?: number;
  justify?: FlexJustify;
  align?: FlexAlign;
  wrap?: FlexWrap;
  flex?: number;
  backgroundColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  position?: FlexPosition;
  top?: DimensionValue;
  right?: DimensionValue;
  bottom?: DimensionValue;
  left?: DimensionValue;
  z?: number;
  overflow?: ViewStyle['overflow'];
  style?: StyleProp<ViewStyle>;
};

const resolveSpacing = (props: SpacingProps): ViewStyle => {
  return {
    margin: props.m,
    marginTop: props.mt ?? props.my,
    marginBottom: props.mb ?? props.my,
    marginLeft: props.ml ?? props.mx,
    marginRight: props.mr ?? props.mx,
    padding: props.p,
    paddingTop: props.pt ?? props.py,
    paddingBottom: props.pb ?? props.py,
    paddingLeft: props.pl ?? props.px,
    paddingRight: props.pr ?? props.px,
  };
};

const resolveRadius = (props: BorderRadiusProps): ViewStyle => ({
  borderRadius: props.borderRadius,
  borderTopLeftRadius: props.borderTopLeftRadius,
  borderTopRightRadius: props.borderTopRightRadius,
  borderBottomLeftRadius: props.borderBottomLeftRadius,
  borderBottomRightRadius: props.borderBottomRightRadius,
});

const resolveBorder = (props: BorderProps): ViewStyle => ({
  borderWidth: props.borderWidth,
  borderTopWidth: props.borderTopWidth,
  borderRightWidth: props.borderRightWidth,
  borderBottomWidth: props.borderBottomWidth,
  borderLeftWidth: props.borderLeftWidth,
  borderColor: props.borderColor,
  borderTopColor: props.borderTopColor,
  borderRightColor: props.borderRightColor,
  borderBottomColor: props.borderBottomColor,
  borderLeftColor: props.borderLeftColor,
});

const FlexViewComponent = ({
  children, direction, gap, gapX, gapY, grow, shrink, flex,
  justify, align, wrap, backgroundColor,
  width, height, position, top, right, bottom, left,
  z, overflow, style, ...rest
}: FlexViewProps) => {
  const gapStyle: ViewStyle = {};
  // Only apply `gap` if both X and Y are not explicitly set
  if (gap != null && gapX == null && gapY == null) {
    gapStyle.gap = gap;
  }
  if (gapX != null) {
    gapStyle.columnGap = gapX;
  }
  if (gapY != null) {
    gapStyle.rowGap = gapY;
  }

  const baseStyle: ViewStyle = {
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    backgroundColor,
    width,
    height,
    position,
    top,
    right,
    bottom,
    left,
    zIndex: z,
    overflow,
    ...(flex !== undefined
      ? { flex }
      : {
        flexGrow: grow,
        flexShrink: shrink,
      }),
    ...gapStyle,
    ...resolveSpacing(rest),
    ...resolveRadius(rest),
    ...resolveBorder(rest),
  };

  const pressableProps = Object.keys(rest).some(key =>
    key.startsWith('on') && typeof (rest as any)[key] === 'function'
  );

  return pressableProps ? (
    <Pressable style={[baseStyle, style]} {...rest}>{children}</Pressable>
  ) : (
    <View style={[baseStyle, style]}>{children}</View>
  );
};

const FlexView = React.memo(FlexViewComponent);

type RowProps = Omit<FlexViewProps, 'direction'>;
export const Row = React.memo((props: RowProps) => <FlexView {...props} direction="row" />);

type ColumnProps = Omit<FlexViewProps, 'direction'>;
export const Column = React.memo((props: ColumnProps) => <FlexView {...props} direction="column" />);
