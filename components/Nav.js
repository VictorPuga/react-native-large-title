import React from 'react'
import { View, Animated, Platform, Text } from 'react-native'
import { BlurView, LinearGradient } from 'expo'
import { Header } from 'react-navigation'

export default class Main extends React.Component {
    state = {
        scroll: new Animated.Value(this.props.scroll),
        height: new Animated.Value(0)
    }

    shouldComponentUpdate(nextState, nextProps) {

        return false
    }

    componentWillReceiveProps(nextProps, nextState) { 
        // console.log(nextProps.scroll)
        this.state.scroll.setValue(nextProps.scroll)
    }

    render() {
        console.log('render')
        return (
            <BlurView 
                style={{ 
                    // position: 'absolute', 
                    // top: 0, 
                    // left: 0, 
                    // right: 0, 
                    // zIndex: 1, 
                    height: Platform.OS === 'ios' ? 66 : 56,
                    width: '100%', 
                }} 
                intensity={100} >
            <LinearGradient
                colors={["#FFffFF5A", "#FFffFF32"]} 
                style={{ height: 55 + (Platform.OS === "ios" ? 22 : 0), }}>
                {/* <Text>title</Text> */}
                <Header {...this.props} />
            </LinearGradient>
        </BlurView>
    );
  }
}

// import React from 'react'
// import { View, Animated, Platform, Text, StyleSheet, Dimensions } from 'react-native'
// import { BlurView, LinearGradient } from 'expo'

// export default class Main extends React.Component {
//     state = {
//         scroll: new Animated.Value(this.props.scroll),
//         height: new Animated.Value(0)
//     }

//     shouldComponentUpdate(nextState, nextProps) {
//         return false
//     }

//     componentWillReceiveProps(nextProps, nextState) { 
//         // console.log(nextProps.scroll)
//         this.state.scroll.setValue(nextProps.scroll)
//     }

//     render() {
//         const screenWidth = Dimensions.get('window').width;
//         const { scroll } = this.state
//         console.log('render')
//         return (
//             <BlurView 
//                 style={{ 
//                     // position: 'absolute', 
//                     // top: 0, 
//                     // left: 0, 
//                     // right: 0, 
//                     // zIndex: 1, 
//                     height: Platform.OS === 'ios' ? 66 : 56,
//                     width: '100%', 
//                 }} 
//                 intensity={100} >
//             <LinearGradient
//                 colors={["#FFffFF5A", "#FFffFF32"]} 
//                 style={{ height: 55 + (Platform.OS === "ios" ? 22 : 0), }}>
//                  <Animated.View
//           style={[
//             styles.header,
//             {
//               paddingHorizontal: screenWidth * 0.05,
//               width: screenWidth,
//               height: scroll.interpolate({
//                 inputRange: [0, 200],
//                 outputRange: [120, 64],
//                 extrapolate: 'clamp',
//               }),
//             },
//           ]}>
//           <Animated.Text
//             onLayout={e => {
//               if (this.offset === 0 && this.state.titleWidth === 0) {
//                 const titleWidth = e.nativeEvent.layout.width;
//                 this.setState({ titleWidth });
//               }
//             }}
//             style={{
//               fontWeight: 'bold',
//               // fontSize: scrollOffset.interpolate({
//               //   inputRange: [0, 200],
//               //   outputRange: [26, 20],
//               //   extrapolate: 'clamp',
//               // }),
//               fontSize: 20
//             }}>
//             Header Title Here
//           </Animated.Text>
//           <Animated.View
//             style={{
//               width: scroll.interpolate({
//                 inputRange: [0, 200],
//                 outputRange: [screenWidth * 0.9 - this.state.titleWidth, 0],
//                 extrapolate: 'clamp',
//               }),
//             }}
//           />
//         </Animated.View>
//             </LinearGradient>
//         </BlurView>
//     );
//   }
// }



// const styles = StyleSheet.create({
//     header: {
//       backgroundColor: 'whitesmoke',
//       borderBottomWidth: 1,
//       borderColor: 'gainsboro',
//       flexDirection: 'row',
//       alignItems: 'flex-end',
//       justifyContent: 'center',
//       paddingBottom: 8,
//     },
//     listItem: {
//       height: 200,
//       width: '100%',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//   });