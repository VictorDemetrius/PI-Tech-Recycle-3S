package tech.recycle.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import tech.recycle.api.model.Credenciais;

public record DadosCadastroEmpresa(
        @NotBlank String estabelecimento, 
        
        @NotBlank String tipoEstabelecimento, 
        
        @NotBlank @Pattern(regexp = "\\d{14}") String cnpj, 
                            
        @NotBlank @Pattern(regexp = "\\d{11}") String telefone, 

        byte[] foto,
                            
        @Valid DadosEnderecoUsuario endereco,

        @Valid Credenciais credenciais
) {
    
}