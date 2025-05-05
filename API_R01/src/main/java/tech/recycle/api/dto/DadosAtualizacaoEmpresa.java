package tech.recycle.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DadosAtualizacaoEmpresa(
    @NotNull Long id,
    @NotBlank String estabelecimento,
    @NotBlank String tipoEstabelecimento,
    @NotBlank @Pattern(regexp = "\\d{11}") String telefone,
    @NotBlank @Pattern(regexp = "\\d{14}") String cnpj,
    byte[] foto, 
    @NotNull @Valid DadosEnderecoUsuario endereco
){}
