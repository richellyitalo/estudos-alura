import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Post extends Component {

    constructor(props) {
        super(props)
        this.state = { foto: props.foto }
    }

    getLikeIcon(liked) {
        return liked
            ? require('../../resources/img/s2-checked.png')
            : require('../../resources/img/s2.png')
    }

    like() {
        const fotoAtualizada = {
            ...this.state.foto,
            likeada: !this.state.foto.likeada
        }

        this.setState({foto: fotoAtualizada})
    }

    render() {
        const { foto } = this.state

        return(
            <View>
                <View style={styles.header}>
                    {/*<Image source={require('../../resources/img/logo.png')} style={styles.imageProfile} />*/}
                    <Image source={{uri: foto.urlPerfil}} style={styles.imageProfile} />
                    <Text>{foto.loginUsuario}</Text>
                </View>
                <Image source={{uri: foto.urlFoto}} style={styles.imagePost} />
                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.like.bind(this)}>
                        <Image source={this.getLikeIcon(foto.likeada)} style={styles.buttonLike} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    footer: {
        margin: 10
    },
    imageProfile: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    imagePost: {
        width:width,
        height: width
    },
    buttonLike: {
        width: 40,
        height: 40
    }
});