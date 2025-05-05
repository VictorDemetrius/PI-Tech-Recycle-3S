package tech.recycle.api.repository;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import tech.recycle.api.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Page<Usuario> findAllAllByAtivoTrue(Pageable paginacao);

    UserDetails findByCredenciaisEmail(String email);

    boolean existsByCredenciaisEmail(String email);

    @Query(value = "SELECT * FROM usuarios c WHERE c.cpf = ?1", nativeQuery = true)
    Optional<Usuario> findByCpf(String cpf);

    @Query(value = "CALL PROC_FAZER_LOGIN(:param_email)", nativeQuery = true)
    Optional<Object> fazerLogin(@Param("param_email") String email);
}
