import React from 'react';
import { View, FlatList, Animated } from 'react-native';
const AnimFlatList = Animated.createAnimatedComponent(FlatList)

export default class List2 extends React.Component {
    static defaultProps = {
        onMomentumScrollBegin: () => {}, 
        onMomentumScrollEnd: () => {}, 
        onScroll: () => {},
        onScrollEndDrag: () => {}
    }
    state = {
        scroll: new Animated.Value(0),
        height: new Animated.Value(100),
    }
    componentDidMount() {
        this.scrollListener = this.state.scroll.addListener(({value})=> {})
    }
    componentWillUnmount() {
        this.state.scroll.removeAllListeners()
    }
    render() {
        console.log('render')
        const { style, listStyle, onMomentumScrollBegin, onMomentumScrollEnd, onScroll, onScrollEndDrag, ...rest  } = this.props
        const translateY = this.state.height.interpolate({
            inputRange: [0,100, 9999],
            outputRange: [0, 100, 9999],
            extrapolate: 'clamp'
        })
        return (
            <View
                style={[{backgroundColor: 'gray',alignItems: 'center', justifyContent: 'center', height: '100%',width: '100%'}, style ]}>
                <AnimFlatList 
                    style={[{ width: '100%', flex: 1, backgroundColor: 'white', transform: [ {translateY} ] }, listStyle ]}
                    ref="list"
                    scrollEventThrottle={1}
                    onMomentumScrollBegin={ () => {
                        this.momentum = true
                        onMomentumScrollBegin()
                    }}
                    onMomentumScrollEnd={ () => {
                        this.momentum = false
                        onMomentumScrollEnd()
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scroll } } }], 
                        { 
                            listener: e => {
                                this.updateHeight(e)
                                onScroll(e)
                            },
                            useNativeDriver: true
                        } 
                    )}
                    onScrollEndDrag={() => {
                        this.restoreHeight()
                        onScrollEndDrag()
                    }}
                    {...rest}
                />
            </View>
        );
    }

    momentum = false
    animating = false
    collapsed = false
    updateHeight = ({ nativeEvent: { contentOffset: { y } } }) => {
        if (this.momentum) {
            if(y < 0 && !this.animating && this.collapsed) {
                this.animating = true
                Animated.timing(this.state.height, {
                    toValue: 100,
                    duration: 100
                })
                .start( () => { 
                    this.refs.list.getNode().scrollToIndex({ index: 0, animated: false, viewOffset: 0 })
                    this.animating = false
                    this.collapsed = false
                })
            }
            if(y > 0 && !this.animating && !this.collapsed) {
                this.animating = true
                Animated.timing(this.state.height, {
                    toValue: 0,
                    duration: 100
                })
                .start( ()=> {
                    this.animating = false
                    this.collapsed = true
                })
            }
        }
        else {
            if(y < 0 && this.state.height._value >= 0) {
                if(this.state.height._value/50 == Infinity) console.log('error incoming')
                const divisor = this.state.height._value/50 ? this.state.height._value/50 : 0.1
                this.state.height.setValue(this.state.height._value - y/(divisor))
                // this.state.height.setValue(this.state.height._value - y)
                this.refs.list.getNode().scrollToIndex({ index: 0, animated: false, viewOffset: 0 })
            }
            if(y > 0 && this.state.height._value > 0) {
                this.state.height.setValue(this.state.height._value - y)
                this.refs.list.getNode().scrollToIndex({ index: 0, animated: false, viewOffset: 0 })
            }

        }   
        if(this.state.height._value <= 0) this.collapsed = true
        if(this.state.height._value > 0) this.collapsed = false
    }
    restoreHeight = () => {
        if((this.state.height._value >= 100 || this.state.height._value > 50) && !this.animating ) {
            this.animating = true
            Animated.timing(this.state.height, {
                toValue: 100,
                duration: 200
            })
            .start( () => { 
                this.animating = false
                this.collapsed = false
            })
        }
        if(this.state.height._value < 50 && this.state.scroll._value <= 0 && !this.animating ) {
            this.animating = true
            Animated.timing(this.state.height, {
                toValue: 0,
                duration: 200
            })
            .start( () => { 
                this.animating = false
                this.collapsed = false
            })
        }
    }
}
