import React from 'react';
import PropTypes from 'prop-types';
import {Platform, TouchableOpacity, TouchableNativeFeedback, Alert} from 'react-native';
import {LongPressGestureHandler, State} from "react-native-gesture-handler";

const propTypes = {
    style: PropTypes.shape({}),
    onPress: PropTypes.func,
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    onPress: () => {
    },
};

const TouchableWithPopup = ({
                                children,
                                onPress,
                                style
                            }: {
    children: React.ReactNode;
    onPress: () => void;
    style: any
}) => {


    return (Platform.OS === 'android' && Platform.Version > 20
            ? (
                <TouchableNativeFeedback
                    onPress={() => setTimeout(onPress, 0)}
                >
                    {children}
                </TouchableNativeFeedback>
            )
            : (
            <LongPressGestureHandler
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.ACTIVE) {
                        Alert.alert("I'm being pressed for so long");
                    }
                }}
                minDurationMs={500}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={style}
                    onPress={() => setTimeout(onPress, 0)}>
                    {children}
                </TouchableOpacity>
            </LongPressGestureHandler>
            )
    );
}

TouchableWithPopup.propTypes = propTypes;
TouchableWithPopup.defaultProps = defaultProps;

export default TouchableWithPopup;
