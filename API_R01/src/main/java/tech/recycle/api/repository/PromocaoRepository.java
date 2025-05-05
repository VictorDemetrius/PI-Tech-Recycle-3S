package tech.recycle.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tech.recycle.api.dto.DadosListagemPromocao;
import tech.recycle.api.dto.DadosMinhasPromocoes;
import tech.recycle.api.model.Promocao;
import tech.recycle.api.dto.DadosEstatisticasGraficoLoja;
import tech.recycle.api.dto.DadosEstatisticasVendasLoja;


public interface PromocaoRepository extends JpaRepository<Promocao, Long>{

    @Query(value = "CALL PROC_BUSCAR_MINHAS_PROMOCOES(:param_id)", nativeQuery = true)
    List<DadosMinhasPromocoes> findAllPromocaoByEmpresaOwner(@Param("param_id") Long id);

    @Query(value = "CALL PROC_BUSCAR_PROMOCOES_POR_LOJA(:param_id)", nativeQuery = true)
    List<DadosListagemPromocao> findAllPromocaoByEmpresa(@Param("param_id") Long id);

    @Query(value = "CALL PROC_BUSCAR_PROMOCOES()", nativeQuery = true)
    List<DadosListagemPromocao> findAllPromocao();

    @Query(value = "CALL PROC_VENDAS_ULTIMOS_MESES(:param_id)", nativeQuery = true)
    List<DadosEstatisticasGraficoLoja> findVendasUltimosMeses(@Param("param_id") Long id);

    @Query(value = "CALL PROC_ESTATISTICAS_LOJA(:param_id)", nativeQuery = true)
    DadosEstatisticasVendasLoja findEstatisticasLoja(@Param("param_id") Long id);

    /**
     * 
     * O Retorno de uma procedure precisa ser mapeado, porem o JPA não consegue mapear para um classe;
     * Por isso, os DTOs precisam ser Interfaces, pois assim o JPA consegue criar automaticamente uma classe adequada para implementação;
     * 
     */
}