const btn_excluir = document.getElementById("excluirDados");

document.addEventListener('DOMContentLoaded', async function () {

    const usuarioArmazenado = JSON.parse(localStorage.getItem("usuario"));
    const idUsuarioArmazenado = usuarioArmazenado.id
    //console.log(idUsuarioArmazenado)

    btn_excluir.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.style.cursor = "wait";
        btn_excluir.style.opacity = "0.7";
        deletarUsuario(idUsuarioArmazenado);
    });
});


function deletarUsuario(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    fetch('http://localhost:8080/usuario/'+id, {
        method: 'DELETE',
        headers: headers
    })
    .then((response) => {
        if(response.ok) {
            document.body.style.cursor = "default"
            btn_submit.style.opacity = "1";
            notificar('Conta excluida com sucesso!','sucesso');

            setTimeout(() => {
                document.querySelector('.form-atualizar-dados').reset();
                localStorage.removeItem("usuario")
                window.location.href = "http://127.0.0.1:5501/API_R01/src/main/resources/template/telaHome.html"
            }, 6000);
            
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

