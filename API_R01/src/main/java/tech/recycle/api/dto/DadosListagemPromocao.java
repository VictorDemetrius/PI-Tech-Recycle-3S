package tech.recycle.api.dto;



public interface DadosListagemPromocao{
    Long getId();
    Integer getPreco();
    String getDescricao();
    String getNome_empresa();
    byte[] getFoto();
}