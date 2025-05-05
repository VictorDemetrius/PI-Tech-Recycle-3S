const urlParams = new URLSearchParams(window.location.search);
const param_id = urlParams.get('id');
console.log(param_id);

const array_inputs_obrigatorios = []; // para facilitar nossa vida na hora de autenticar os dados, vamos guardar os inputs num array.

// NOME
const input_nome = document.getElementById("nome");
array_inputs_obrigatorios.push(input_nome);
input_nome.setAttribute('maxlength','200');

// CNPJ
const input_cnpj = document.getElementById("cnpj");
array_inputs_obrigatorios.push(input_cnpj);
input_cnpj.setAttribute('maxlength','14');
adicionarRegex(input_cnpj, "^[A-Za-z0-9]*$")

// CEP
const input_cep = document.getElementById("cep");
array_inputs_obrigatorios.push(input_cep);
input_cep.setAttribute('maxlength','8');
adicionarRegex(input_cep, "^[0-9]*$");

// LOGRADOURO
const input_logradouro = document.getElementById("logradouro");
array_inputs_obrigatorios.push(input_logradouro);
input_logradouro.setAttribute('maxlength','200')

// NUMERO
const input_numero = document.getElementById("numero");
array_inputs_obrigatorios.push(input_numero);
input_numero.setAttribute('maxlength','7')
adicionarRegex(input_numero, "^[0-9]*$");

// COMPLEMENTO
const input_complemento = document.getElementById("complemento");
input_complemento.setAttribute('maxlength','200')

// BAIRRO
const input_bairro = document.getElementById("bairro");
array_inputs_obrigatorios.push(input_bairro);
input_bairro.setAttribute('maxlength','200')

// CIDADE
const input_cidade = document.getElementById("cidade");
array_inputs_obrigatorios.push(input_cidade);
input_cidade.setAttribute('maxlength','200')

// UF
const input_uf = document.getElementById("uf");
array_inputs_obrigatorios.push(input_uf);

// TELEFONE
const input_telefone = document.getElementById("telefone");
array_inputs_obrigatorios.push(input_telefone);
input_telefone.setAttribute('maxlength','11');
adicionarRegex(input_telefone, "^[0-9]*$")

const btn_submit = document.getElementById("submit");

// Vamos guardar o CNPJ que acabou de ser puxado.
// O ADMIN precisa conseguir deixar o CNPJ inalterado, mas deixando o mesmo irá aparecer que já está cadastrado (A Propria COOP)
// Vamos então guardar o CNPJ em um let pra ser usado na verificação
let CNPJ_ATUAL;

document.addEventListener('DOMContentLoaded', function () {    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    fetch('http://localhost:8080/cooperativa/'+param_id, {
        mode: 'cors',
        method: 'GET',
        headers: headers
    })
    .then(data => {
        return data.json()
    })
    .then(cooperativa => {
        input_nome.value =          cooperativa.nome;
        input_cnpj.value =          cooperativa.cnpj;
        input_cep.value =           cooperativa.endereco.cep;
        input_logradouro.value =    cooperativa.endereco.logradouro;
        input_numero.value =        cooperativa.endereco.numero;
        input_complemento.value =   cooperativa.endereco.complemento;
        input_bairro.value =        cooperativa.endereco.bairro;
        input_cidade.value =        cooperativa.endereco.cidade;
        input_uf.value =            cooperativa.endereco.uf;
        input_telefone.value =      cooperativa.telefone;

        CNPJ_ATUAL = cooperativa.cnpj
    });

    console.log("29553960000160");
    console.log("02543945000185");
    console.log("33014556000196");

    input_cep.addEventListener('keyup', (e) => {
        if(input_cep.value.length == 8 && e.key != "ArrowLeft" && e.key != "ArrowRight"){
            input_cep.disabled = true;
            isCepValido(input_cep.value);
        }
    });

    input_cnpj.addEventListener('keyup', (e) => {
        if(input_cnpj.value.length == 14 && e.key != "ArrowLeft" && e.key != "ArrowRight"){
            input_cnpj.disabled = true;
            isCnpjValido(input_cnpj.value);
        }
    })
    
    btn_submit.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.style.cursor = "wait";
        btn_submit.style.opacity = "0.7";
        alterarCooperativa();
    });
});

