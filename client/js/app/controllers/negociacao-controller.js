class NegociacaoController {

    constructor () {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoes-view')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagem-view')),
            'texto'
        );
    }

    adiciona(event) {
        event.preventDefault();
        let service = new NegociacaoService();
        let dados = this.getDados();
        service.salva(dados)
            .then(resposta => {
                let negociacao = this.criaNegociacao(dados);
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = `Negociação adicionada com sucesso! ${resposta}`;
                this.limpaCampos();
            })
            .catch((erro) => {
                this._mensagem.texto = erro;
            });
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    importaNegociacoes () {
        let service = new NegociacaoService();

        service.obterNegociacoes()
            .then(negociacoes => {
            console.log(negociacoes)
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações obtidas com sucesso'
        }).catch(erro => this._mensagem.texto = erro);
    }

    getDados() {
        return {
            data: this._inputData.value,
            quantidade: this._inputQuantidade.value,
            valor: this._inputValor.value
        };
    }

    criaNegociacao(dados){
        return new Negociacao(
            DateHelper.textoParaData(dados.data),
            dados.quantidade,
            dados.valor
        );
    }

    limpaCampos() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }


}