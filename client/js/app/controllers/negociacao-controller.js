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
        this.init();
    }

    init() {
        setInterval(() => {
            this.importaNegociacoes();
        }, 3000)

        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => {
                negociacoes.forEach(negociacao => {
                    this._listaNegociacoes.adiciona(negociacao);
                });
            })
            .catch(erro => {
                this._mensagem.texto = erro;
            });
    }

    adiciona(event) {
        event.preventDefault();
        let dados = this.getDados();
        let negociacao = this.criaNegociacao(dados);
        new NegociacaoService()
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this.limpaCampos();
            })
            .catch(erro => this._mensagem.texto = erro);

        /*
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
         */
    }

    apaga() {
        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = mensagem;

            })
            .catch(erro => {
                this._mensagem.texto = erro;
            });
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
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !this._listaNegociacoes.negociacoes.some(item =>
                        JSON.stringify(item) != JSON.stringify(negociacao)
                    )
                )
            )
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
            parseInt(dados.quantidade),
            parseFloat(dados.valor)
        );
    }

    limpaCampos() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }


}