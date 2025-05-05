package tech.recycle.api.dto;

import java.util.List;

import org.springframework.validation.FieldError;

public record DadosErroValidacao(String campo, List<String> mensagem) {
    public DadosErroValidacao(FieldError erro) {
        this(
                erro.getField(),
                List.of(erro.getDefaultMessage()));
    }
}
