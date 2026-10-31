import React from 'react';
import {
  Pressable,
  Text,
  PressableProps,
  View,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from 'react-native-svg';

export interface GradientButtonProps extends PressableProps {
  title: string;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  className?: string;
  gradientClassName?: string;
  textClassName?: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  contentAlignment?: 'center' | 'left' | 'right';
  fitWidth?: boolean;
}

export function GradientButton({
  title,
  colors = ['#004F2C', '#00B565'],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  className = '',
  gradientClassName = '',
  textClassName = '',
  textStyle,
  icon,
  contentAlignment = 'center',
  fitWidth = false,
  onPress,
  style,
  ...props
}: GradientButtonProps) {
  const gradientId = React.useId();

  const isFit = fitWidth || className.includes('self-start') || className.includes('w-auto');
  const widthClass = isFit ? 'self-start' : 'w-full';

  const alignmentClass =
    contentAlignment === 'left'
      ? isFit ? 'justify-start pl-1.5 pr-5' : 'justify-start pl-2'
      : contentAlignment === 'right'
      ? 'justify-end pr-3'
      : 'justify-center';

  return (
    <Pressable
      onPress={onPress}
      style={style}
      className={`${widthClass} h-14 rounded-full overflow-hidden flex-row items-center ${alignmentClass} active:opacity-85 ${className}`}
      {...props}
    >
      {/* Background Gradient Locked to Button Bounds */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg width="100%" height="100%">
          <Defs>
            <SvgLinearGradient
              id={gradientId}
              x1={`${start.x * 100}%`}
              y1={`${start.y * 100}%`}
              x2={`${end.x * 100}%`}
              y2={`${end.y * 100}%`}
            >
              {colors.map((color, index) => {
                const offset =
                  colors.length === 1
                    ? '0%'
                    : `${Math.round((index / (colors.length - 1)) * 100)}%`;
                return <Stop key={index} offset={offset} stopColor={color} />;
              })}
            </SvgLinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill={`url(#${gradientId})`} />
        </Svg>
      </View>

      {/* Button Content */}
      <View 
        className={`flex-row items-center ${
          contentAlignment === 'left' ? 'justify-start' : contentAlignment === 'right' ? 'justify-end' : 'justify-center'
        } ${gradientClassName}`} 
        pointerEvents="none"
      >
        {icon && <View className="mr-2.5">{icon}</View>}
        <Text
          style={textStyle}
          className={`font-bold text-lg tracking-wide ${textClassName}`}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

export default GradientButton;
