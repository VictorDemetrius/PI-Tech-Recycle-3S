
const array_inputs_preenchidos = []; // para facilitar nossa vida na hora de autenticar os dados, vamos guardar os inputs num array.

function adicionarInputPreenchido(input) {
    if (input.value.trim() !== '') {
        array_inputs_preenchidos.push(input);
    }
}

// NOME
const input_nome = document.getElementById("nome");
input_nome.setAttribute('maxlength','200');
adicionarInputPreenchido(input_nome);

// CPF
const input_cpf = document.getElementById("cpf");
input_cpf.setAttribute('maxlength','11');
adicionarInputPreenchido(input_cpf);
adicionarRegex(input_cpf, "^[A-Za-z0-9]*$");

// CEP
const input_cep = document.getElementById("cep");
input_cep.setAttribute('maxlength','8');
adicionarInputPreenchido(input_cep);
adicionarRegex(input_cep, "^[0-9]*$");

// LOGRADOURO
const input_logradouro = document.getElementById("rua");
input_logradouro.setAttribute('maxlength','200')
adicionarInputPreenchido(input_logradouro);

// NUMERO
const input_numero = document.getElementById("numero");
input_numero.setAttribute('maxlength','7')
adicionarInputPreenchido(input_numero);
adicionarRegex(input_numero, "^[0-9]*$");

// COMPLEMENTO
const input_complemento = document.getElementById("complemento");
input_complemento.setAttribute('maxlength','200');
adicionarInputPreenchido(input_complemento);

// BAIRRO
const input_bairro = document.getElementById("bairro");
input_bairro.setAttribute('maxlength','200');
adicionarInputPreenchido(input_bairro);

// CIDADE
const input_cidade = document.getElementById("cidade");
input_cidade.setAttribute('maxlength','200');
adicionarInputPreenchido(input_cidade);

// UF
const input_uf = document.getElementById("uf");
adicionarInputPreenchido(input_uf);

// TELEFONE
const input_telefone = document.getElementById("telefone");
input_telefone.setAttribute('maxlength','11');
adicionarInputPreenchido(input_telefone);
adicionarRegex(input_telefone, "^[0-9]*$")

// EMAIL
const input_email = document.getElementById("email");
input_email.setAttribute('maxlength','200');
adicionarInputPreenchido(input_email);

// SENHA
const input_password = document.getElementById("password");
input_password.setAttribute('maxlength','64')
adicionarInputPreenchido(input_password);

const btn_submit = document.getElementById("salvarDados");
const usuarioArmazenado = JSON.parse(localStorage.getItem("usuario"));

document.addEventListener('DOMContentLoaded', async function () {

    exibirDadosUsuario(usuarioArmazenado); 

    array_inputs_preenchidos.forEach(input => {
        if(input === input_cep || input === input_cpf){
            input.addEventListener('keyup', (evento) =>{
                if (input.value.length == 8 && evento.key != "ArrowLeft" && evento.key != "ArrowRight"){
                    isCepValido(input);
                } else if (input.value.length == 11 && evento.key != "ArrowLeft" && evento.key != "ArrowRight"){
                    isCpfValido(input);
                }
            })
        }
    })
    
    btn_submit.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.style.cursor = "wait";
        btn_submit.style.opacity = "0.7";
        alterarCadastroDeUsuario();
    });
});

