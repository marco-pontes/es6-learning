class NegociacoesView {
    constructor(elemento) {
        this._elemento = elemento;
    }

    template(modelo) {
    return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
                </tr>
            </thead>
    
            <tbody>
            ${modelo.negociacoes.map(n => {
                return `
                        <tr>
                            <td>${DateHelper.dataParaTexto(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>${n.valor}</td>
                            <td>${n.volume}</td>
                        </tr>`;
            }).join('')}
            </tbody>
    
            <tfoot>
            </tfoot>
        </table>`
    }

    update(modelo) {
        this._elemento.innerHTML = this.template(modelo);
    }

}