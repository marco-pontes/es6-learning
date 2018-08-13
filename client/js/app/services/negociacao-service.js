class NegociacaoService {

    constructor () {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/semana').then(json => {
                let negociacoes = json.map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor));
                resolve(negociacoes);
            }).catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana');
            });
        });
    }

    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/anterior').then(json => {
                let negociacoes = json.map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor));
                resolve(negociacoes);
            }).catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana anterior');
            });
        });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/retrasada').then(json => {
                let negociacoes = json.map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor));
                resolve(negociacoes);
            }).catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana retrasada');
            });
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