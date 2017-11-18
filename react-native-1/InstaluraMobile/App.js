/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    FlatList,
    Text,
    View, Dimensions, Image
} from 'react-native';

// const width = Dimensions.get('screen').width;
import Post from './src/components/Post'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            fotos: []
        }
    }

    componentDidMount() {
        fetch('http://10.0.2.2:8080/api/public/fotos/rafael')
            .then(response => response.json())
            .then(responseJson => this.setState({fotos: responseJson}))
    }

    render() {
        return (
            <FlatList style={styles.container}
                      data={this.state.fotos}
                      keyExtractor={item => item.id}
                      renderItem={({item}) =>
                          <Post foto={item}/>
                      }
            />
            /*<ScrollView style={{marginTop: 20}}>
                {fotos.map(foto =>
                    <View key={foto.id}>
                      <Text>{foto.usuario}</Text>
                      <Image source={require('./resources/img/logo.png')} style={{width:width, height:width}} />
                    </View>
                )}
            </ScrollView>*/
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});
