import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Animated, ScrollView, FlatList } from 'react-native';
const AnimFlatList = Animated.createAnimatedComponent(FlatList)
export default class App extends Component {
  static defaultProps = {
    onMomentumScrollBegin: () => {}, 
    onMomentumScrollEnd: () => {}, 
    onScroll: () => {},
    onScrollEndDrag: () => {}
}
  state = {
    scrollOffset: new Animated.Value(0),
      titleWidth: 0,
  }
  offset = 0

  componentDidMount() {
    this.state.scrollOffset.addListener(({ value }) => (this.offset = value));
  }

  onScroll = e => {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollOffset.setValue(offset);
  };

  render() {
    const { scrollOffset } = this.state;
    const { style, listStyle, onMomentumScrollBegin, onMomentumScrollEnd, onScroll, onScrollEndDrag, ...rest  } = this.props
    const screenWidth = Dimensions.get('window').width;
    return (
      <View 
        style={[{backgroundColor: 'gray',alignItems: 'center',justifyContent: 'center',height: '100%',width: '100%'}, style ]}>
        {/* <Animated.View
          style={[
            styles.header,
            {
              paddingHorizontal: screenWidth * 0.05,
              width: screenWidth,
              height: scrollOffset.interpolate({
                inputRange: [0, 200],
                outputRange: [120, 64],
                extrapolate: 'clamp',
              }),
            },
          ]}>
          <Animated.Text
            onLayout={e => {
              if (this.offset === 0 && this.state.titleWidth === 0) {
                const titleWidth = e.nativeEvent.layout.width;
                this.setState({ titleWidth });
              }
            }}
            style={{
              fontWeight: 'bold',
              // fontSize: scrollOffset.interpolate({
              //   inputRange: [0, 200],
              //   outputRange: [26, 20],
              //   extrapolate: 'clamp',
              // }),
              fontSize: 20
            }}>
            Header Title Here
          </Animated.Text>
          <Animated.View
            style={{
              width: scrollOffset.interpolate({
                inputRange: [0, 200],
                outputRange: [screenWidth * 0.9 - this.state.titleWidth, 0],
                extrapolate: 'clamp',
              }),
            }}
          />
        </Animated.View> */}
        <AnimFlatList
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ width: '100%' }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scroll } } }], 
          { 
              listener: e => {
                  this.onScroll(e)
                  onScroll(e)
              },
              useNativeDriver: true
          } 
      )}
        scrollEventThrottle={1}
          {...rest}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'whitesmoke',
    borderBottomWidth: 1,
    borderColor: 'gainsboro',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  listItem: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
