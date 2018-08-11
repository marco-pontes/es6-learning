class ListaNegociacoes {
    constructor(contexto, atualizaView) {
        this._negociacoes = [];
        this._contexto = contexto;
        this.atualizaView = atualizaView;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        //this.atualizaView(this);
        Reflect.apply(this.atualizaView, this._contexto, [this])
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    esvazia () {
        this._negociacoes = [];
        //this.atualizaView(this);
        Reflect.apply(this.atualizaView, this._contexto, [this])
    }
}