const INPUT_DESCRICAO = document.getElementById('descricao')
const INPUT_PRECO = document.getElementById('preco')
const INPUT_EMPRESA = document.getElementById('empresa')
const BTN_SUBMIT = document.getElementById('btn_submit')

document.addEventListener('DOMContentLoaded', async function () {
    BTN_SUBMIT.addEventListener('click', (e) => {
        e.preventDefault();
        cadastrarPromocao();
    });
});

async function cadastrarPromocao(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    let promocao = {
        preco: parseInt(INPUT_PRECO.value),
        descricao: INPUT_DESCRICAO.value,
        data_criacao: new Date().toJSON().slice(0, 10),
        empresa_id: INPUT_EMPRESA.value
    }

    await fetch('http://localhost:8080/promocao', {
        mode: 'cors',
        method: 'POST',
        headers: headers,
        body: JSON.stringify(promocao)
    }).then(res => {
        location.reload();
    })
}