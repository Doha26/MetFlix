import React from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '~/theming/colors';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.node,
    ),
  ]).isRequired,
  onScroll: PropTypes.func,
  transparency: PropTypes.bool,
};

const defaultProps = {
  transparency: false,
  onScroll: () => {},
};

const Container = ({
                     onScroll,
                     children,
                   }: {
  onScroll?: (offset: number) => void;
  children?: React.ReactNode;
  transparency?: boolean;
}) => (
  <SafeAreaView style={{flex: 1, backgroundColor:Colors.black}}>
    <ScrollView
      scrollEventThrottle={1}
      onScroll={({nativeEvent}) => onScroll ? onScroll(nativeEvent.contentOffset.y) : null}
      style={{flex: 1}}
    >
      {children}
    </ScrollView>
  </SafeAreaView>
);

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
