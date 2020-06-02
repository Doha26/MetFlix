import React from 'react';
import PropTypes from 'prop-types';
import {default as Feather} from 'react-native-vector-icons/Feather';
import Colors from '~/theming/colors';

const propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  large: PropTypes.bool,
};

const defaultProps = {
  color: Colors.white,
  large: false,
};

const Icon = ({
                name,
                color, large,
              }: {name: string; color: string; large?: boolean}) => (
  <Feather
    name={name}
    size={!large ? 20 : 28}
    color={color}
  />
);

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
