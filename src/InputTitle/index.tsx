
import React, { forwardRef, useCallback, useContext, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, NativeSyntheticEvent, Pressable, StyleSheet, TextInput, TextInputFocusEventData, TextInputProps, View } from 'react-native';
// import { context.AppColors, context.AppSpaces, fontFamily, FSize } from 'src/common/appConstants';
import Text from '../Text';
import Icon from '../Icon';
import ThemContext from 'Context';

export interface IInputTitleProps extends TextInputProps {

  /**
   * - undefined: Trạng thái ban đầu chưa show UI
   * 
   * - false: sẽ show UI invalid và inValidMessage nếu có
   * 
   * - true: show UI valid
   * 
   * @link https://www.figma.com/file/74liYGUsrkXsWcb2OfVpCC/MVP?node-id=1%3A5
   */
  isValid?: boolean;

  /**
   * Show message khi giá trị biến isValid = true
   * 
   * @link https://www.figma.com/file/74liYGUsrkXsWcb2OfVpCC/MVP?node-id=1%3A5
   */
  inValidMessage?: string;

  /**
   * 
   */
  isValidLoading?: boolean;

  /**
   * 
   * @link https://www.figma.com/file/74liYGUsrkXsWcb2OfVpCC/MVP?node-id=1%3A5
   */
  title?: string;
}

const ValidationIcon = (props: { loading?: boolean, isValid?: boolean }) => {
  const { loading, isValid } = props;
  const context = useContext(ThemContext)
  if (loading) return <ActivityIndicator style={styles.icon} />
  if (isValid) return <Icon icon='check_circle' style={[styles.icon, { tintColor: context.AppColors.primary_green }]} />
  return null;
}

export default forwardRef<TextInput, IInputTitleProps>((props, ref) => {
  const { value, title, isValid, isValidLoading, style, inValidMessage, placeholder, multiline, maxLength } = props;
  const [isFocused, setIsFocused] = useState<boolean>();
  const context = useContext(ThemContext)

  const refInput = useRef<TextInput>(null)

  useImperativeHandle(ref, () => refInput.current!);

  const onFocus = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    props.onFocus && props.onFocus(e);
  }, [props.onFocus]);

  const onBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    props.onBlur && props.onBlur(e);
  }, [props.onBlur]);

  const showTitle = useMemo(() => {
    return title !== undefined && (isFocused == true || value !== undefined && value.length > 0 || multiline == true && value !== undefined);
  }, [value, isFocused, title, multiline]);

  const placeHolder = useMemo(() => {
    return showTitle == true ? undefined : title ? title : placeholder;
  }, [showTitle, title, placeholder]);

  const borderColor = useMemo(() => {
    if (isValid === true) return context.AppColors.primary_green;
    if (isValid === false) return context.AppColors.error;
    if (isFocused === true) return context.AppColors.black;
    return context.AppColors.transparent;
  }, [isValid, isFocused, style]);

  const paddingTop = useMemo(() => {
    if (showTitle) return StyleSheet.flatten(props.style)?.paddingTop || 0 + (multiline ? context.AppSpaces.S28 : context.AppSpaces.S16);
    else return multiline ? context.AppSpaces.S16 : StyleSheet.flatten(props.style)?.paddingTop;
  }, [showTitle, style, multiline]);

  const showHeaderBar = useMemo(() => {
    return showTitle == true || maxLength !== undefined;
  }, [showTitle, maxLength]);

  const backgroundColor = useMemo(() => {
    return StyleSheet.flatten(props.style)?.backgroundColor || context.AppColors.tertiary_grey_3
  }, [style])

  const focusInput = useCallback(() => { refInput.current?.focus() }, []);

  return <View onLayout={props.onLayout} style={[props.style, styles.ignoreBox]}>
    <TextInput
      underlineColorAndroid='transparent'
      placeholderTextColor={context.AppColors.tertiary_grey}
      {...props}
      onLayout={undefined}
      placeholder={placeHolder}
      onFocus={onFocus}
      onBlur={onBlur}
      ref={refInput}
      style={[styles.default, {
        fontFamily: context.fontFamily,
        color: context.AppColors.black,
      }, props.style, { borderColor, paddingTop, backgroundColor, textAlignVertical: props.multiline ? 'top' : undefined }, styles.ignoreMargin]}
    />
    {isValid == false ? <Text style={[styles.invalidMessage, { color: context.AppColors.error }]}>{inValidMessage}</Text> : null}
    <ValidationIcon isValid={isValid} loading={isValidLoading} />
    {
      showHeaderBar ? <Pressable onPress={focusInput} style={[styles.headerBox, { backgroundColor: showTitle ? backgroundColor : context.AppColors.transparent }]}>
        {showTitle == true ? <Text style={[styles.title, { color: context.AppColors.tertiary_grey }]}>{title}</Text> : null}
        {maxLength ? <Text style={[styles.length, { color: context.AppColors.tertiary_grey_2 }]}>{maxLength - (value?.length || 0)}</Text> : null}
      </Pressable> : null
    }
  </View>
})

const styles = StyleSheet.create({
  default: {

    paddingVertical: 0,
    fontSize: 14,
    height: 60,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1
  },
  ignoreMargin: {
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  ignoreBox: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'transparent'
  },
  title: {
    position: 'absolute',
    top: 8,
    left: 16,
    fontSize: 10
  },
  icon: {
    position: 'absolute',
    right: 8,
    top: 28,
    width: 24,
    height: 24,

  },
  invalidMessage: {
    fontSize: 10,
    marginTop: 4,
    marginLeft: 16
  },
  length: {
    position: 'absolute',
    right: 8,
    top: 4,
    fontSize: 10
  },
  headerBox: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    height: 24
  }
})