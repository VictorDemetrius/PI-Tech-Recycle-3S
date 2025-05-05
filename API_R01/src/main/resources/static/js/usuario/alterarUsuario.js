const urlParams = new URLSearchParams(window.location.search);
const param_id = urlParams.get('id');
console.log(param_id);

const input_nome = document.getElementById("nome");
const input_cpf = document.getElementById("cpf");
const input_cep = document.getElementById("cep");
const input_logradouro = document.getElementById("logradouro");
const input_numero = document.getElementById("numero");
const input_complemento = document.getElementById("complemento");
const input_bairro = document.getElementById("bairro");
const input_cidade = document.getElementById("cidade");
const input_uf = document.getElementById("uf");
const input_telefone = document.getElementById("telefone");
const input_email = document.getElementById("email");
const input_privilegio = document.getElementById("privilegio")
// const input_password = document.getElementById("password");
// const input_conf_password = document.getElementById();

const btn_submit = document.getElementById("submit");

document.addEventListener('DOMContentLoaded', function () {    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    fetch('http://localhost:8080/usuario/'+param_id, {
        mode: 'cors',
        method: 'GET',
        headers: headers
    })
    .then(data => {
        return data.json()
    })
    .then(usuario => {
        input_nome.value =          usuario.nome;
        input_cpf.value =           usuario.cpf;
        input_cep.value =           usuario.endereco.cep;
        input_logradouro.value =    usuario.endereco.logradouro;
        input_numero.value =        usuario.endereco.numero;
        input_complemento.value =   usuario.endereco.complemento;
        input_bairro.value =        usuario.endereco.bairro;
        input_cidade.value =        usuario.endereco.cidade;
        input_uf.value =            usuario.endereco.uf;
        input_telefone.value =      usuario.telefone;
        input_privilegio.value =    usuario.privilegio;
        // input_email.value =         usuario.email;
        // input_password.value =      usuario.password
    });

    btn_submit.addEventListener("click", (e) => {
        e.preventDefault();
        alterarUsuario();
    });
});

function alterarUsuario(){
    // montando o objeto pra atualizar os dados do usuario
    let json_dados = {
        id: parseInt(param_id),
        nome: input_nome.value,
        telefone: input_telefone.value,
        cpf: input_cpf.value,
        privilegio: input_privilegio.value,
        endereco: {
            logradouro: input_logradouro.value,
            bairro: input_bairro.value,
            cep: input_cep.value,
            numero: input_numero.value,
            complemento: input_complemento.value,
            cidade: input_cidade.value,
            uf: input_uf.value
        }
    }

    //fazendo o fetch
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    fetch('http://localhost:8080/usuario', {
        mode: 'cors',
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(json_dados)
    })
    .then(response => {
        if(response.ok) {
            alert('Usuário alterado com sucesso!');
            location.reload();
        } else {
            alert('ERRO ao alterar Usuário');
        }
    })
    .catch(error => {
        console.log('Erro ao realizar a solicitação:', error);
    });

}