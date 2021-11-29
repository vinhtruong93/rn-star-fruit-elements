import Button, { ButtonProps } from 'Button';
import ThemContext from 'Context';
import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
interface ICloseProps extends PropsWithChildren<ButtonProps> {
  tintColor?: string;
}

const Close: React.FC<ICloseProps> = (props: ICloseProps) => {
  const context = useContext(ThemContext);
  const styles = useMemo(() => StyleSheet.create({
    button: {
      flex: 1,
      fontSize: context.FSize.S12,
      fontWeight: '600',
      color: context.AppColors.black,
      paddingHorizontal: context.AppSpaces.S16
    }
  }), []);
  const { tintColor = context.AppColors.black } = props;

  return <Button type='clear' {...props as any} buttonStyle={[styles.button, props.buttonStyle]} iconName={'ic_close'} iconStyle={{ tintColor }} >{props.children}</Button>
}



export default Close;