import Button, { ButtonProps } from 'Button';
import ThemContext from 'Context';
import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
interface BackProps extends PropsWithChildren<ButtonProps> {
  tintColor?: string;
}

const Back: React.FC<BackProps> = (props: BackProps) => {
  const context = useContext(ThemContext);
  const styles = useMemo(() => StyleSheet.create({
    button: {
      paddingHorizontal: context.AppSpaces.S16
    }
  }), []);
  
  const { tintColor = context.AppColors.black } = props;
  return <Button type='clear' {...props as any} buttonStyle={[styles.button, props.buttonStyle]} iconName={'arrow_back'} iconStyle={{ tintColor }} >{props.children}</Button>
}



export default Back;