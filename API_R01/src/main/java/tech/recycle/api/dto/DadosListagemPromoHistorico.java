package tech.recycle.api.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DadosListagemPromoHistorico {
    private Long id;
    private Integer preco;
    private String descricao;
    private LocalDate data_compra;
    private Long empresa_id;
    private Boolean ativo;
}
