import ThemContext from 'Context';
import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

interface ITextWrapFontProps extends PropsWithChildren<TextProps> { }
/**
 * Font size with default app's font-family, color, font-size = 14
 */
export default (props: ITextWrapFontProps) => {
  const context = useContext(ThemContext);
  const lineHeight = useMemo(() => {
    const size = StyleSheet.flatten(props.style)?.fontSize;
    if (size) {
      switch (size) {
        case 10:
          return context.AppSpaces.S16;
        case 12:
          return context.AppSpaces.S18;
        case 14:
          return context.AppSpaces.S22;
        case 16:
          return context.AppSpaces.S24;
        case 24:
          return context.AppSpaces.S32;
        default:
          return undefined;
      }
    }
    return context.AppSpaces.S18;
  }, [props.style]);

  const def: TextStyle = useMemo(() => {
    return {
      color: context.AppColors.black,
      fontFamily: context.fontFamily,
      fontSize: context.FSize.S14,
      fontWeight: '500'
    }
  }, [context]);

  return <Text {...props} style={[def, { lineHeight }, props.style]}>
    {props.children}
  </Text >
}