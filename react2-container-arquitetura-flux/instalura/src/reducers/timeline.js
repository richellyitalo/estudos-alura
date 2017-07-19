import { List } from 'immutable';

function trocaFoto(lista, fotoId, callbackNovaPropriedade) {

  const fotoEstadoAntigo = lista.find(foto => foto.id === fotoId);
  const novasPropriedades = callbackNovaPropriedade(fotoEstadoAntigo);

  const novoObjeto = Object.assign({}, fotoEstadoAntigo, novasPropriedades);

  const indiceDaLista = lista.findIndex( foto => foto.id === fotoId );
  const novaLista = lista.set(indiceDaLista, novoObjeto);
  return novaLista;
}

// Reducer
// state é o estado anterior que eu havia retornado
export function timelineReducer(state = new List(), action) {

  // listar
  if (action.type === 'LISTAGEM') {
    return new List(action.fotos);
  }

  // like
  if (action.type === 'LIKE') {

    return trocaFoto(state, action.fotoId, fotoEstadoAntigo => {
      const likeada = !fotoEstadoAntigo.likeada;
      
      const liker = action.liker;
      const possivelLiker = fotoEstadoAntigo.likers.find(likerAtual => likerAtual.login === liker.login);
  
      let novosLikers;
      if(possivelLiker === undefined){
        novosLikers = fotoEstadoAntigo.likers.concat(liker);
      } else {
        novosLikers = fotoEstadoAntigo.likers.filter(likerAtual => likerAtual.login !== liker.login);            
      }
      return {likeada, likers: novosLikers}
    });
  }

  // comentar
  if (action.type === 'COMENTA') {

    return trocaFoto(state, action.fotoId, fotoEstadoAntigo => {
      const novosComentarios = fotoEstadoAntigo.comentarios.concat(action.novoComentario);
      return {comentarios: novosComentarios};
    });
  }

  return state;
}