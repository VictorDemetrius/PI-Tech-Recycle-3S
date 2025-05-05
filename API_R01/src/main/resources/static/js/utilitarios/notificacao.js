const body = document.querySelector('body');
let div_fundo = document.createElement('div');
let div_wrapper = document.createElement('div');           // linha de 100% width que segura a caixa de notificacao
let h6_mensagem = document.createElement('h6');            // mensagem a ser exibida. Faça uma mensagem curta
let div_linha_status = document.createElement('div');       // barrinha colorida. A cor deve refletir o tipo de alerta

let div_box;                // container da notificacao, grid 2x2; primeira linha é a barra de status; segunda linha o icone e mensagem
let icone_erro = document.createElement('span');             // icone de erro
let icone_sucesso = document.createElement('span');          // icone de sucesso
let icone_aviso = document.createElement('span');          // icone de aviso

document.addEventListener('DOMContentLoaded', async function (){
    inicializarNotificacao();
});

function inicializarNotificacao(){
    div_fundo = document.createElement('div');
    div_fundo.style.position = 'fixed';
    div_fundo.style.top = '0';
    div_fundo.style.width = '100%';
    div_fundo.style.height = '100%';
    div_fundo.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    div_fundo.style.zIndex = '4';

    div_wrapper = document.createElement('div');       
    div_wrapper.setAttribute('id', 'notificacao');
    div_wrapper.style.display = 'flex';
    div_wrapper.style.alignItems = 'center';
    div_wrapper.style.justifyContent = 'center';
    div_wrapper.style.width = '100%';
    div_wrapper.style.position = 'fixed';
    div_wrapper.style.top = '50px';
    div_wrapper.style.zIndex = '5';
    div_wrapper.style.transform = "translateY(-200px)";
    div_wrapper.style.transition = 'transform 1s ease 0.2s';

    div_box = document.createElement('div');
    div_box.style.display = 'grid';
    div_box.style.gridTemplateColumns = '10% 90%';
    div_box.style.gridTemplateRows = '10% 90%';
    div_box.style.alignItems = "center";
    div_box.style.justifyContent = "center";
    div_box.style.backgroundColor = "white";
    div_box.style.boxShadow = 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px';
    div_wrapper.append(div_box);

    div_linha_status.style.width = "auto";
    div_linha_status.style.height = "100%";
    div_linha_status.style.gridRow = '1';
    div_linha_status.style.gridColumnStart = '1';
    div_linha_status.style.gridColumnEnd = '3';
    div_linha_status.style.backgroundColor = 'black';
    div_box.append(div_linha_status);

    h6_mensagem.setAttribute('id', 'notific_msg');
    h6_mensagem.textContent = "Mensagem";
    h6_mensagem.style.textAlign = 'center';
    h6_mensagem.style.padding = '15px 30px';
    h6_mensagem.style.overflow = 'hidden';
    h6_mensagem.style.whiteSpace = "nowrap";
    h6_mensagem.style.textOverflow = "ellipsis";
    h6_mensagem.style.gridColumn = "2";
    h6_mensagem.style.gridRow = "2";
    h6_mensagem.style.margin = "0";
    div_box.append(h6_mensagem);

    // Deixando o icone de erro montado
    icone_erro.style.margin = '15px 30px';
    icone_erro.style.gridColumn = "1";
    icone_erro.style.gridRow = "2";
    icone_erro.style.width = '2rem';
    icone_erro.style.hegiht = '2rem';
    icone_erro.style.border = '2px solid black';
    icone_erro.style.borderRadius = '50%';
    icone_erro.style.height = '32px';
    icone_erro.style.width = '32px';
    icone_erro.style.fontWeight = 'bolder';
    icone_erro.style.fontSize = '20px';
    icone_erro.style.textAlign = 'center';
    icone_erro.innerHTML = "&#10005";

    // montando o icone de sucesso
    icone_sucesso.style.margin = '15px 30px';
    icone_sucesso.style.gridColumn = "1";
    icone_sucesso.style.gridRow = "2";
    icone_sucesso.style.width = '2rem';
    icone_sucesso.style.hegiht = '2rem';
    icone_sucesso.style.border = '2px solid black';
    icone_sucesso.style.borderRadius = '50%';
    icone_sucesso.style.height = '32px';
    icone_sucesso.style.width = '32px';
    icone_sucesso.style.fontWeight = 'bolder';
    icone_sucesso.style.fontSize = '20px';
    icone_sucesso.style.textAlign = 'center';
    icone_sucesso.innerHTML = "&#x2713;";

    // montando o icone de aviso
    icone_aviso.style.margin = '0px 30px 15px 35px';
    icone_aviso.style.gridColumn = "1";
    icone_aviso.style.gridRow = "2";
    icone_aviso.style.width = '2rem';
    icone_aviso.style.hegiht = '2rem';
    icone_aviso.style.height = '46px';
    icone_aviso.style.width = '32px';
    icone_aviso.style.fontWeight = 'normal';
    icone_aviso.style.fontSize = '40px';
    icone_aviso.style.textAlign = 'center';
    icone_aviso.innerHTML = "&#x26A0;";

    div_wrapper.remove();
}

/***
 * Mostra um alerta na tela
 * 
 * *mensagem*: Mensagem a ser exibida (preferencia curta);
 * *tipo*: "erro" ou "sucesso"
 */
async function notificar(mensagem, tipo){
    body.append(div_wrapper);
    body.append(div_fundo);

    // removendo os icones que podem estar na notificação. Caso não remova, a segunda notificacao exibida vai possuir 2 icones, devido a primeira ja ter sido chamada antes
    icone_sucesso.remove();
    icone_erro.remove();
    icone_aviso.remove();

    // mensagem a ser exibida
    h6_mensagem.textContent = mensagem;

    switch(tipo){
        case "erro":
            div_linha_status.style.backgroundColor = "red";
            div_linha_status.classList.add("notific_barra_progresso")
            div_box.append(icone_erro);

            
            div_wrapper.style.transform = "translateY(0)";
            let x = setTimeout( ()=>{
                div_wrapper.style.transform = "translateY(-200px)";
                div_fundo.remove();
            }, 5000);

            break;
        case "sucesso":
            div_linha_status.style.backgroundColor = "green";
            div_linha_status.classList.add("notific_barra_progresso")
            div_box.append(icone_sucesso);
            
            div_wrapper.style.transform = "translateY(0)";
            let y = setTimeout( ()=>{
                div_wrapper.style.transform = "translateY(-200px)";
                div_fundo.remove();
            }, 5000);
            break;
        case "aviso":
            div_linha_status.style.backgroundColor = "yellow";
            div_linha_status.classList.add("notific_barra_progresso")
            div_box.append(icone_aviso);
            
            div_wrapper.style.transform = "translateY(0)";
            let z = setTimeout( ()=>{
                div_wrapper.style.transform = "translateY(-200px)";
                div_fundo.remove();
            }, 5000);
            break;
        default:
            div_linha_status.style.backgroundColor = "red";
            div_box.append(icone_erro);

            
            div_wrapper.style.transform = "translateY(0)";
            let w = setTimeout( ()=>{
                div_wrapper.style.transform = "translateY(-200px)";
                div_fundo.remove();
            }, 5000);
            break;
    }
}

async function esperarSegundos(segundos){
    let tempo = segundos * 1000
    await new Promise(resolve => setTimeout(resolve, tempo));
}