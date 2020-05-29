import React from 'react';
import PropTypes, {string} from 'prop-types';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '~/components/common/Icon';
import Text from '~/components/common/Text';
import Colors from '~/theming/colors';


const propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    landScapeMode: PropTypes.bool
};

const defaultProps = {
    onPress: () => {
    },
    title: string,
};

const HeaderBack = ({onPress, title, subtitle, landScapeMode}: { onPress: () => void, title: string, subtitle?: string; landScapeMode?: boolean }) => (
    <View style={[styles.container, {marginLeft: landScapeMode ? 40 : 16}]}>
        <TouchableOpacity onPress={onPress}>
            <Icon
                large
                name="arrow-left"
            />
        </TouchableOpacity>
        {subtitle ?
            <View style={{flexDirection: 'column', marginLeft: 40, marginTop: 15}}>
                <Text style={styles.titleStyle}>{title}</Text>
                <Text style={styles.subtitleStyle}>{subtitle}</Text>
            </View>
            : <Text style={[styles.titleStyle, {marginLeft: 40}]}>{title}</Text>
        }
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 4,
        alignItems: 'center',
        zIndex: 1100,
        position: 'absolute'
    },
    titleStyle: {
        color: Colors.white,
        fontSize: 21,
        fontWeight: 'bold',
    },
    subtitleStyle: {
        color: Colors.white,
        fontSize: 17,
        fontWeight: '400'
    },
});


HeaderBack.propTypes = propTypes;
HeaderBack.defaultProps = defaultProps;

export default HeaderBack;
