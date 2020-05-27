import React from 'react';
import {Shape, Text as RNText} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  bold: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  color: PropTypes.string,
  extraLarge: PropTypes.bool,
  style: PropTypes.shape({}),
  children: PropTypes.string.isRequired,
};

const defaultProps = {
  bold: false,
  color: null,
  style: null,
  small: false,
};

const Text = ({
                bold,
                color,
                large,
                small,
                theme,
                style,
                children,
                extraLarge,
                ...props
              }: {
  bold?: boolean;
  color: string;
  large?: boolean;
  small?: boolean;
  theme?: any;
  style: any;
  children: any;
  extraLarge?: boolean;

}) => {
  const textStyle = [{color: color || theme.secondaryColor, fontSize: 18}];

  if (small) {
    textStyle.push({color: undefined, fontSize: 16});
  } else if (large) {
    textStyle.push({color: undefined, fontSize: 22});
  } else if (extraLarge) {
    textStyle.push({color: undefined, fontSize: 30});
  }
  if (bold) {
    textStyle.push({color: undefined, fontSize: 18, fontWeight: 'bold'});
  }

  return (
    <RNText
      {...props}
      style={[textStyle, style]}
    >
      {children}
    </RNText>
  );
};

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
