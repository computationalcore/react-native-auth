import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

/**
 * @description	Custom Text Input component.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {string} props.label - the label of the text field.
 * @param {string} props.value - the text value.
 * @param {function} props.onChangeText - The callback to be executed when user change text value.
 */
const TextField = (props) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{props.label}</Text>
      <TextInput
        style={inputStyle}
        value={props.value}
        onhangeText={props.onChangeText}
      />
    </View>
  );
};

/**
 * The component StyleSheet.
 */
const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    height: 20,
    width: 100
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    // Center vertically
    alignItems: 'center'
  }
});

export { TextField };
