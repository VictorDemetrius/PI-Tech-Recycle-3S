package tech.recycle.api.model;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import tech.recycle.api.dto.DadosAtualizacaoCooperativa;
import tech.recycle.api.dto.DadosCadastroCooperativa;

@Entity
@Table(name = "Cooperativa")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Cooperativa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String telefone;
    private String cnpj;

    @Embedded
    private Endereco endereco;

    @Embedded
    private Credenciais credenciais;

    private boolean ativo;

    public Cooperativa(DadosCadastroCooperativa dados, Credenciais credenciais){
        this.ativo = true;
        this.nome = dados.nome();
        this.telefone = dados.telefone();
        this.cnpj = dados.cnpj();
        this.endereco = new Endereco(dados.endereco());
        this.credenciais = credenciais;
    }

    public void atualizarInformacoes(@Valid DadosAtualizacaoCooperativa dados){
        if(dados.nome() != null){
            this.nome = dados.nome();
        }
        if(dados.telefone() != null){
            this.telefone = dados.telefone();
        }   
        if(dados.cnpj() != null){
            this.cnpj = dados.cnpj();
        }
        
        this.endereco = new Endereco(dados.endereco());
        
    }

    public void excluirCooperativa(){
        this.ativo = false;
    }

    public void reativarCooperativa(){
        this.ativo = true;
    }
}
