import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Button } from 'react-native';
import { List1, List2, List3, Nav } from '../components'

export default class Main extends React.Component {
    static navigationOptions = ({navigation}) => {
        console.log(navigation.getParam('scroll', null))
        const scroll = navigation.getParam('scroll', 0)
        return {
            title: 'Title Title Tile Tile Tile Tile',
            headerLeft: <Button title="Cancel" onPress={()=>{}} />,
            headerRight: <Button title="Continue" onPress={()=>{}} />,
            header: props => { this.navProps = props; return null }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        console.log('render')
        return (
            <View
                style={{
                    flex: 1, 
                    backgroundColor: 'white',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                }}>
                <List1
                    data={[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]} 
                    navProps={this.navProps}
                    renderItem={this.renderCell}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, i)=>String(i)}
                    onRefresh={()=>console.log('refresh')}
                    onScroll={this.update}
                    refreshing={false}
                />
            </View>
        );
    }

    navProps = {}
    update = ({ nativeEvent: { contentOffset: { y } } }) => {
        this.props.navigation.setParams({scroll: y})
    }
    renderCell = ({index}) => <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('Detail')}>
        <View style={{width: '100%', height: 50}}>
            <Text>{index}</Text>
        </View>
    </TouchableWithoutFeedback>

    renderSeparator = () => <View style={{width: '100%', height: 0.5, backgroundColor: 'lightgray'}} />
}