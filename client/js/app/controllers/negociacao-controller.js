class NegociacaoController {

    constructor () {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoes-view')),
            'adiciona', 'esvazia'
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
        service.salva(dados, (erro) => {
            if(erro) {
                this._mensagem.texto = erro;
            } else {
                let negociacao = this.criaNegociacao(dados);
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociação adicionada com sucesso!';
                this.limpaCampos();
            }
        });

    }

    getDados() {
        return {
            data: this._inputData.value,
            quantidade: this._inputQuantidade.value,
            valor: this._inputValor.value
        };
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    importaNegociacoes () {
        let service = new NegociacaoService();

        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()]
        ).then(negociacoes => {
            console.log(negociacoes)
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações obtidas com sucesso'
        }).catch(erro => this._mensagem.texto = erro);
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