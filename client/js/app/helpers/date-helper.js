class DateHelper {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    static dataParaTexto(data) {
        return data.getDate()
            + '/' +  (data.getMonth() + 1)
            + '/' +  data.getFullYear();
    }

    static textoParaData(texto) {
        return new Date(...texto.split('-')
            .map((item, index) => item - 1)
            .map((item, index) => item + 1)
            .map((item, index) => {
                if(index == 1) {
                    return item - 1;
                }
                return item;
            }));
    }

}