const NumTotalPromocoes = document.getElementById("NumTotalPromocoes");
const NumTotalVendas = document.getElementById("NumTotalVendas");
const NumVendasMes = document.getElementById("NumVendasMes");
const NumLixoColec = document.getElementById("NumLixoColec");

const ID_TESTE = 2;

document.addEventListener('DOMContentLoaded', async function () {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');

    let estatisticas = await fetch('http://localhost:8080/promocao/estatisticasLoja/'+ID_TESTE, {
        mode: 'cors',
        method: 'GET',
        headers: headers
    }).then(res => {
        return res.json()
    })

		estatisticas.vendas_mes_atual == null ? 
			NumVendasMes.innerHTML = "0" :
    	NumVendasMes.innerHTML = estatisticas.vendas_mes_atual;

		estatisticas.total_vendas == null ?
			NumTotalVendas.innerHTML = "0" :
			NumTotalVendas.innerHTML = estatisticas.total_vendas;

    NumTotalPromocoes.innerHTML = estatisticas.quant_promocoes;
    
		/**/

		

    let vendas = await fetch('http://localhost:8080/promocao/vendasLoja/'+ID_TESTE, {
        mode: 'cors',
        method: 'GET',
        headers: headers
    }).then(res => {
        return res.json();
    })

    console.log(vendas);

		let data_atual_ref = new Date();
		let array_vendas = []

		for(let i = 0; i < 6; i++){
		
			// acha o numero do mes atual. Ex: 11 (novembro = 11). Somamos +1 pois o mes atual ele retorna Outubro (10)
			let num = data_atual_ref.getMonth() + 1;

			// procura se algum objeto dentro do json tem {mes: 11} e retorna um array com o objeto
			let vendas_obj = vendas.filter(data => data.mes == num)

			// se esse array tiver tamanho 1, ele trouxe um json dentro
			if(vendas_obj.length == 1){
				array_vendas.unshift(vendas_obj[0].total_vendas);
			} else {
				array_vendas.unshift(0)
			}

			// subtraimos 1 mes do mes atual pra chegar no mes anterior. Como somamos +1 pra achar o mes atual, subtraimos -2 pra cair no mes de tras
			data_atual_ref.setMonth(num - 2);
		}

		console.log(array_vendas);

    const GRAFICO = document.getElementById("grafico");
		const ESTATISTICAS = document.getElementById("box-stats");

		window.addEventListener('resize', (e) => {
			GRAFICO.setAttribute("width", ESTATISTICAS.getAttribute('width'))
		});

		let data_atual = new Date();
		let labels = []

		for(let i = 0; i<6; i++){
			let num = data_atual.getMonth()

			if(i > 0){
				data_atual.setMonth(num - 1);
			}

			let mes = data_atual.toLocaleString('pt-BR', {
				month: 'long',
			});

			labels.unshift(mes);
		}

		console.log(labels);

		new Chart("grafico", {
			type: "line",
			data: {
				labels: labels,
				datasets: [
					{
						label: ["Vendas no Mês"],
						data: array_vendas,
						borderColor: "#4FC0D0"
					},
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'top',
					},
					yAxes: [{
						display: true,
						ticks: {
								beginAtZero: true,
								steps: 50,
								stepValue: 5,
								max: 100
						}
					}],
					title: {
						display: false,
						text: 'Chart.js Bar Chart'
					}
				}
			},
    });
});