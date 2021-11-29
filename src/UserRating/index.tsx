import ThemContext from 'Context';
import _ from 'lodash';
import React, { useContext, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from '../Icon';
import Text from '../Text';

export default React.memo((props: { rating?: number, numbersOfRate?: number }) => {
  const { rating = 0, numbersOfRate } = props;

  const context = useContext(ThemContext);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: { flexDirection: 'row', alignItems: 'center' },
      nonRate: { color: context.AppColors.black, fontSize: context.FSize.S12, marginLeft: context.AppSpaces.S8 },
      point: { color: context.AppColors.primary_green, fontSize: context.FSize.S12, marginLeft: context.AppSpaces.S8 },
      numsOfRate: { fontSize: context.FSize.S12 }
    })
  }, [context]);

  const rounded = useMemo(() => {
    return _.floor(rating, 1);
  }, [rating]);

  return <View style={styles.container}>

    {numbersOfRate ? <>
      <Icon size='small' icon='star' tintColor={context.AppColors.primary_yellow} />
      <Text style={styles.point}>{rounded} <Text style={styles.numsOfRate}>({numbersOfRate})</Text></Text>
    </> : <>
      <Icon size='small' icon='star' tintColor={context.AppColors.tertiary_grey_2} />
      <Text style={styles.nonRate}>--</Text>
    </>}
  </View>
});