import PubSub from 'pubsub-js';

export default class TratadorDeErros {
    listar (responseError) {
        for ( let i = 0; i < responseError.errors.length; i++) {
            let erro = responseError.errors[i];
            PubSub.publish('erro-formulario', erro)
        }
    }
}