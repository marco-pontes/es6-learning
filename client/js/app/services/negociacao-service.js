class NegociacaoService {

    constructor () {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {
        return this._http.get('negociacoes/semana').then(json => {
                let negociacoes = json.map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor));
                return negociacoes;
            }).catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });
    }

    obterNegociacoesDaSemanaAnterior() {
        return this._http.get('negociacoes/anterior').then(json => {
                let negociacoes = json.map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor));
                return negociacoes;
            }).catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior');
            });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return this._http.get('negociacoes/retrasada').then(json => {
                let negociacoes = json.map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor));
                return negociacoes;
            }).catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada');
            });
    }

    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()]
        ).then(negociacoes => {
            let arrayAchatado = negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), []);
            return arrayAchatado;
        }).catch(erro => { throw new Error(erro); });
    }

    salva(objeto) {
        return this._http.post('/negociacoes', objeto).then((resposta) => {
            return resposta;
        }).catch((erro) => {
            console.log(erro);
            throw new Error('Não foi possível salvar a negociação');
        });
    }

    cadastra(objeto) {
        return ConnectionFactory.getConnection().then(connection =>
            new NegociacaoDao(connection))
            .then(dao => dao.adiciona(objeto))
            .then(() => 'Negociação adicionada com sucesso!')
            .catch(() => {
                console.log(erro);
                throw new Error('Não foi possível salvar a negociação')
            });
    }

    lista() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch((erro) => {
                console.log(erro);
                throw new Error('Erro ao listar negociações');
            });
    }

    apagaTodos() {
       return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso!')
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao apagar negociações');
            });
    }

    importa(listaAtual) {
        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(item =>
                        JSON.stringify(item) == JSON.stringify(negociacao)
                    )
                )
            )
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao importar negociações');
            });
    }
}