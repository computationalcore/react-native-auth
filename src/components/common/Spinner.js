import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Spinner = (props) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={props.size || 'large'} />
  </View>
);


const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
export { Spinner };
