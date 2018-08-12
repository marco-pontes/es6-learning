class NegociacaoController {

    constructor () {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        let self = this;
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver) {

                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
                    return function () {
                        console.log(`Interceptando function: ${prop}`);
                        let result = Reflect.apply(target[prop], target, arguments);
                        //target[prop](...arguments);
                        self._negociacoesView.update(target);
                        return result;
                    }
                }
                // return target[prop];
                return Reflect.get(target, prop, receiver);
            }
        });
        this._negociacoesView = new NegociacoesView($('#negociacoes-view'));
        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagem-view'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();
        let negociacao = this.criaNegociacao();
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._mensagemView.update(this._mensagem);
        this.limpaCampos();

    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
    }

    criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    limpaCampos() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }


}