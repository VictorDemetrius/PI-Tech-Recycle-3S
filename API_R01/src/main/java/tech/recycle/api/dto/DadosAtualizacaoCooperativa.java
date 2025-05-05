package tech.recycle.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DadosAtualizacaoCooperativa(
    @NotNull Long id,
    @NotBlank String nome,
    @NotBlank @Pattern(regexp = "\\d{11}") String telefone,
    @NotBlank @Pattern(regexp = "\\d{14}") String cnpj,
    @NotNull @Valid DadosEnderecoUsuario endereco
){}
