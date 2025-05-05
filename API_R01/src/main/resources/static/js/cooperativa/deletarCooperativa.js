function deletarCooperativa(id, input){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    fetch('http://localhost:8080/cooperativa/'+id, {
        mode: 'cors',
        method: 'DELETE',
        headers: headers
    })
    .then(response => {
        if(response.ok) {
            document.body.style.cursor = "default"
            input.style.opacity = "1";
            notificar('Cooperativa desativada com sucesso!','sucesso');
            setTimeout( () => {
                location.reload();
            },5000);
        } else {
            notificar('Erro ao deletar cooperativa','erro');
            document.body.style.cursor = "default"
            input.style.opacity = "1";
        }
    })
    .catch(error => {
        document.body.style.cursor = "default"
        input.style.opacity = "1";
        console.error('Erro ao realizar a solicitação:', error);
    });
}

function apagarCooperativaDoBanco(id, input){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    fetch('http://localhost:8080/cooperativa/apagar/'+id, {
        mode: 'cors',
        method: 'DELETE',
        headers: headers
    })
    .then(response => {
        if(response.ok) {
            document.body.style.cursor = "default"
            input.style.opacity = "1";
            notificar('Cooperativa apagada do banco com sucesso!','sucesso');
            setTimeout( () => {
                location.reload();
            },5000);
        } else {
            notificar('Erro ao apagar cooperativa do banco','erro');
            document.body.style.cursor = "default"
            input.style.opacity = "1";
        }
    })
    .catch(error => {
        document.body.style.cursor = "default"
        input.style.opacity = "1";
        console.error('Erro ao realizar a solicitação:', error);
    });
}