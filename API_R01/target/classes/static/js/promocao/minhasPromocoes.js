const TBL_CORPO = document.getElementById('tbl-corpo')
const ID_TESTE2 = 2;

document.addEventListener('DOMContentLoaded', async function () {
	
	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');
	headers.append('Origin', '*');

	let minhas_promos = await fetch('http://localhost:8080/promocao/buscaPorEmpresa/owner/'+ID_TESTE, {
			mode: 'cors',
			method: 'GET',
			headers: headers
	}).then(res => {
			return res.json();
	}).then(dados => {
		let promos = dados;

		promos.forEach(promocao => {
			const elem_tr = document.createElement('tr');

			const elem_td_id = document.createElement('td');
			const elem_td_descricao = document.createElement('td');
			const elem_td_preco = document.createElement('td');
			const elem_td_vendas = document.createElement('td');
			const elem_td_data = document.createElement('td');

			const elem_td_update = document.createElement('td');
			const elem_a_update = document.createElement('a');

			const elem_td_delete = document.createElement('td');
			const elem_a_delete = document.createElement('a');

			/* */

			elem_td_id.textContent = promocao.id;
			elem_td_id.classList.add("align-middle","text-center")
			elem_tr.append(elem_td_id);

			elem_td_descricao.textContent = promocao.descricao;
			elem_td_descricao.classList.add("align-middle");
			elem_tr.append(elem_td_descricao);

			elem_td_preco.textContent = promocao.preco;
			elem_td_preco.classList.add("align-middle","text-center");
			elem_tr.append(elem_td_preco);

			elem_td_vendas.textContent = promocao.quant_vendidos;
			elem_td_vendas.classList.add("align-middle","text-center");
			elem_tr.append(elem_td_vendas);

			elem_td_data.textContent = promocao.data_criacao;
			elem_td_data.classList.add("align-middle","text-center");
			elem_tr.append(elem_td_data);

			/* UPDATE 
			elem_a_update.textContent = "Alterar"; // criando o <a href="..."> </a> 
			elem_a_update.classList.add("btn", "py-0", "btn-outline-dark");
			elem_a_update.setAttribute("href","#") // colocando o <a> dentro do <td>
			elem_td_update.append(elem_a_update); // colocando o <td><a href="..."></a></td> dentro do <tr>
			elem_td_update.classList.add("align-middle");
			elem_tr.append(elem_td_update);
			*/

			/* DELETE */
			elem_a_delete.innerHTML = "&#10005"; // definindo o <a href="..."> </a> 
			elem_a_delete.classList.add("delete","btn", "py-0", "btn-outline-danger","text-center");
			elem_a_delete.setAttribute("data-id", promocao.id);
			elem_a_delete.addEventListener("click", (e) => {
					alert("Deletando...")
			});
			elem_td_delete.classList.add("align-middle");
			elem_td_delete.append(elem_a_delete); // colocando o <a> dentro do <td>
			elem_tr.append(elem_td_delete);

			TBL_CORPO.append(elem_tr);  

		})
	})

});