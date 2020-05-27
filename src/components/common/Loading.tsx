import React from 'react';
import { Platform, View, ActivityIndicator } from 'react-native';
import Colors from '~/theming/colors';

const Loading = () => (
  <View style={{ marginVertical: Platform.OS === 'ios' ? 10 : 5 }}>
    <ActivityIndicator
      color={Colors.lightgray}
      style={{ paddingVertical: Platform.OS === 'ios' ? 5 : 0 }}
      size={Platform.OS === 'ios' ? 'large' : 30}
    />
  </View>
);
export default Loading;
