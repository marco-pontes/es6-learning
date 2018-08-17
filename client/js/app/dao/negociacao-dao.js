class NegociacaoDao {

    constructor (connection) {
        this.connection = connection;
        this.store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this.connection.transaction([this.store], 'readwrite')
                .objectStore(this.store)
                .add(negociacao);

            request.onsuccess = (e) => {
                resolve();
                console.log('Negociação incluída com sucesso');
            }
            request.onerror = (e) => {
                console.log(e.target.error);
                reject('Não foi possível incluir a negociação');
            }
        });
    }


}