import Pubsub from 'pubsub-js';

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
                    dispatch({type: 'LIKE', fotoId, liker});
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
                dispatch({type: 'COMENTA', fotoId, novoComentario})
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
                dispatch({type: 'LISTAGEM', fotos})
                return fotos;
            });
        }
    }

    subscribe(callback) {
        Pubsub.subscribe('timeline', (topico, fotos) => {
            callback(fotos);
        });
    }
}