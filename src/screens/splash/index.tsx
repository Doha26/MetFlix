import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from '~/theming/colors';
import Logo from '~/components/common/Logo';
import {NavigationScreenProp} from 'react-navigation';

const SplashScreen = ({navigation}: {navigation: NavigationScreenProp<any>}) => {

  // State initialisation with default values
  const [progress, setProgress] = useState(0);

  // ProressBar default index
  let i = 0;
  const increaseProgressValue = () => {

    // simulate a loading animation before going to the next screen
    setTimeout(function(){
      const st = setInterval(function(){
       i += 0.1;
       setProgress(i);
        if (i >=1){
          clearInterval(st);
          navigation.navigate('home')
        }
      },300) // Increase progressBar value each 300 ms until 1
    },1000); // Start progression after 300 ms
  };

  useEffect(() => {
    increaseProgressValue();
  },[]);

  return (
    <View style={styles.container}>
      <Logo/>
      <Progress.Bar
        borderColor={Colors.lightgray}
        progress={progress} width={230}
        height={4} color={Colors.lightgray}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
  },
  loadingContainer: {
    marginTop: 20,
  },
});

export default SplashScreen;
