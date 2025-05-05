package tech.recycle.api.model;

import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tech.recycle.api.dto.DadosAtualizacaoPromocao;

@Table(name = "Promocao")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Promocao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer preco;
    private String descricao;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonProperty("data_criacao")
    @Column(nullable = false)
    private LocalDate data_criacao;

    private Integer quant_vendidos;

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    public Promocao(Integer preco, 
                    String descricao, 
                    LocalDate data_criacao,
                    Empresa empresa){
        this.preco = preco;
        this.descricao = descricao;
        this.data_criacao = data_criacao;
        this.quant_vendidos = 0;
        this.empresa = empresa;
    }

    // chave estrangeira PromocaoUsuario
    @OneToMany(mappedBy = "promocao", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PromocaoUsuario> listaUsuariosCompradores;

    public void atualizarPromocao(@Valid DadosAtualizacaoPromocao dados){
        if(dados.descricao() != null){
            this.descricao = dados.descricao();
        }
        if(dados.preco() != null){
            this.preco = dados.preco();
        }
        if(dados.data_criacao() != null){
            this.data_criacao = dados.data_criacao();
        }
    }
}
