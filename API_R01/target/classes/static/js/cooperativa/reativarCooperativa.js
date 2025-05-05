function reativarCooperativa(id, input){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    fetch('http://localhost:8080/cooperativa/reativar/'+id, {
        mode: 'cors',
        method: 'PUT',
        headers: headers
    })
    .then(response => {
        if(response.ok) {
            document.body.style.cursor = "default"
            input.style.opacity = "1";
            notificar('Cooperativa reativada com sucesso!','sucesso');
            setTimeout( () => {
                location.reload();
            },5000);
        } else {
            notificar('Erro ao reativar cooperativa','erro');
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