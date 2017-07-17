import Pubsub from 'pubsub-js';

export default class TimelineStore {

    constructor(fotos) {
        this.fotos = fotos;
    }
    
    like(fotoId) {
        
        // utlizando os '`' pode ser concatenado interamente valores com ${this.valor}
        fetch(
            `http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
            // como não estou passando nenhum valor 
            // como o text no body
            // não é encessário criar o header, basta determinar o 'method'
            { method: 'POST' })

            // resposta do server
            // 1ª etapa - tratamento do valor
            .then(response => {
                if (response.ok) {
                    // será usado o valor retornado
                    // o liker {login: 'nome'}
                    return response.json();
                } else {
                    throw new Error('Não foi possível dar like');
                }
            })
            .then(liker => {                
                // pega a foto onde ocorreu o like
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
                // determina se foi laikeada
                fotoAchada.likeada = ! fotoAchada.likeada;
                
                // pega o liker na foto
                const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);

                // se não tem o like, então adiciona o like nessa foto dentro da lista de likers
                if (possivelLiker === undefined) {
                    fotoAchada.likers.push(liker);
                
                } else {
                    // caso já tenha, faz uma lista de todos os likers, com exceção do like em questão 'possivelLiker'
                    const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
                    fotoAchada.likers = novosLikers;
                }

                Pubsub.publish('timeline', this.fotos);
            })
            .catch(error => {
                console.error(error);
            });
    }

    comentar(fotoId, textoComentario) {
        
        // uso dos parametros, pois estamos trabalhando com valores internos
        // como 'body'
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ texto: textoComentario }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        fetch(`http://localhost:8080/api/fotos/${fotoId}/comment/?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Não foi possível comentar');
                }
            })
            .then(novoComentario => {
                
                // processo semelhante para comentário
                // pega a Foto, adiciona a Lista de comentários desta Foto
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
                fotoAchada.comentarios.push(novoComentario);

                // e redefine seu state
                Pubsub.publish('timeline', this.fotos);
            })
            .catch(error => {
                console.error(error);
            });
    }

    lista(urlPerfil) {
        
        fetch(urlPerfil)
        .then(response => response.json())
        .then(fotos => {
            this.fotos = fotos;
            Pubsub.publish('timeline', this.fotos);
        });
    }

    subscribe(callback) {
        Pubsub.subscribe('timeline', (topico, fotos) => {
            callback(fotos);
        });
    }
}