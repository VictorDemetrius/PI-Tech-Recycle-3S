package tech.recycle.api.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;

public record DadosCadastroPromocao(
    Integer preco,
    @NotBlank String descricao,
    LocalDate data_criacao,
    Long empresa_id
) 
{}
