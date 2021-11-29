import ThemContext from 'Context';
import React, { useContext } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
export default React.memo((props: ActivityIndicatorProps) => {
  const context = useContext(ThemContext)
  const { size = 'small', color = context.AppColors.primary_green } = props;
  return <ActivityIndicator {...props} size={size} color={color} />
});