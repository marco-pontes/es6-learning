class DateHelper {

    dataParaTexto(data) {
        return data.getDate()
            + '/' +  (data.getMonth() + 1)
            + '/' +  data.getFullYear();
    }

    textoParaData(texto) {
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