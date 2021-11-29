import ThemContext from 'Context';
import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { StyleSheet, TextProps } from 'react-native';
import Text from 'Text';
interface ITitleProps extends PropsWithChildren<TextProps> { }

const Title: React.FC<ITitleProps> = (props: ITitleProps) => {
  const context = useContext(ThemContext);
  const styles = useMemo(() => StyleSheet.create({
    title: {
      fontSize: context.FSize.S16,
      fontWeight: '700',
      color: context.AppColors.black,
      textAlign: 'center'
    }
  }), []);

  return <Text numberOfLines={2} style={[styles.title, props.style]}>{props.children}</Text>
}

export default Title;