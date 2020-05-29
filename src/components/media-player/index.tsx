import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from "react-native";
import Colors from "~/theming/colors";
import styles from "~/components/media-player/styles";
import Slider from '@react-native-community/slider';
import Text from '~/components/common/Text';


export default function MediaPlayer({
                                        title,
                                        currentPosition,
                                        duration,
                                        paused,
                                        hidePlayButton,
                                        onBack,
                                        onChangePosition,
                                        onPause,
                                    }: {
    title: string;
    currentPosition: number,
    duration: number;
    paused: boolean;
    hidePlayButton: boolean;
    onBack: () => void;
    onChangePosition: (position: number) => void;
    onPause: (flag: boolean) => void;
}) {
    const [hidePlayer, setHidePlayer] = useState(false);
    const [time, setTime] = useState('');

    useEffect(() => {
        const result = new Date(currentPosition * 1000).toISOString().substr(11, 8);
        setTime(result);
    }, [currentPosition]);

    return (
        <TouchableOpacity activeOpacity={0.5} style={{position: 'absolute', bottom: 100, right: 10, left: 10}}
                          onPress={() => setHidePlayer(!hidePlayer)}>
            {!hidePlayer && (
                <View style={{opacity: 1}}>
                    <>
                        {!hidePlayButton && (
                            <TouchableOpacity style={{opacity: 1, alignSelf: 'center'}}
                                              onPress={() => onPause(!paused)}
                            >
                                <Icon
                                    name={paused ? 'play' : 'pause'}
                                    size={60}
                                    color={Colors.white}
                                />
                            </TouchableOpacity>
                        )}
                    </>
                    <View style={styles.Bar}>
                        <Slider
                            step={1}
                            value={currentPosition || 0}
                            minimumValue={0}
                            maximumValue={duration}
                            onSlidingStart={() => onPause(true)}
                            onSlidingComplete={value => onChangePosition(value)}
                            thumbTintColor={Colors.white}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                        />
                        <Text small style={{color: Colors.white}}>{time}</Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
}

MediaPlayer.propTypes = {
    title: PropTypes.string,
    currentPosition: PropTypes.number,
    duration: PropTypes.number,
    paused: PropTypes.bool,
    hidePlayButton: PropTypes.bool,
    onBack: PropTypes.func,
    onChangePosition: PropTypes.func,
    onPause: PropTypes.func,
};
