
// Reducer
// state é o estado anterior que eu havia retornado
export function timelineReducer(state = [], action) {

  // listar
  if (action.type === 'LISTAGEM') {
    return action.fotos;
  }

  // like
  if (action.type === 'LIKE') {

    const liker = action.liker;
    // pega a foto onde ocorreu o like
    const fotoAchada = state.find(foto => foto.id === action.fotoId);
    // determina se foi laikeada
    fotoAchada.likeada = !fotoAchada.likeada;

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

    return state;
  }

  // comentar
  if (action.type === 'COMENTA') {

    const fotoAchada = state.find(foto => foto.id === action.fotoId);
    fotoAchada.comentarios.push(action.novoComentario);

    return state;
  }


  return state;
}