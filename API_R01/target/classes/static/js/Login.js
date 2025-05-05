document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('fazerLogin');

    loginButton.addEventListener('click',()=>{
        try {
            logarUsuario();
        } catch (error) {
            error.preventReload = true;
            throw error;
        }
    });
});

async function logarUsuario() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    let credenciais = {
        email: email,
        password: password
    };

    try {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', '*');

        const response = await fetch('http://localhost:8080/auth/login',{
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: JSON.stringify(credenciais)
        });
        
        console.log(response)

        if (response.ok) {
            console.log(response);
            const data = await response.json();
            const token = data.token;
        
            const loginResponse = await fetch('http://localhost:8080/auth/login/'+email, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Origin': '*'
                },
            });

            
            if (loginResponse.ok) {
                
                alert('Logado');
                const usuarioDTO = await loginResponse.json();
                const usuario = JSON.parse(usuarioDTO);
                console.log(usuarioDTO);

                localStorage.setItem('usuario', JSON.stringify(usuario));

                if(usuarioDTO.tabela == "usuario"){
                    notificar('Logando...','sucesso');
                    setTimeout( () => {
                        window.location.replace("http://stackoverflow.com");
                    },5000);
                }
            } else {
                throw new Error('Erro ao obter informações do usuário:', loginResponse.status);
            }

        } else {
            alert('Erro ao inserir credenciais.');
        }
    } catch (error) {
        console.error('Erro ao realizar a solicitação:', error);
    }
}

// Verifica se existe um usuário na localStorage
const usuarioArmazenado = localStorage.getItem('usuario');

if (usuarioArmazenado) {
    // Se existir, converte a string JSON para um objeto JavaScript
    const usuario = JSON.parse(usuarioArmazenado);

    // Agora você pode acessar os dados do usuário conforme necessário
    console.log('ID do usuário:', usuario.id);
    console.log('Nome do usuário:', usuario.nome);
    console.log('Email do usuário:', usuario.email);
    // E assim por diante...

    // Agora você pode usar esses dados conforme necessário
} else {
    console.log('Nenhum usuário encontrado na localStorage');
}




