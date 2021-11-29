import ThemContext from 'Context'
import React, { forwardRef, useContext } from 'react'
import { Platform, Switch, SwitchProps } from 'react-native'

export default forwardRef<Switch, SwitchProps>((props) => {
  const context = useContext(ThemContext)
  return (<Switch
    thumbColor={Platform.OS === 'android' ? context.AppColors.primary_green : undefined}
    trackColor={{ false: context.AppColors.tertiary_grey_2, true: context.AppColors.primary_green }}
    {...props}
    style={[{
      height: context.AppSpaces.S32,
      backgroundColor: 'transparent'
    }, props.style]} />)
})