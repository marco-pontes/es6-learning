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

    salva(objeto, cb) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/negociacoes", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    cb(null);
                } else {
                    cb(`Não foi possível salvar a negociação: ${xhr.responseText}`);
                }
            }
        }
        xhr.send(JSON.stringify(objeto));
    }
}