async function alterarCadastroDeUsuario(){
    
    array_inputs_preenchidos.forEach(input => {

        if(input === input_cep && !hasTamanhoDesejado(input, 8)){
            document.body.style.cursor = "default"
            btn_submit.style.opacity = "1";
            notificar("CEP inválido. Faltam dígitos","erro");
            throw new Error("Campo CEP invalido")
        }

        if(input === input_password && !hasTamanhoEntre(input, 8, 64)){
            document.body.style.cursor = "default"
            btn_submit.style.opacity = "1";
            notificar("A senha deve ter no mínimo 8 Caracteres","erro");
            throw new Error("Senha com tamanho invalido");
        }

        if(input === input_telefone && !hasTamanhoDesejado(input, 11)){
            document.body.style.cursor = "default"
            btn_submit.style.opacity = "1";
            notificar("O telefone deve ter no mínimo 11 Caracteres","erro");
            throw new Error("Telefone com tamanho invalido");
        }

        if(input === input_cpf && !hasTamanhoDesejado(input, 11)){
            document.body.style.cursor = "default"
            btn_submit.style.opacity = "1";
            notificar("O cpf deve ter 11 Caracteres","erro");
            throw new Error("cpf com tamanho invalido");
        }

        if(input === input_cpf && !isCpfValido(input.value)){
            document.body.style.cursor = "default"
            btn_submit.style.opacity = "1";
            notificar("O cpf inserido é invalido","erro");
            throw new Error("CPF invalido");
        }

        if(input === input_cpf && !isCpfDisponivel(input.value)){
            document.body.style.cursor = "default"
            btn_submit.style.opacity = "1";
            notificar("O cpf já está em uso no sistema","erro");
            throw new Error("CPF em uso");
        }

        if(input === input_email && isEmailDisponivel(input.value)){
            document.body.style.cursor = "default"
            btn_submit.style.opacity = "1";
            notificar("O Email já está em uso","erro");
            throw new Error("Email em uso");
        }

    })
    
    
    // montando o objeto JSON do Usuario
    var usuario = {
        id: usuarioArmazenado.id,
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

    limparVazios(usuario)

    // preparando requisição
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    await fetch('http://localhost:8080/usuario', {
        //mode: 'cors',
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(usuario)
    })
    .then(async (response) => {
        if (response.ok) {
            document.body.style.cursor = "default"
            btn_submit.style.opacity = "1";
            notificar('Dados alterados com sucesso!','sucesso');
            var dadosUsuario = await response.json();
            atualizarUsuario(dadosUsuario)

            setTimeout(() => {
                document.querySelector('.form-atualizar-dados').reset();
            }, 5000);

        } else {
            notificar('Erro ao alterar Dados','erro');
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

function atualizarUsuario(dadosUsuario) {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    usuarioLogado.nome = dadosUsuario.nome;
    usuarioLogado.cpf = dadosUsuario.cpf;
    if(usuarioLogado.endereco){
        usuarioLogado.endereco.logradouro = dadosUsuario.endereco.logradouro;
        usuarioLogado.endereco.cep = dadosUsuario.endereco.cep;
        usuarioLogado.endereco.numero = dadosUsuario.endereco.numero;
        usuarioLogado.endereco.complemento = dadosUsuario.endereco.complemento;
        usuarioLogado.endereco.bairro = dadosUsuario.endereco.bairro;
        usuarioLogado.endereco.cidade = dadosUsuario.endereco.cidade;
        usuarioLogado.endereco.uf = dadosUsuario.endereco.uf;
    }
    usuarioLogado.telefone = dadosUsuario.telefone;
    usuarioLogado.email = dadosUsuario.email;
    
    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
    exibirDadosUsuario(usuarioLogado);
}

function exibirDadosUsuario(usuario) {
    document.querySelector('.output-nome').innerText = 'Nome: ' + usuario.nome;
    document.querySelector('.output-cpf').innerText = 'Cpf: ' + usuario.cpf;
    // se o objeto "endereco" existe antes de acessar suas propriedades
    if (usuario.endereco) {
        document.querySelector('.output-rua').innerText = 'Rua: ' + usuario.endereco.logradouro;
        document.querySelector('.output-cep').innerText = 'Cep: ' + usuario.endereco.cep;
        document.querySelector('.output-numero').innerText = 'Numero: ' + usuario.endereco.numero;
        document.querySelector('.output-complemento').innerText = 'Complemento: ' + usuario.endereco.complemento;
        document.querySelector('.output-bairro').innerText = 'Bairro: ' + usuario.endereco.bairro;
        document.querySelector('.output-cidade').innerText = 'Cidade: ' + usuario.endereco.cidade;
        document.querySelector('.output-uf').innerText = 'UF: ' + usuario.endereco.uf;
    }
    document.querySelector('.output-celular').innerText = 'Celular: ' + usuario.telefone; 
    document.querySelector('.output-email').innerText = 'E-mail: ' + usuario.email;
}

function limparVazios(obj) {
    Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === 'object') {
            //função recursiva
            limparVazios(obj[key]);
            
            if (Object.keys(obj[key]).length === 0) {
                delete obj[key];
            }
        } else if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
            
            delete obj[key];
        }
    });
}

/*
============================================================================
|                      METODOS PARA VALIDAR INFORMAÇÕES                    |
============================================================================
*/

function hasTamanhoDesejado(input, tamanho){
    if(input.value.trim() === '' || input.value.trim() === null ){
        return true;
    } else if (input.value.length == tamanho){
        input.style.outline = "none"
        return true;
    } else {
        input.style.outline = "2px solid #FF0000"
        return false;
    }    
}

function hasTamanhoEntre(input, tamanho_min, tamanho_max){
    if(input.value.trim() === '' || input.value.trim() === null){
        return true;
    } else if(input.value.length >= tamanho_min && input.value.length <= tamanho_max){
        input.style.outline = "none"
        return true;
    } else {
        input.style.outline = "2px solid #FF0000"
        return false;
    }    
}

async function isCepValido(cep){

    if(cep.value.trim() !== '' || cep.value.trim() !== null ){
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
    } else {
        return false;
    }    
}

async function isEmailDisponivel(email){

    if(email.value.trim() !== '' && email.value.trim() !== null ){
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
            return data; 
        } catch (error) {
            console.error('Erro na Requisição:', error);
            return false
        };

    }else{
        return false;
    }
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
        notificar("CPF é válido", "sucesso");
        return true; // válido
    } else {
        // Código para estilo inválido
        notificar("O CPF é inválido", "erro");
        return false; // inválido
    }
}

async function isCpfDisponivel(cpf){
    if(cpf.value.trim() !== '' && cpf.value.trim() !== null ){
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
    }else{
        return null;
    }
}

function adicionarRegex(input, valor_regex){
    input.addEventListener('beforeinput', (e) => {
        let regex = new RegExp(valor_regex);
    
        if(e.data != null && !regex.test(e.data)){
            e.preventDefault();
        }
    });
}
