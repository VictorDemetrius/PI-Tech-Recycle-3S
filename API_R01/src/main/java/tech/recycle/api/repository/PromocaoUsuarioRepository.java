package tech.recycle.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import tech.recycle.api.dto.DadosListagemPromoHistorico;
import tech.recycle.api.model.PromocaoUsuario;

public interface PromocaoUsuarioRepository extends JpaRepository<PromocaoUsuario, Long>{
    
    @Query(nativeQuery = true, name = "findAllPromocoes")
    Page<DadosListagemPromoHistorico> findAllPromocoes(Pageable pageable);

    @Query(nativeQuery = true, name = "findAllPromocoesAtivas")
    Page<DadosListagemPromoHistorico> findAllPromocoesAtivas(Pageable pageable);

    @Query(nativeQuery = true, name = "findAllPromocoesDesativadas")
    Page<DadosListagemPromoHistorico> findAllPromocoesDesativadas(Pageable pageable);

}
