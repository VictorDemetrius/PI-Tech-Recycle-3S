package tech.recycle.api.erros;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.persistence.EntityNotFoundException;
import tech.recycle.api.dto.DadosErroValidacao;

@RestControllerAdvice
public class TratamentoDeErros {

    // metodo responsavel por retornar erros de pagina não encontrada
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> tratarErro404() {
        return ResponseEntity.notFound().build();
    }

    // Metodo responsavel por retornar os erros de validação dos campos
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<DadosErroValidacao>> tratarErro400(MethodArgumentNotValidException erro) {
        List<DadosErroValidacao> listaDeErros = new ArrayList<>();

        for (FieldError fieldError : erro.getFieldErrors()) {
            String mensagemPersonalizada = MensagensDeErroPersonalizadas
                    .traducaoDasMensagens(fieldError.getDefaultMessage());
            DadosErroValidacao erroValidacao = new DadosErroValidacao(fieldError.getField(),
                    List.of(mensagemPersonalizada));
            listaDeErros.add(erroValidacao);
        }
        return ResponseEntity.badRequest().body(listaDeErros);
    }
}
