import React, { forwardRef, useContext, useMemo } from 'react';
import {
  ImageStyle,
  Insets,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import icons from '../../assets/icons';
import Text from '../Text';
import TouchableDebounce from '../TouchableDebounce';
import Spinner from '../Spinner';
import Icon from '../Icon';
import ThemContext from 'Context';

export interface ButtonProps {
  onPress?: () => void;
  type?: 'solid' | 'clear' | 'outline';
  disabled?: boolean;
  disabledStyle?: StyleProp<ViewStyle>;
  disabledTitleStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  loadingStyle?: StyleProp<ViewStyle>;
  iconName?: keyof typeof icons | JSX.Element;
  iconStyle?: StyleProp<ImageStyle>
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  buttonColor?: string;
  borderColor?: string;
  borderRadius?: number;
  buttonStyle?: StyleProp<ViewStyle>;
  raised?: boolean;
  raisedStyle?: StyleProp<ViewStyle>;
  hitSlop?: Insets;
  onLayout?: (event: LayoutChangeEvent) => void;
  usingGHTouchableOpacity?: boolean;
  height?: '48' | '32' | number;
  numberOfLines?: number
}

const Button = forwardRef<TouchableOpacity, ButtonProps>((props, ref) => {
  const {
    onPress,
    type = 'solid',
    height = '48',
    disabled,
    disabledStyle,
    disabledTitleStyle,
    loading,
    loadingStyle,
    iconName,
    title,
    titleStyle,
    buttonColor,
    borderColor,
    borderRadius,
    buttonStyle,
    raised,
    raisedStyle,
    hitSlop,
    onLayout,
    numberOfLines
  } = props;
  const context = useContext(ThemContext);

  const spaces: { icon?: ImageStyle, title?: TextStyle, button: ViewStyle } = useMemo(() => {
    if (iconName && title) {
      return {
        button: { paddingHorizontal: context.AppSpaces.S16 },
        title: { marginLeft: context.AppSpaces.S8 }
      }
    }
    if (iconName)
      return {
        button: { paddingHorizontal: context.AppSpaces.S8 }
      }
    return {
      button: { paddingHorizontal: context.AppSpaces.S16 }
    }
  }, [iconName, title])

  const titleByHeight = useMemo(() => {
    if (typeof height === 'string') {
      if (height === '48')
        return { fontSize: context.FSize.S14 }
      if (height === '32')
        return { fontSize: context.FSize.S12 }
    }
    return { fontSize: context.FSize.S14 }
  }, [height]);

  return <TouchableDebounce onLayout={onLayout} hitSlop={hitSlop} ref={ref} onPress={onPress} activeOpacity={!!onPress ? 0.6 : 1} disabled={disabled} usingGHTouchableOpacity={props.usingGHTouchableOpacity}
    style={[
      styles.button,
      { backgroundColor: context.AppColors.primary_yellow },
      spaces.button,
      borderRadius ? { borderRadius } : undefined,
      { borderWidth: type == 'outline' ? 1 : undefined },
      buttonColor && type == 'solid' ? { backgroundColor: buttonColor } : undefined,
      borderColor && type == 'outline' ? { borderColor } : undefined,
      disabled && type == 'solid' ? { backgroundColor: context.AppColors.tertiary_grey_3 } : undefined,
      disabled && type == 'outline' ? { borderColor: '#999999' } : undefined,
      raised && type != 'clear' ? styles.raised : undefined,
      raised && type != 'clear' && raisedStyle ? raisedStyle : undefined,
      type == 'clear' || type == 'outline' ? { backgroundColor: undefined } : undefined,
      { height: height ? Number(height) : undefined },
      buttonStyle,
      disabled && disabledStyle,
    ]}>
    {loading && <Spinner style={loadingStyle} />}
    {!loading && iconName ?
      <>
        {typeof iconName === 'string' ? <Icon
          style={StyleSheet.flatten([spaces.icon, props.iconStyle])}
          icon={iconName}
        /> : iconName}
      </> : null}
    {(!loading && title) ? <Text numberOfLines={numberOfLines} style={[styles.title, spaces.title, titleByHeight,
      titleStyle, disabled ? { color: context.AppColors.tertiary_grey } : undefined,
    disabled && disabledTitleStyle
    ]}>{title}</Text> : null}
  </TouchableDebounce>
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    height: 48,

  },
  raised: {
    overflow: 'visible',
    shadowColor: 'rgba(0, 0, 0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1
  },
  title: {
    fontWeight: '600'
  }
});

export default Button;

