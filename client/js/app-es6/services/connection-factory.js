
const stores = ['negociacoes'];
const version = 4;
const dbName = 'aluraframe';
let connection = null;
let close = null;

class ConnectionFactory {

    constructor() {
        throw new Error('Não é possível instânciar ConnectionFactory');
    }

    static getConnection() {
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open(dbName, version);
            openRequest.onupgradeneeded = (e) => {
                ConnectionFactory.createStores(e.target.result);
            };
            openRequest.onsuccess = (e) => {
                if (!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function () {
                        throw new Error('A conexão não pode ser fechada manualmente.');
                    }
                }
                resolve(connection);
            };
            openRequest.onerror = (e) => {
                console.log(e.target.error);
                reject(e.target.error.name);
            };
        });
    }

    static createStores(connection) {
        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }
            connection.createObjectStore(store, {autoIncrement: true});
        })
    }

    static closeConnection() {
        if(connection) {
            close();
            connection = null;
        }
    }
}

export default ConnectionFactory;