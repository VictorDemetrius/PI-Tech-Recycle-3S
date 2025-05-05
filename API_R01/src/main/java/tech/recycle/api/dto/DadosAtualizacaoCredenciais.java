package tech.recycle.api.dto;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoCredenciais(
    @NotNull Long id,
    String email,
    DadosCredenciaisUsuario credenciais) 
{}
