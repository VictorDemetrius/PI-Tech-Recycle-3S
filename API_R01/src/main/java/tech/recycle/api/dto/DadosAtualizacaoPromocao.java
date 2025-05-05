package tech.recycle.api.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;

public record DadosAtualizacaoPromocao(
    Long id,
    @NotBlank String descricao,
    Integer preco,
    LocalDate data_criacao
) 
{}
