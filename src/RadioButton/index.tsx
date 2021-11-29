import { HitSlop } from 'common';
import ThemContext from 'Context';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import TouchableDebounce from 'TouchableDebounce';
const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' }
});

export default React.memo((props: { disabled?: boolean, checked?: boolean, activeColor?: string, inactiveColor?: string, size?: number, onPress?: () => void }) => {
  const context = useContext(ThemContext)
  const { disabled, checked, activeColor = context.AppColors.primary_green, inactiveColor = context.AppColors.black, size = context.AppSpaces.S20, onPress } = props;
  const color = disabled ? context.AppColors.tertiary_grey_3 : checked ? activeColor : inactiveColor;

  return <TouchableDebounce onPress={onPress} disabled={disabled} style={[styles.container, { width: size, height: size, borderWidth: context.AppSpaces.S2, borderColor: color, borderRadius: size / 2 }]} hitSlop={HitSlop}>
    {checked ? <View style={{ backgroundColor: color, width: size / 2, height: size / 2, borderRadius: size / 4 }} /> : null}
  </TouchableDebounce>
});