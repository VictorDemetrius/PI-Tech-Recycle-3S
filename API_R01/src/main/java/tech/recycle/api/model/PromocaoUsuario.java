package tech.recycle.api.model;

import java.time.LocalDate;

import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedNativeQuery;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import tech.recycle.api.dto.DadosListagemPromoHistorico;

// Encontrando todas as promocoes do usuario ?1
@NamedNativeQuery(
    name = "findAllPromocoes",
    query = "SELECT pu.id, p.preco, p.descricao, pu.data_compra, p.empresa_id, pu.ativo "+
            "FROM promocao_usuario pu "+
            "INNER JOIN promocao p ON pu.promocao_id = p.id "+
            "WHERE pu.usuario_id = ?1 "+
            "ORDER BY ativo DESC",
    resultClass = DadosListagemPromoHistorico.class,
    resultSetMapping = "DadosListagemPromoHistorico_mapping"
)

// Encontrando todas as promocoes desativadas do usuario
@NamedNativeQuery(
    name = "findAllPromocoesDesativadas",
    query = "SELECT pu.id, p.preco, p.descricao, pu.data_compra, p.empresa_id, pu.ativo "+
            "FROM promocao_usuario pu "+
            "INNER JOIN promocao p ON pu.promocao_id = p.id "+
            "WHERE pu.usuario_id = ?1 AND pu.ativo = 0 "+
            "ORDER BY data_compra DESC",
    resultClass = DadosListagemPromoHistorico.class,
    resultSetMapping = "DadosListagemPromoHistorico_mapping"
)

// Encontrando todos as promocoes ativas do usuario ?1
@NamedNativeQuery(
    name = "findAllPromocoesAtivas",
    query = "SELECT pu.id, p.preco, p.descricao, pu.data_compra, p.empresa_id, pu.ativo "+
            "FROM promocao_usuario pu "+
            "INNER JOIN promocao p ON pu.promocao_id = p.id "+
            "WHERE pu.usuario_id = ?1 AND pu.ativo = 1 "+
            "ORDER BY data_compra DESC",
    resultClass = DadosListagemPromoHistorico.class,
    resultSetMapping = "DadosListagemPromoHistorico_mapping"
)

// mapeando pro DTO de listagem
@SqlResultSetMapping(
    name = "DadosListagemPromoHistorico_mapping",
    classes = {
        @ConstructorResult (
            targetClass = DadosListagemPromoHistorico.class,
            columns = {
                @ColumnResult(name = "id", type = Long.class),
                @ColumnResult(name = "preco", type = Integer.class),
                @ColumnResult(name = "descricao", type = String.class),
                @ColumnResult(name = "data_compra", type = LocalDate.class),
                @ColumnResult(name = "empresa_id", type = Long.class),
                @ColumnResult(name = "ativo", type = Boolean.class)
            }
        )

    }
)
@Table(name = "PromocaoUsuario")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PromocaoUsuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "promocao_id", nullable = false)
    private Promocao promocao;

    private LocalDate data_compra;

    private Boolean ativo;

    public PromocaoUsuario(Promocao promocao, 
                            Usuario usuario,
                            LocalDate data_compra){
        this.usuario = usuario;
        this.promocao = promocao;
        this.data_compra = data_compra;
        this.ativo = true;
    }

    public void DesativarPromocao(){
        this.ativo = false;
    }
}
