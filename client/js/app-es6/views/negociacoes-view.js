import View from './view';
import DateHelper from '../helpers/date-helper'

class NegociacoesView extends View {

    template(modelo) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr onclick="negociacaoController.ordena(event)">
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
        
                <tbody>
                ${modelo.negociacoes.map(n =>`
                        <tr>
                            <td>${DateHelper.dataParaTexto(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>${n.valor}</td>
                            <td>${n.volume}</td>
                        </tr>
                        `).join('')
                }
                </tbody>
        
                <tfoot>
                    <td colspan="3"></td>
                    <td>
                        ${modelo.volumeTotal}
                    </td>
                </tfoot>
            </table>`;
    }
}

export default NegociacoesView;