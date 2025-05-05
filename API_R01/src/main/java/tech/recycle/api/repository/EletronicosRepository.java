package tech.recycle.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import tech.recycle.api.model.Eletronicos;

public interface EletronicosRepository extends JpaRepository<Eletronicos, Long>{
    
    @Query(value = "SELECT * FROM Eletronicos e ORDER BY e.nome", nativeQuery = true)
    List<Eletronicos> findAll();
}
