import React from 'react';
import { View, FlatList, Animated } from 'react-native';
import { Nav } from '../components'
const AnimFlatList = Animated.createAnimatedComponent(FlatList)

export default class List1 extends React.Component {
    static defaultProps = {
        onMomentumScrollBegin: () => {}, 
        onMomentumScrollEnd: () => {}, 
        onScroll: () => {}
    }

    state = {
        scroll: new Animated.Value(0),
        height: new Animated.Value(100),
    }

    render() {
        const { style, listStyle, navProps ,onMomentumScrollBegin, onMomentumScrollEnd, onScroll, ...rest  } = this.props
        const marginTop = this.state.height.interpolate({
            inputRange: [0,100],
            outputRange: [0, 100],
            extrapolate: 'clamp'
        })
        return (
            <View
                style={[{backgroundColor: 'gray',alignItems: 'center',justifyContent: 'center',height: '100%',width: '100%'}, style ]}>
                <Nav {...navProps} />
                <AnimFlatList 
                    style={[{width: '100%', flex: 1, backgroundColor: 'white', marginTop}, listStyle]}
                    ref="list"
                    scrollEventThrottle={1}
                    onMomentumScrollBegin={ () => {
                        this.duration = 100
                        onMomentumScrollBegin()
                    }}
                    onMomentumScrollEnd={ () => {
                        this.duration = 200
                        onMomentumScrollEnd()
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scroll } } }], 
                        { 
                            listener: e => {
                                this.updateHeight(e)
                                onScroll(e)
                            }
                        } 
                    )}
                    {...rest}
                />
            </View>
        );
    }

    collapsed = false
    animating = false
    duration = 200
    updateHeight = ({ nativeEvent: { contentOffset: { y } } }) => {
        if(y < 0) {
            if(!this.animating) {
                this.animating = true
                
                Animated.timing(this.state.height, {
                    toValue: 100,
                    duration: this.duration
                })
                .start( () => {
                    this.animating = false
                    this.collapsed = false
                })
            }
        }
        if(y > 0) {
            if(!this.animating) {
                this.animating = true
                
                Animated.timing(this.state.height, {
                    toValue: 0,
                    duration: this.duration
                })
                .start( ()=> {
                    this.animating = false
                    if (!this.collapsed) {   
                        this.refs.list.getNode().scrollToIndex({ index: 0, animated: false, viewOffset: 0 })
                        this.collapsed = true
                    }
                })
            }
        }
    }
}
