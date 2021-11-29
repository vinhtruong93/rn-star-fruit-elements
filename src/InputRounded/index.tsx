
import React, { forwardRef, useCallback, useContext, useMemo, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputFocusEventData, TextInputProps, View, ViewStyle } from 'react-native';
import TouchableDebounce from '../TouchableDebounce';
import Icon from '../Icon';
import ThemContext from 'Context';
import { HitSlop } from 'common';

type InputType = 'search'

export interface IInputRoundedProps extends TextInputProps {
  type?: InputType;
}

export default forwardRef<TextInput, IInputRoundedProps>((props, ref) => {
  const { style, type, value } = props;
  const [isFocused, setIsFocused] = useState<boolean>();
  const context = useContext(ThemContext);

  const styles = useMemo(() => StyleSheet.create({
    default: {
      fontFamily:context.fontFamily,
      color: context.AppColors.black,
      paddingVertical: 0,
      fontSize: context.FSize.S14,
      backgroundColor: context.AppColors.tertiary_grey_3,
      borderRadius: context.AppSpaces.S24,
      paddingHorizontal: context.AppSpaces.S16,
      borderWidth: 1
    },
    ignoreMargin: {
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
      flex: undefined
    },
    ignoreBox: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    title: {
      position: 'absolute',
      top: context.AppSpaces.S8,
      left: context.AppSpaces.S16,
      color: context.AppColors.tertiary_grey,
      fontSize: context.FSize.S10
    },
    leftIcon: {
      position: 'absolute',
      left: context.AppSpaces.S12,
      top: 0,
      bottom: 0,
      width: context.AppSpaces.S24,
      justifyContent: 'center',
      alignItems: 'center'
    },
    iconClear: {
      position: 'absolute',
      right: context.AppSpaces.S12,
      top: 0,
      bottom: 0,
      width: context.AppSpaces.S24,
      justifyContent: 'center',
      alignItems: 'center'
    },
    invalidMessage: {
      color: context.AppColors.error,
      fontSize: context.FSize.S10,
      marginTop: context.AppSpaces.S4,
      marginLeft: context.AppSpaces.S16
    }
  }), []);

  const onFocus = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    props.onFocus && props.onFocus(e);
  }, [props.onFocus]);

  const onBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    props.onBlur && props.onBlur(e);
  }, [props.onBlur]);

  const borderColor = useMemo(() => {
    if (isFocused === true) return context.AppColors.black;
    return context.AppColors.transparent;
  }, [isFocused, style]);

  const showIcon = useMemo(() => {
    return type === 'search' && isFocused === false && (value === undefined || value === '');
  }, [type, isFocused, value]);

  const paddingLeft = useMemo(() => {
    if (showIcon === true) return StyleSheet.flatten(style)?.paddingLeft || 0 + context.AppSpaces.S48;
    return StyleSheet.flatten(style)?.paddingLeft
  }, [showIcon]);

  const rounded: ViewStyle = useMemo(() => {
    const height = Number(StyleSheet.flatten(style)?.height || context.AppSpaces.S48)
    return {
      height,
      borderRadius: height / 2
    }
  }, [style])

  const clear = useMemo(() => {
    return isFocused && value;
  }, [value, isFocused]);

  const onClearPress = useCallback(() => {
    if (props.onChangeText) props.onChangeText('');
  }, [props.onChangeText]);

  return <View style={[props.style, styles.ignoreBox]}>
    <TextInput
      underlineColorAndroid='transparent'
      placeholderTextColor={context.AppColors.tertiary_grey}
      {...props}
      onFocus={onFocus}
      onBlur={onBlur}
      ref={ref}
      style={[styles.default, rounded, { paddingLeft }, props.style, { borderColor }, styles.ignoreMargin]}
    />
    {clear ? <TouchableDebounce hitSlop={HitSlop} onPress={onClearPress} style={styles.iconClear}><Icon icon='x_circle' /></TouchableDebounce> : null}
    {showIcon ? <View style={styles.leftIcon}><Icon tintColor={context.AppColors.tertiary_grey} icon='search' /></View> : null}
  </View>
})

