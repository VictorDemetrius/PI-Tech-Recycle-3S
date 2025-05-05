package tech.recycle.api.dto;

import java.time.LocalDate;

public record DadosCompraPromocao(
    Long usuario,
    Long promocao,
    LocalDate data_compra
) 
{}
