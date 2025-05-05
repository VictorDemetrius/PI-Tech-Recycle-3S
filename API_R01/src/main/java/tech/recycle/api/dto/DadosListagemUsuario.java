package tech.recycle.api.dto;

import tech.recycle.api.model.Privilegio;
import tech.recycle.api.model.Usuario;

public record DadosListagemUsuario(
        Long id,
        String nome,
        String email,
        String cpf,
        Privilegio privilegio) {

    public DadosListagemUsuario(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getNome(),
                usuario.getCredenciais().getEmail(),
                usuario.getCpf(),
                usuario.getPrivilegio());
    }

}
