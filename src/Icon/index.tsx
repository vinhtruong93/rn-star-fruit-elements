import ThemContext from 'Context';
import { isArray } from 'lodash';
import React, { useContext, useMemo } from 'react';
import { Animated, Image as RNImage, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import icons from '../../assets/icons';

const SIZE_UNIT = {
  /**
   * Size 16
   */
  small: 16,
  /**
   * Size 24
   */
  normal: 24,
  /**
   * Size 32
   */
  large: 32,
};

type Size = keyof typeof SIZE_UNIT;

interface IProps {
  size?: number | Size;
  icon: ImageSourcePropType | keyof typeof icons;
  style?: StyleProp<ImageStyle>;
  /**
   * use Animated component
   */
  animated?: boolean;
  tintColor?: string | null;
}

export default (props: IProps) => {
  const AppColors = useContext(ThemContext).AppColors
  const { size = 24, animated, icon } = props

  const tintColor = useMemo(() => {
    if (props.tintColor === null) return undefined;
    if (!!props.tintColor) return props.tintColor;
    return AppColors.black;
  }, [props.tintColor, props.style, AppColors]);

  const fnSize = useMemo(() => {
    return typeof size === 'number' ? size as number : SIZE_UNIT[size];
  }, [size])

  const Image = useMemo(() => animated ? Animated.Image as any : RNImage, [animated]);

  const source = useMemo(() => {
    if (isImageSourcePropType(icon)) {
      return icon;
    }
    return icons[icon];
  }, [icon])

  return (<Image
    resizeMode='contain'
    source={source}
    {...props}
    style={StyleSheet.flatten([{
      height: fnSize,
      width: fnSize,
    }, { tintColor }, props.style])}
  />);
}

function isImageSourcePropType(data: any): data is ImageSourcePropType {
  if (typeof data === 'number' || isArray(data) || (typeof data === 'object' && 'uri' in data)) return true;
  return false;
}
