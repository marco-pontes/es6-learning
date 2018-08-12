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
        let negociacao = this.criaNegociacao();
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this.limpaCampos();

    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    importaNegociacoes () {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semanax');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    console.log(`Obtendo as negociações do servidor.`);
                    let negociacoes = JSON.parse(xhr.responseText)
                        .map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor))
                        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso.';
                } else {
                    console.log(xhr.responseText);
                    this._mensagem.texto = 'Não foi possível obter as negociações.';
                }
            }
        };
        xhr.send();
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