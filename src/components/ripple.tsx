import React from 'react';
import { LayoutChangeEvent, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

export type RippleProps = {
    disabled?: boolean;
    onPress?: () => void;
    rippleColor?: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

const Ripple = ({ children, onPress, disabled, style, rippleColor = 'rgba(0,0,0,0.2)' }: RippleProps) => {
    const scale = useSharedValue(0);
    const radius = useSharedValue(0);
    const opacity = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const duration = 750;

    const onLayout = (e: LayoutChangeEvent) => {
        const { width, height } = e.nativeEvent.layout;
        // compute max diagonal distance for full coverage
        radius.value = Math.sqrt(width ** 2 + height ** 2);
    };

    const tapGesture = Gesture.Tap()
        .enabled(!disabled)
        .onStart((e) => {
            scale.value = 0;
            opacity.value = 1;
            translateX.value = e.x;
            translateY.value = e.y;
            scale.value = withTiming(1, { duration });
        })
        .onEnd(() => {
            opacity.value = withTiming(0, { duration });
            if (onPress && !disabled) {
                runOnJS(onPress)();
            }
        });

    const animatedCircle = useAnimatedStyle(() => {
        const width = radius.value * 2;
        const height = radius.value * 2;
        return {
            width, height, borderRadius: radius.value,
            opacity: opacity.value, backgroundColor: rippleColor,
            transform: [
                { translateX: translateX.value - radius.value },
                { translateY: translateY.value - radius.value },
                { scale: scale.value }, // place it last, so scale after placed at center
            ],
        };
    });

    return (
        <GestureDetector gesture={tapGesture}>
            <Animated.View onLayout={onLayout} style={[styles.container, style]}>
                {children}
                <Animated.View pointerEvents="none" style={[styles.circle, animatedCircle]} />
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    circle: {
        top: 0,
        left: 0,
        position: 'absolute',
    },
});

export default Ripple;
