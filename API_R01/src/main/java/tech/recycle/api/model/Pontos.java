package tech.recycle.api.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "Pontos")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Pontos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer quant_pontos;

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;    

    private LocalDate data_transacao;

    public Pontos(Integer quant_pontos,
                    Empresa empresa,
                    Usuario usuario,
                    LocalDate data){
        this.quant_pontos = quant_pontos;
        this.empresa = empresa;
        this.usuario = usuario;
        this.data_transacao = data;
    }
}
