const array_inputs_obrigatorios = []; // para facilitar nossa vida na hora de autenticar os dados, vamos guardar os inputs num array.

// NOME
const input_nome = document.getElementById("nome");
array_inputs_obrigatorios.push(input_nome);
input_nome.setAttribute('maxlength','200');

// CPF
const input_cpf = document.getElementById("cpf");
array_inputs_obrigatorios.push(input_cpf);
input_cpf.setAttribute('maxlength','11');
adicionarRegex(input_cpf, "^[A-Za-z0-9]*$")

// CEP
const input_cep = document.getElementById("cep");
array_inputs_obrigatorios.push(input_cep);
input_cep.setAttribute('maxlength','8');
adicionarRegex(input_cep, "^[0-9]*$");

// LOGRADOURO
const input_logradouro = document.getElementById("rua");
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

// EMAIL
const input_email = document.getElementById("email");
array_inputs_obrigatorios.push(input_email);
input_email.setAttribute('maxlength','200')

// SENHA
const input_password = document.getElementById("password");
array_inputs_obrigatorios.push(input_password);
input_password.setAttribute('maxlength','64')

const btn_submit = document.getElementById("cadastrarButton");

document.addEventListener('DOMContentLoaded', async function () {
    
    input_cep.addEventListener('keyup', (e) => {
        if(input_cep.value.length == 8 && e.key != "ArrowLeft" && e.key != "ArrowRight"){
            //input_cep.disabled = true;
            isCepValido(input_cep.value);
        }
    });

    input_cpf.addEventListener('keyup', (e) => {
        if(input_cpf.value.length == 11 && e.key != "ArrowLeft" && e.key != "ArrowRight"){
            //input_cpf.disabled = true;
            isCpfValido(input_cpf.value);
        }
    })
    
    btn_submit.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.style.cursor = "wait";
        btn_submit.style.opacity = "0.7";
        cadastroDeUsuario();
    });
});

