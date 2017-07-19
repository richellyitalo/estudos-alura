
export function headerReducer(state = '', action) {
  
    // listar
    if (action.type === 'NOTIFICA') {
      return action.msg;
    }
    return state;
  }