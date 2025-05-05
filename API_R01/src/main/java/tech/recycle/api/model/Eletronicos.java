package tech.recycle.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "Eletronicos")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Eletronicos {
    
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

    private String nome;

    private Integer valor_pontos;

    public Eletronicos(String nome, Integer valor_pontos){
        this.nome = nome;
        this.valor_pontos = valor_pontos;
    }
}
