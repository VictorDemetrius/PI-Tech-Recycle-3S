package tech.recycle.api.model;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tech.recycle.api.dto.DadosAtualizacaoEmpresa;
import tech.recycle.api.dto.DadosCadastroEmpresa;

@Table(name="Empresa")
@Entity
@EqualsAndHashCode(of = "id")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Empresa {

	@Id
	@GeneratedValue (strategy=GenerationType.IDENTITY)
	private long id;
	private String estabelecimento;
	private String tipoEstabelecimento;
	private String cnpj;
    private String telefone;
	private boolean ativo;
 
    @Column(name="foto", length=1000000)
	private byte[] foto;

    @Embedded
    private Endereco endereco;

    @Embedded
    private Credenciais credenciais;

    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Promocao> listaPromocoes;

    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Pontos> listaPontosConcedidos;
    
    public Empresa(DadosCadastroEmpresa dados, Credenciais credenciais){
        this.ativo = true;
        this.estabelecimento = dados.estabelecimento();
        this.tipoEstabelecimento = dados.tipoEstabelecimento();
        this.cnpj = dados.cnpj();
        this.telefone = dados.telefone();
        this.foto = dados.foto();
        this.endereco = new Endereco(dados.endereco());
        this.credenciais = credenciais;
    }

    public void atualizarEmpresa(DadosAtualizacaoEmpresa dados){
        if(dados.estabelecimento() != null){
            this.estabelecimento = dados.estabelecimento();
        }
        if(dados.tipoEstabelecimento() != null){
            this.tipoEstabelecimento = dados.tipoEstabelecimento();
        }
        if(dados.cnpj() != null){
            this.cnpj = dados.cnpj();
        }
        if(dados.telefone() != null){
            this.telefone = dados.telefone();
        }
        if(dados.foto() != null){
            this.foto = dados.foto();
        }
        if(dados.endereco() != null){
            this.endereco = new Endereco(dados.endereco());
        }
    }

    public void excluirEmpresa(){
        this.ativo = false;
    }
}

    
