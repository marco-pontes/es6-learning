class ListaNegociacoes {
    constructor(atualizaView) {
        this._negociacoes = [];
        this.atualizaView = atualizaView;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this.atualizaView(this);
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    esvazia () {
        this._negociacoes = [];
        this.atualizaView(this);
    }
}