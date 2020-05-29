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
};

const defaultProps = {
    onPress: () => {
    },
    title: string,
};

const HeaderBack = ({onPress, title, subtitle}: { onPress: () => void, title: string, subtitle?: string }) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
            <Icon
                large
                name="arrow-left"
            />
        </TouchableOpacity>
        {subtitle ?
            <View style={{flexDirection: 'column', marginLeft: 40, marginTop:15}}>
                <Text style={styles.titleStyle}>{title}</Text>
                <Text style={styles.subtitleStyle}>{subtitle}</Text>
            </View>
            : <Text style={styles.titleStyle}>{title}</Text>
        }
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 4,
        marginLeft: 16,
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
        color: Colors.lightGrey,
        fontSize: 17,
        fontWeight: '400'
    },
});


HeaderBack.propTypes = propTypes;
HeaderBack.defaultProps = defaultProps;

export default HeaderBack;
