import NegociacaoController from './controllers/negociacao-controller';
import {} from './polyfill/fetch';


let negociacaoController = new NegociacaoController();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('#apaga').onsubmit = negociacaoController.apaga.bind(negociacaoController);