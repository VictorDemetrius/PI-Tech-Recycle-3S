const LISTA_CARDS = document.getElementById('lista-cards')

document.addEventListener('DOMContentLoaded', async function () {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    await fetch('http://localhost:8080/promocao/buscaPorEmpresa/2', {
        mode: 'cors',
        method: 'GET',
        headers: headers
    }).then(data => {
        return data.json()
    }).then(dados => {
        
        let promocoes = dados;
        console.log(promocoes)

        promocoes.forEach(promocao => {
            let CARD_PROMO = document.createElement('div');
            CARD_PROMO.classList.add('card','p-3');
            CARD_PROMO.setAttribute('data-cod', promocao.id);

            let PROMO_FOTO_EMPRESA = document.createElement('img')
            PROMO_FOTO_EMPRESA.setAttribute('src','data:image/jpeg;base64,'+promocao.foto);
            PROMO_FOTO_EMPRESA.setAttribute('alt','_');
            PROMO_FOTO_EMPRESA.classList.add('promo-foto-emp', 'rounded-circle');

            let PROMO_NOME_EMPRESA = document.createElement('h6')
            PROMO_NOME_EMPRESA.textContent = promocao.nome_empresa;
            PROMO_NOME_EMPRESA.classList.add('promo-nome-emp','fs-7');

            let PROMO_DESCRICAO = document.createElement('h6');
            PROMO_DESCRICAO.textContent = promocao.descricao;
            PROMO_DESCRICAO.classList.add('promo-descricao');

            let PROMO_PRECO = document.createElement('h6');
            PROMO_PRECO.textContent = promocao.preco + " Pontos";
            PROMO_PRECO.classList.add('promo-preco');

            /**/ 
            CARD_PROMO.append(PROMO_FOTO_EMPRESA);
            CARD_PROMO.append(PROMO_NOME_EMPRESA);
            CARD_PROMO.append(PROMO_DESCRICAO);
            CARD_PROMO.append(PROMO_PRECO);

            LISTA_CARDS.append(CARD_PROMO);
        });
    });
});