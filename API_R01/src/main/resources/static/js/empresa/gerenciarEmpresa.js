const TBL_CORPO = document.getElementById('tbl-corpo');

document.addEventListener('DOMContentLoaded', async function () {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    await fetch('http://localhost:8080/empresa', {
        mode: 'cors',
        method: 'GET',
        headers: headers
    }).then(data => {
        return data.json()
    }).then(dados => {
        let empresas = dados.content;

        empresas.forEach(emp =>{
            const elem_tr = document.createElement('tr');
        
            const elem_td_id = document.createElement('td');
            const elem_td_foto = document.createElement('td');
            const elem_td_nome = document.createElement('td');
            const elem_td_email = document.createElement('td');
            const elem_td_cnpj = document.createElement('td');

            const elem_td_update = document.createElement('td');
            const elem_a_update = document.createElement('a')

            const elem_td_delete = document.createElement('td');
            const elem_a_delete = document.createElement('a')

            elem_td_id.textContent = emp.id;
            elem_td_id.classList.add("align-middle")
            elem_tr.append(elem_td_id);
            
            // foto de perfil
            const elem_img_foto = document.createElement('img');
            elem_img_foto.style.height = '32px';
            elem_img_foto.style.width = '32px';
            elem_img_foto.style.borderRadius = "50%";
            elem_img_foto.setAttribute('src','data:image/jpeg;base64,'+emp.foto);

            elem_td_foto.append(elem_img_foto);
            elem_td_foto.classList.add("align-middle")
            elem_tr.append(elem_td_foto);

            elem_td_nome.textContent = emp.estabelecimento;
            elem_td_nome.classList.add("align-middle")
            elem_tr.append(elem_td_nome);

            elem_td_email.textContent = emp.email;
            elem_td_email.classList.add("align-middle")
            elem_tr.append(elem_td_email);

            elem_td_cnpj.textContent = emp.cnpj;
            elem_td_cnpj.classList.add("align-middle")
            elem_tr.append(elem_td_cnpj);

            /* UPDATE */
            elem_a_update.textContent = "Alterar"; // criando o <a href="..."> </a> 
            elem_a_update.classList.add("btn", "py-0", "btn-outline-dark");
            elem_a_update.setAttribute("href","../../templates/empresa/alterarEmpresa.html?id="+emp.id) // colocando o <a> dentro do <td>
            elem_td_update.append(elem_a_update); // colocando o <td><a href="..."></a></td> dentro do <tr>
            elem_td_update.classList.add("align-middle");
            elem_tr.append(elem_td_update);

            /* DELETE */
            elem_a_delete.textContent = "Desativar"; // definindo o <a href="..."> </a> 
            elem_a_delete.classList.add("delete","btn", "py-0", "btn-outline-danger");
            elem_a_delete.setAttribute("data-id", emp.id);
            elem_a_delete.addEventListener("click", (e) => {
                deletarEmpresa(emp.id);
            });
            elem_td_delete.classList.add("align-middle");
            elem_td_delete.append(elem_a_delete); // colocando o <a> dentro do <td>
            elem_tr.append(elem_td_delete); // colocando o <td><a href="..."></a></td> dentro do <tr>


            // colocando nosso <tr> no corpo da tabela
            TBL_CORPO.append(elem_tr);            
        })
        
    })
});