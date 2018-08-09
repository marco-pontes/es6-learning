class MensagemView {
    constructor(elemento) {
        this._elemento = elemento;
    }

    template(modelo) {
    return modelo.texto ? `<p class="alert alert-info">${modelo.texto}</p>` : '<p></p>';
    }

    update(modelo) {
        this._elemento.innerHTML = this.template(modelo);
    }

}