class MensagemView extends View {

    constructor(elemento) {
       super(elemento);
    }

    template(modelo) {
        return modelo.texto ? `<p class="alert alert-success">${modelo.texto}</p>` : '<p></p>';
    }


}