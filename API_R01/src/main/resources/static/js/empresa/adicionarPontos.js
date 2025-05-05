const CARRINHO_CORPO = document.getElementById('tbl-corpo')

const SELECT_ELETRONICO = document.getElementById("eletronico");
const INPUT_QUANTIDADE = document.getElementById("quantidade");
const BTN_ADICIONAR_CARRINHO = document.getElementById("btn_add");
const BTN_SUBMIT = document.getElementById("submit");

const TOTAL_PONTOS = document.getElementById('resultado_total_pontos');

let contadorItemsCarrinho = 0;
let listaEletronicos;
let totalPontos = 0;

document.addEventListener('DOMContentLoaded', async function () {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    listaEletronicos = await fetch('http://localhost:8080/eletronicos', {
        mode: 'cors',
        method: 'GET',
        headers: headers
    }).then(data => {
        return data.json()
    })

    console.log(listaEletronicos);

    listaEletronicos.forEach(eletro => {
        let OPTION = document.createElement('option');
        OPTION.setAttribute('value', eletro.id);
        OPTION.textContent = eletro.nome;

        SELECT_ELETRONICO.append(OPTION)
    });

    BTN_SUBMIT.addEventListener('click', (e) => {
        e.preventDefault();
        if(contadorItemsCarrinho = 0){
            throw new Error("Carrinho vazio, Não houveram descartes");
        }
        document.body.style.cursor = "wait";
        BTN_SUBMIT.style.opacity = "0.7";
        enviarPontos();
    });

    BTN_ADICIONAR_CARRINHO.addEventListener('click', (e) => {
        e.preventDefault();
        if(isCampoVazio(SELECT_ELETRONICO)){
            throw new Error("Selecione o Eletronico que está sendo descartado")
        }
        if(isCampoVazio(INPUT_QUANTIDADE)){
            throw new Error("Diga a quantidade que está sendo descartada")
        }
        adicionarAoCarrinho(e);
        e.stopPropagation();
    });
});


function adicionarAoCarrinho(e){
    let el = SELECT_ELETRONICO;

    let ID_ELETRONICO = SELECT_ELETRONICO.value;
    let NOME = el.options[el.selectedIndex].text;
    let QUANTIDADE = INPUT_QUANTIDADE.value;

    let obj = listaEletronicos.filter(obj => {
        return obj.id == ID_ELETRONICO;
    })
    let VALOR_PONTOS = (obj[0].valor_pontos)

    // elemento pai 
    const elem_tr = document.createElement('tr');
    elem_tr.setAttribute('id', contadorItemsCarrinho);

    const elem_td_nome = document.createElement('td');
    elem_td_nome.classList.add('align-middle');
    elem_td_nome.textContent = NOME;
    elem_tr.append(elem_td_nome);

    const elem_td_quantidade = document.createElement('td');
    elem_td_quantidade.classList.add('align-middle');
    elem_td_quantidade.textContent = QUANTIDADE;
    elem_tr.append(elem_td_quantidade);

    const elem_td_pontos = document.createElement('td');
    elem_td_pontos.classList.add('align-middle');
    elem_td_pontos.textContent = VALOR_PONTOS;
    elem_tr.append(elem_td_pontos);

    const elem_a_remover = document.createElement('a'); 
    elem_a_remover.classList.add('btn_remove','btn','p-0','btn-outline-danger','rounded-circle','fw-bold');
    elem_a_remover.setAttribute('data-item', contadorItemsCarrinho);
    elem_a_remover.style.height = "32px";
    elem_a_remover.style.width = "32px";
    elem_a_remover.style.fontSize = "20px";
    elem_a_remover.innerHTML = "&#10005"
        const elem_td_remover = document.createElement('td');
        elem_td_remover.classList.add('align-middle');
        elem_td_remover.append(elem_a_remover);

    elem_tr.append(elem_td_remover);

    CARRINHO_CORPO.append(elem_tr);
 
    // adicionando o evento de remoção do item do Carrinho
    elem_a_remover.addEventListener('click', (e) => {
        let item = document.getElementById(contadorItemsCarrinho);
        elem_tr.remove();
        contadorItemsCarrinho--;
        totalPontos -= (parseInt(QUANTIDADE) * parseInt(VALOR_PONTOS));
        atualizarTotalPontos();
    });

    /* atualizando variaveis */
    contadorItemsCarrinho++;
    totalPontos += (parseInt(QUANTIDADE) * parseInt(VALOR_PONTOS));
    atualizarTotalPontos();
    
    e.stopPropagation();
}


function atualizarTotalPontos(){
    console.log(totalPontos)
    if(totalPontos >= 0){
        TOTAL_PONTOS.textContent = totalPontos;
    } else {
        TOTAL_PONTOS.textContent = "0";
    }
    
}

async function enviarPontos(){
    if(totalPontos > 0){
        // montando objeto
        let pontos = {
            quant_pontos: totalPontos,
            empresa: 1,
            usuario: 1,
            data_transacao: new Date().toJSON().slice(0, 10)
        }

        // preparando requisição
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', '*');

        await fetch("http://localhost:8080/pontos", {
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: JSON.stringify(pontos)
        })
        .then(response => {
            if(response.ok){
                document.body.style.cursor = "default"
                BTN_SUBMIT.style.opacity = "1";
                notificar("Pontos enviados com sucesso","sucesso")
                setTimeout( () => {
                    location.reload();
                },5000);
            } else {
                document.body.style.cursor = "default"
                BTN_SUBMIT.style.opacity = "1";
                notificar("Erro ao fazer requisição","erro")
            }
        })
    } else {
        notificar("Informe no mínimo 1 produto descartado","erro")
    }
}

/*****************************************/
/*               VALIDACAO               */ 
/*****************************************/

function isCampoVazio(input){
    if(input.value == null || input.value == "" || input.value == undefined){
        input.style.outline = "2px solid #FF0000";
        return true;
    } else {
        input.style.outline = "none";
        return false;
    }
}
