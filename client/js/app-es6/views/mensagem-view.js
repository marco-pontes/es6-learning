import View from './view';

class MensagemView extends View {

    template(modelo) {
        return modelo.texto ? `<p class="alert alert-success">${modelo.texto}</p>` : '<p></p>';
    }


}

export default MensagemView;