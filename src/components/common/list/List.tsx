import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, TouchableOpacity, View} from 'react-native';
import Text from '~/components/common/Text';
import Colors from '~/theming/colors';
import {styles} from './styles';

const propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({}),
    ),
    horizontal: PropTypes.bool.isRequired,
    subtitle: PropTypes.string,
    onViewAllPress: PropTypes.func,
    title: PropTypes.string.isRequired,
    renderItem: PropTypes.func.isRequired,
    keyExtractor: PropTypes.func.isRequired,
};

const defaultProps = {
    data: [],
    subtitle: null,
    horizontal: false,
    onViewAllPress: null,
};

const List = ({
                  data,
                  horizontal,
                  title,
                  subtitle,
                  renderItem,
                  keyExtractor,
                  onViewAllPress,
              }: { data: any; horizontal: boolean; title: string; subtitle: string; renderItem: any; keyExtractor: any; onViewAllPress: () => void }) => {
    const {textContainer, containerContentStyle} = styles;

    return (
        <View style={{marginBottom: 20, marginVertical: 20, paddingVertical: 10}}>
            <View style={textContainer}>
                <View style={{flex: 1}}>
                    <Text
                        large
                        style={{color: Colors.white}}
                    >
                        {title}
                    </Text>
                    {subtitle && (
                        <Text small style={{color: Colors.white}}>{subtitle}</Text>
                    )}
                </View>
                {onViewAllPress && (
                    <View>
                        <TouchableOpacity
                            onPress={onViewAllPress}
                            style={{paddingVertical: 5}}>
                            <Text small style={{color: Colors.white}}>MORE</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <FlatList
                data={data}
                horizontal={horizontal}
                renderItem={renderItem}
                style={{marginTop: 10}}
                keyExtractor={keyExtractor}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={containerContentStyle}
                ItemSeparatorComponent={() => <View style={{marginEnd: 10}}/>}
            />
        </View>
    );
};

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
