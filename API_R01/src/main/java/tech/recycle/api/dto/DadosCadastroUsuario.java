package tech.recycle.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import tech.recycle.api.model.Credenciais;
import tech.recycle.api.model.Privilegio;

public record DadosCadastroUsuario(

                @NotBlank String nome,

                @NotBlank @Pattern(regexp = "\\d{11}") String telefone,

                @NotBlank @Pattern(regexp = "\\d{11}") String cpf,

                Privilegio privilegio,

                @NotNull @Valid Credenciais credenciais,

                @NotNull @Valid DadosEnderecoUsuario endereco) {

}