async function cadastroDeUsuario(){
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

    if(!hasTamanhoEntre(input_password, 8, 64)){
        document.body.style.cursor = "default"
        btn_submit.style.opacity = "1";
        notificar("A senha deve ter no mínimo 8 Caracteres","erro");
        throw new Error("Senha com tamanho invalido");
    }

    if(!hasTamanhoDesejado(input_telefone, 11)){
        document.body.style.cursor = "default"
        btn_submit.style.opacity = "1";
        notificar("O telefone deve ter no mínimo 11 Caracteres","erro");
        throw new Error("Telefone com tamanho invalido");
    }

    if(!hasTamanhoDesejado(input_cpf, 11)){
        document.body.style.cursor = "default"
        btn_submit.style.opacity = "1";
        notificar("O cpf deve ter 11 Caracteres","erro");
        throw new Error("cpf com tamanho invalido");
    }

    // verificando se o cpf é valido
    if(!isCpfValido(input_cpf.value)){
        document.body.style.cursor = "default"
        btn_submit.style.opacity = "1";
        notificar("O cpf inserido é invalido","erro");
        throw new Error("CPF invalido");
    }

    // verificando se o cpf já está cadastrado
    let cpf_disponivel = await isCpfDisponivel(input_cpf.value);
    if(!cpf_disponivel){
        document.body.style.cursor = "default"
        btn_submit.style.opacity = "1";
        notificar("O CPF já está em cadastrado no sistema","erro");
        throw new Error("CPF em uso");
    }

    // verificando se o email já está cadastrado
    var email_disponivel = await isEmailDisponivel(input_email.value);
    if(email_disponivel){
        document.body.style.cursor = "default"
        btn_submit.style.opacity = "1";
        notificar("O Email já está em uso","erro");
        throw new Error("Email em uso");
    }

    // montando o objeto JSON do Usuario
    let usuario = {
        nome: input_nome.value,
        telefone: input_telefone.value,
        cpf: input_cpf.value,
        endereco: {
            logradouro: input_logradouro.value,
            bairro: input_bairro.value,
            cep: input_cep.value,
            cidade: input_cidade.value,
            uf: input_uf.value,
            complemento: input_complemento.value,
            numero: input_numero.value
        },
        credenciais: {
            email: input_email.value,
            password: input_password.value
        }
    };

    // preparando requisição
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    await fetch('http://localhost:8080/usuario', {
        mode: 'cors',
        method: 'POST',
        headers: headers,
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (response.ok) {
            document.body.style.cursor = "default"
            btn_submit.style.opacity = "1";
            notificar('Usuário cadastrado com sucesso!','sucesso');
            let caminho_atual = window.location.href;
            let caminho_array = caminho_atual.split("/");
            caminho_array.pop();

            let caminho_base = ""
            
            caminho_array.forEach(elem => {
                caminho_base += elem+"/";
            })

            setTimeout( () => {
                window.location.href = caminho_base+"telaLogin.html";
            },5000);
        } else {
            notificar('Erro ao cadastrar Usuário','erro');
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

async function isEmailDisponivel(email){
    try {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', '*');

        let email_disp = await fetch("http://localhost:8080/usuario/porEmail/"+email, {
            method: "GET",
            headers: headers,
        })
        
        if (!email_disp.ok) {
            throw new Error('Erro na requisição');
        }
        var data = await email_disp.json();
        console.log(data)
        return data; 
        
    } catch (error) {
        console.error('Erro na Requisição:', error);
        return false
    };
}

function isCpfValido(cpf) {
    let array_cpf = [];

    // Remova caracteres não numéricos do CPF
    cpf = cpf.replace(/\D/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        notificar("O CPF deve ter 11 dígitos", "erro");
        return false;
    }

    // Preenche o array com os dígitos do CPF
    for (let i = 0; i < 11; i++) {
        let num = parseInt(cpf.charAt(i));
        array_cpf.push(num);
    }

    let res_primeiro_dv;
    let res_segundo_dv;
    let mult_primeiro_digit = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    let mult_segundo_digit = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma_produtos_1_dv = 0;
    let soma_produtos_2_dv = 0;

    array_cpf.forEach((num, index) => {
        if (index < 9) {
            soma_produtos_1_dv += num * mult_primeiro_digit[index];
            soma_produtos_2_dv += num * mult_segundo_digit[index];
        }
    });

    // Calculando primeiro digito verificador
    res_primeiro_dv = (soma_produtos_1_dv % 11) < 2 ? 0 : 11 - (soma_produtos_1_dv % 11);

    // Adiciona o primeiro dígito verificador ao array
    array_cpf.push(res_primeiro_dv);

    // Calculando segundo digito verificador
    soma_produtos_2_dv += res_primeiro_dv * mult_segundo_digit[9];
    res_segundo_dv = (soma_produtos_2_dv % 11) < 2 ? 0 : 11 - (soma_produtos_2_dv % 11);

    // Adiciona o segundo dígito verificador ao array
    array_cpf.push(res_segundo_dv);

    // Comparando se os 2 dígitos calculados batem com os 2 últimos dígitos do CPF
    if (array_cpf[9] === res_primeiro_dv && array_cpf[10] === res_segundo_dv) {
        // Código para estilo válido
        input_cpf.style.outline = "none";
        return true; // válido
    } else {
        // Código para estilo inválido
        notificar("O CPF é inválido", "erro");
        input_cpf.style.outline = "2px solid #FF0000";
        return false; // inválido
    }
}

async function isCpfDisponivel(cpf){
    // preparando requisição
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    let cpf_disp = await fetch("http://localhost:8080/usuario/porCpf/"+cpf, {
        method: "GET",
        headers: headers
    }).then(data => {
        return data.json();
    }).then(dados => {
        return dados.hasOwnProperty('disponivel');
    });

    return cpf_disp;
}

function adicionarRegex(input, valor_regex){
    input.addEventListener('beforeinput', (e) => {
        let regex = new RegExp(valor_regex);
    
        if(e.data != null && !regex.test(e.data)){
            e.preventDefault();
        }
    });
}
