package tech.recycle.api.dto;

import tech.recycle.api.model.Empresa;

public record DadosListagemEmpresa(
        Long id,
        byte[] foto,
        String estabelecimento,
        String segmento,
        String email,
        String cnpj) {

    public DadosListagemEmpresa(Empresa empresa) {
        this(
                empresa.getId(),
                empresa.getFoto(),
                empresa.getEstabelecimento(),
                empresa.getTipoEstabelecimento(),
                empresa.getCredenciais().getEmail(),
                empresa.getCnpj()
        );
    }

}
