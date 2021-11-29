import ThemContext from 'Context';
import React, { useContext, useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

const HEADER_HEIGHT = 56;
const LEFT_COMPONENT_FLEX = 1;
const CENTER_COMPONENT_FLEX = 3;
const RIGHT_COMPONENT_FLEX = 1;

interface IHeaderProps extends ViewProps {
  leftComponent?: JSX.Element;
  leftComponentFlex?: number | 'free';
  leftCustomViewStyle?: StyleProp<ViewStyle>;
  centerComponent?: JSX.Element;
  centerComponentFlex?: number | 'free';
  centerCustomViewStyle?: StyleProp<ViewStyle>;
  rightComponent?: JSX.Element;
  rightComponentFlex?: number | 'free';
  rightCustomViewStyle?: StyleProp<ViewStyle>;
  topComponent?: JSX.Element;
  bottomComponent?: JSX.Element;
  headerHeight?: number;
  isEven?: boolean;
  justifyMainLayout?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  hideBottomSeparator?: boolean;
}

const Header: React.FC<IHeaderProps> = ({
  leftComponent,
  leftComponentFlex = LEFT_COMPONENT_FLEX,
  leftCustomViewStyle,
  centerComponent,
  centerComponentFlex = CENTER_COMPONENT_FLEX,
  centerCustomViewStyle,
  rightComponent,
  rightComponentFlex = RIGHT_COMPONENT_FLEX,
  rightCustomViewStyle,
  topComponent,
  bottomComponent,
  headerHeight = HEADER_HEIGHT,
  isEven = true,
  justifyMainLayout = 'space-between',
  hideBottomSeparator: hideSeparator,
  style
}) => {

  const contexst = useContext(ThemContext);
  if (isEven) {
    if (leftComponentFlex >= rightComponentFlex) rightComponentFlex = leftComponentFlex;
    leftComponentFlex = rightComponentFlex;
  }

  const separator = useMemo(() => {
    if (hideSeparator === true) {
      return { borderBottomWidth: 0 }
    } else {
      return { borderBottomWidth: 1, borderBottomColor: contexst.AppColors.tertiary_grey_3 }
    }
  }, [hideSeparator]);

  return <View style={[
    styles.default,
    separator,
    { height: headerHeight },
    style,
    { flexDirection: topComponent || bottomComponent ? 'column' : 'row' }
  ]}>
    {topComponent}
    <View style={[styles.mainComponents, { justifyContent: justifyMainLayout }]} >
      <View
        style={
          leftCustomViewStyle ? leftCustomViewStyle :
            {
              alignItems: 'flex-start',
              flex: leftComponentFlex == 'free' ? undefined : leftComponentFlex
            }
        }
      >
        {leftComponent}
      </View>
      <View
        style={
          centerCustomViewStyle ? centerCustomViewStyle :
            {
              alignItems: 'center',
              flexGrow: centerComponentFlex == 'free' ? undefined : centerComponentFlex
            }
        }
      >
        {centerComponent}
      </View>
      <View
        style={
          rightCustomViewStyle ? rightCustomViewStyle :
            {
              alignItems: 'flex-end',
              flex: rightComponentFlex == 'free' ? undefined : rightComponentFlex
            }
        }
      >
        {rightComponent}
      </View>
    </View>
    {bottomComponent}
  </View>
}

const styles = StyleSheet.create({
  default: { backgroundColor: 'white' },
  mainComponents: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
})

export default Header;