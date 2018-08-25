import NegociacaoController from './controllers/negociacao-controller';
import {} from './polyfill/fetch';


let negociacaoController = new NegociacaoController();

export function getInstance() {
    return negociacaoController;
}