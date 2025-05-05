package tech.recycle.api.dto;

import java.time.LocalDate;

public record DadosLancamentoPontos(
            Integer quant_pontos,
            Long empresa,
            Long usuario,
            LocalDate data_transacao
) {}
