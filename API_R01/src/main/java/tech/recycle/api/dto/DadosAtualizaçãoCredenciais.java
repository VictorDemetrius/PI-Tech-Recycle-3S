package tech.recycle.api.dto;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizaçãoCredenciais(

                @NotNull Long id,
                String email,
                String senhaCrypt) {

}
