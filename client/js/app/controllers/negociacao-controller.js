class NegociacaoController {

    constructor () {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();
        console.log(typeof this._inputData.value);
        console.log(this._inputData.value);
        let dateHelper = new DateHelper();
        let negociacao = new Negociacao(
            dateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
        console.log(negociacao);
        console.log(dateHelper.dataParaTexto(negociacao.data));
        this.limpaCampos();

    }

    limpaCampos() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }

}