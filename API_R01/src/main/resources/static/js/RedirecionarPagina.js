let botaoClicado;

const botoes = document.querySelectorAll('.botao');

export function redirecionarPagina() {
    const pagina = botaoClicado.getAttribute('data-url');
    window.location.href = pagina;
}

botoes.forEach(btn => {
    btn.addEventListener('click', (evento) => {
        evento.preventDefault();
        botaoClicado = evento.target;
        redirecionarPagina();
    });
});