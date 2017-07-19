import { listagem, comentar, like, notifica } from '../actions/actionCreator';

export default class TimelineStore {
    
    static like(fotoId) {

        return dispatch => {
            
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
                    dispatch(like(fotoId, liker));
                    return liker;
                })
                .catch(error => {
                    console.error(error);
                });
            }
        }

    static comentar(fotoId, textoComentario) {

        return dispatch => {

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
                dispatch(comentar(fotoId, novoComentario));
                return novoComentario;  
            })
            .catch(error => {
                console.error(error);
            });
        }
    }

    static lista(urlPerfil) {
        
        return dispatch => {

            fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
                //this.fotos = fotos; 
                dispatch(listagem(fotos));
                return fotos;
            });
        }
    }

    static pesquisa(login) {
        return dispatch => {

            fetch(`http://localhost:8080/api/public/fotos/${login}`)
            .then(response => response.json())
            .then(fotos => {
                if (fotos.length === 0 ) {
                    dispatch(notifica('usuário não encontrado'));
                } else {
                    dispatch(notifica('usuário encontrado'));
                }
                // envia isto aos subscribes
                // irá alterar apenas o componente da timeline
                dispatch(listagem(fotos));
                return fotos;
            });
        }
    }
}