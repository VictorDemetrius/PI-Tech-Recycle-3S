package tech.recycle.api.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import tech.recycle.api.model.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    Page<Empresa> findAllAllByAtivoTrue(Pageable paginacao);

    @Query(value = "SELECT * FROM Empresa e WHERE e.email = ?1", nativeQuery = true)
    Optional<Empresa> findByEmail(String email);

    @Query(value = "SELECT * FROM Empresa e WHERE e.cnpj = ?1", nativeQuery = true)
    Optional<Empresa> findByCnpj(String cnpj);
}
