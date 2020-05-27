import React from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {withTheme} from '~/theming/index';

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
  onScroll: () => {
  },
};

const Container = ({
                     theme,
                     onScroll,
                     children,
                     transparency,
                   }: {
  theme?: any;
  onScroll?: (offset: number) => void;
  children?: React.ReactNode;
  transparency?: boolean;
}) => (
  <SafeAreaView style={{flex: 1, backgroundColor: !transparency ? theme.background : 'rgba(0, 0, 0, 0.7)'}}>
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

export default withTheme(Container);
