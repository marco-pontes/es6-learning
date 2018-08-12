class NegociacaoService {

    obterNegociacoesDaSemana(cb) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    console.log(`Obtendo as negociações do servidor.`);
                    let negociacoes = JSON.parse(xhr.responseText)
                        .map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor));
                    cb(null, negociacoes);
                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações', null);
                }
            }
        };
        xhr.send();
    }
}