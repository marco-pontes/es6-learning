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

    salva(objeto, cb) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/negociacoes", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    cb(null);
                } else {
                    cb(`Não foi possível salvar a negociação: ${xhr.responseText}`);
                }
            }
        }
        xhr.send(JSON.stringify(objeto));
    }
}