async function alterarCooperativa(){
    // verificação de tamanho do cep
    if(!hasTamanhoDesejado(input_cep, 8)){
        document.body.style.cursor = "default"
        btn_submit.style.opacity = "1";
        notificar("CEP inválido. Faltam dígitos","erro");
        throw new Error("Campo CEP invalido")
    }

    // verificação de campo vazio em todos os inputs. Throw new error quebra a function e evita o fetch que vai dar erro
    array_inputs_obrigatorios.forEach(input => {
        if (isCampoVazio(input)){
            notificar("O Campo \""+input.getAttribute('placeholder')+"\" está Vazio","erro");
            document.body.style.cursor = "default"
            btn_submit.style.opacity = "1";
            throw new Error("Existem Campos Vázios no Formulário");
            
        };
    });

    if(!hasTamanhoDesejado(input_telefone, 11)){
        document.body.style.cursor = "default"
        btn_submit.style.opacity = "1";
        notificar("O telefone deve ter no mínimo 11 Caracteres","erro");
        throw new Error("Telefone com tamanho invalido");
    }

    if(!hasTamanhoDesejado(input_cnpj, 14)){
        document.body.style.cursor = "default"
        btn_submit.style.opacity = "1";
        notificar("O CNPJ deve ter 14 Caracteres","erro");
        throw new Error("CNPJ com tamanho invalido");
    }

    // verificando se o CNPJ é valido
    if(!isCnpjValido(input_cnpj.value)){
        document.body.style.cursor = "default"
        btn_submit.style.opacity = "1";
        notificar("O CNPJ inserido é invalido","erro");
        throw new Error("CNPJ invalido");
    }

    // verificando se o cnpj já está cadastrado
    let cnpj_disponivel = await isCnpjDisponivel(input_cnpj.value);
    if(!cnpj_disponivel && input_cnpj.value != CNPJ_ATUAL){
        document.body.style.cursor = "default"
        btn_submit.style.opacity = "1";
        notificar("O CNPJ já está em cadastrado no sistema","erro");
        throw new Error("CNPJ em uso");
    }


    // montando o json
    let json_dados = {
        id: parseInt(param_id),
        nome: input_nome.value,
        telefone: input_telefone.value,
        cnpj: input_cnpj.value,
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

    fetch('http://localhost:8080/cooperativa/'+param_id, {
        mode: 'cors',
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(json_dados)
    })
    .then(response => {
        if(response.ok) {
            document.body.style.cursor = "default"
            btn_submit.style.opacity = "1";
            notificar('Cooperativa alterada com sucesso!','sucesso');
            setTimeout( () => {
                location.reload();
            },5000);
        } else {
            notificar('Erro ao cadastrar cooperativa','erro');
            document.body.style.cursor = "default"
            btn_submit.style.opacity = "1";
        }
    })
    .catch(error => {
        document.body.style.cursor = "default"
        btn_submit.style.opacity = "1";
        console.error('Erro ao realizar a solicitação:', error);
    });

}

/*
============================================================================
|                      METODOS PARA VALIDAR INFORMAÇÕES                    |
============================================================================
*/

function isCampoVazio(input){
    if(input.value == "" || input.value == null){
        input.style.outline = "2px solid #FF0000"
        return true;
    } else {
        input.style.outline = "none"
        return false;
    }
}

function hasTamanhoDesejado(input, tamanho){
    if(input.value.length == tamanho){
        input.style.outline = "none"
        return true;
    } else {
        input.style.outline = "2px solid #FF0000"
        return false;
    }
}

function hasTamanhoEntre(input, tamanho_min, tamanho_max){
    if(input.value.length >= tamanho_min && input.value.length <= tamanho_max){
        input.style.outline = "none"
        return true;
    } else {
        input.style.outline = "2px solid #FF0000"
        return false;
    }
}

async function isCepValido(cep){
    await fetch('https://viacep.com.br/ws/'+cep+'/json/', {
        method: 'GET'
    }).then(data => {
        return data.json()
    }).then(dados => {
        if(dados.hasOwnProperty('erro')){
            input_logradouro.value = null;
            input_bairro.value = null;
            input_cidade.value = null;
            input_uf.value = null;
            notificar("O CEP informado não existe","aviso")
            input_cep.style.outline = "none";
            input_cep.disabled = false;
        } else {
            input_logradouro.value = dados.logradouro;
            input_bairro.value = dados.bairro;
            input_cidade.value = dados.localidade;
            input_uf.value = dados.uf;
            input_cep.disabled = false;
        } 
    });
}

function isCnpjValido(cnpj){
    let array_cnpj = [];

    for(let i = 0; i < 14; i++){
        let num = parseInt( cnpj.substring(i,(i+1)) );
        array_cnpj.push(num);
    }

    let res_primeiro_dv;
    let res_segundo_dv;
    let mult_primeiro_digit = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let mult_segundo_digit = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma_produtos_1_dv = 0;         // dv = digito verificador
    let soma_produtos_2_dv = 0;         

    array_cnpj.forEach((num, index) => {
        if(index < 12){
            soma_produtos_1_dv += num * mult_primeiro_digit[index];
            soma_produtos_2_dv += num * mult_segundo_digit[index];
        } else if(index == 12){
            soma_produtos_2_dv += num * mult_segundo_digit[index];
        } 
    });

    // calculando primeiro verificador
    res_primeiro_dv = 11 - (soma_produtos_1_dv % 11);
    if(res_primeiro_dv >= 10){
        res_primeiro_dv = 0;
    }

    // calculando segundo digito verificador
    res_segundo_dv = 11 - (soma_produtos_2_dv % 11);
    if(res_segundo_dv >= 10){
        res_segundo_dv = 0;
    }

    // comparando se os 2 digitos calculados batem com os 2 digitos informados (2 ultimos digitos cnpj)
    if(res_primeiro_dv === array_cnpj[12] && res_segundo_dv === array_cnpj[13]){
        input_cnpj.style.outline = "none";
        input_cnpj.disabled = false;
        return true         // valido
    } else {
        notificar("O CNPJ é invalido","erro")
        input_cnpj.style.outline = "2px solid #FF0000";
        input_cnpj.disabled = false;
        return false        // invalido
    }
}

async function isCnpjDisponivel(cnpj){
    // preparando requisição
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    let cnpj_disp = await fetch("http://localhost:8080/cooperativa/cnpj/"+cnpj, {
        method: "GET",
        headers: headers
    }).then(data => {
        return data.json();
    }).then(dados => {
        return dados.hasOwnProperty('disponivel');
    });

    return cnpj_disp;
}

function adicionarRegex(input, valor_regex){
    input.addEventListener('beforeinput', (e) => {
        let regex = new RegExp(valor_regex);
    
        if(e.data != null && !regex.test(e.data)){
            e.preventDefault();
        }
    });
}
