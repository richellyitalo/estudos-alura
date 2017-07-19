export function listagem(fotos) {
  return {type: 'LISTAGEM', fotos};
}

export function comentar(fotoId, novoComentario) {
  return {type: 'COMENTA', fotoId, novoComentario};
}

export function like(fotoId, liker) {
  return {type: 'LIKE', fotoId, liker};
}

export function notifica(msg) {
  return {type: 'NOTIFICA', msg};
}