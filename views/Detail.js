import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Detail extends React.Component {
    static navigationOptions = { title: 'hello' }
  render() {
    return (
      <View style={styles.container}>
       <Text>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
