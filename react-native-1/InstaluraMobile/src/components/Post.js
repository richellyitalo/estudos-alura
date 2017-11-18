import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            foto: {...props.foto, likers: [{}]},
            inputComment: ''
        }
    }

    getLikeIcon(liked) {
        return liked
            ? require('../../resources/img/s2-checked.png')
            : require('../../resources/img/s2.png')
    }

    getLikersCount(likers) {
        if (likers.length === 0)
            return;
        return(
            <Text style={styles.likes}>{likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}</Text>
        )
    }

    getComments(foto) {
        if (foto.comentario === '')
            return;
        return (
            <View style={styles.comment}>
                <Text style={styles.commentUser}>{foto.loginUsuario}</Text>
                <Text style={styles.commentContent}>{foto.comentario}</Text>
            </View>
        )
    }

    like() {
        const { foto } = this.state

        let novaLista = []
        if (!foto.likeada) {
            novaLista = [
                ...foto.likers,
                {login: 'meuUsuario'}
            ]
            // ou javascript puro
            // novaLista = foto.likers.concat({login: 'meuUsuario'})
        } else {
            novaLista = foto.likers.filter(liker => {
                return liker.login !== 'meuUsuario'
            })
        }
        const fotoAtualizada = {
            ...this.state.foto,
            likeada: !this.state.foto.likeada,
            likers: novaLista
        }

        this.setState({foto: fotoAtualizada})
    }

    addComment() {
        const novaLista = [
            ...this.state.foto.comentarios,
            {
                id: this.state.inputComment,
                login: 'meuUsuario',
                texto: this.state.inputComment
            }
        ];

        const fotoAtualizada = {
            ...this.state.foto,
            comentarios: novaLista
        }

        this.setState({foto: fotoAtualizada});
        this.inputComment.clear();
    }

    render() {
        const { foto } = this.state;

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

                    {this.getLikersCount(foto.likers)}

                    {this.getComments(foto)}

                    {foto.comentarios.map(comentario =>
                        <View style={styles.comment} key={comentario.id}>
                            <Text style={styles.commentUser}>{comentario.login}</Text>
                            <Text style={styles.commentContent}>{comentario.texto}</Text>
                        </View>
                    )}

                    <View style={styles.commentForm}>
                        <TextInput style={styles.commentInput}
                            ref={input => this.inputComment = input}
                            onChangeText={text => this.setState({inputComment: text})}
                            placeholder="Adicione um comentário"
                        />
                        <TouchableOpacity
                            onPress={this.addComment.bind(this)}>
                            <Image style={styles.commentSubmit}
                                source={require('../../resources/img/send.png')} />
                        </TouchableOpacity>
                    </View>
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
        marginBottom: 10,
        width: 40,
        height: 40
    },
    likes: {
        fontWeight: 'bold'
    },
    comment: {
        flexDirection: 'row'
    },
    commentUser: {
        fontWeight: 'bold',
        marginRight: 10
    },
    commentContent: {
        color: '#777777'
    },
    commentForm: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10
    },
    commentInput: {
        height: 40,
        flex: 1,
        borderWidth: 0
    },
    commentSubmit: {
        width: 30,
        height: 30
    }


});