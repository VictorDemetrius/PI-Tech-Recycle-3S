package tech.recycle.api.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tech.recycle.api.model.Cooperativa;

@Repository
public interface CooperativaRepository extends JpaRepository<Cooperativa, Long> {
    
    Page<Cooperativa> findAllAllByAtivoTrue(Pageable paginacao);

    Page<Cooperativa> findAllAllByAtivoFalse(Pageable paginacao);

    @Query(value = "SELECT * FROM Cooperativa c WHERE c.email = ?1", nativeQuery = true)
    Optional<Cooperativa> findByEmail(String email);

    @Query(value = "SELECT * FROM Cooperativa c WHERE c.cnpj = ?1", nativeQuery = true)
    Optional<Cooperativa> findByCnpj(String cnpj);

    @Modifying
    @Query(value = "DELETE FROM Cooperativa WHERE id = ?1", nativeQuery = true)
    void apagarDoBanco(Long id);

}
