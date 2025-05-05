package tech.recycle.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import tech.recycle.api.dto.DadosCadastroPromocao;
import tech.recycle.api.dto.DadosEstatisticasGraficoLoja;
import tech.recycle.api.dto.DadosEstatisticasVendasLoja;
import tech.recycle.api.dto.DadosListagemPromocao;
import tech.recycle.api.dto.DadosMinhasPromocoes;
import tech.recycle.api.model.Promocao;
import tech.recycle.api.repository.EmpresaRepository;
import tech.recycle.api.repository.PromocaoRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("promocao")
public class PromocaoController {

    @Autowired
    private PromocaoRepository repository;

    @Autowired
    private EmpresaRepository empresa_repo;

    @GetMapping
    public ResponseEntity<List<DadosListagemPromocao>> listaTodasPromocoes(){
        var page = repository.findAllPromocao();

        return ResponseEntity.status(200).body(page);
    }

    @GetMapping("buscaPorEmpresa/{id}")
    public ResponseEntity<List<DadosListagemPromocao>> listarPromocoesDaEmpresa
    (@PathVariable("id") Long id){
        var page = repository.findAllPromocaoByEmpresa(id);

        return ResponseEntity.status(200).body(page);
    }

    @GetMapping("buscaPorEmpresa/owner/{id}")
    public ResponseEntity<List<DadosMinhasPromocoes>> listarPromocoesDaEmpresaFull
    (@PathVariable("id") Long id){
        var page = repository.findAllPromocaoByEmpresaOwner(id);

        return ResponseEntity.status(200).body(page);
    }
    
    @GetMapping("vendasLoja/{id}")
    public ResponseEntity<List<DadosEstatisticasGraficoLoja>> getVendasUltimosSeisMeses
    (@PathVariable("id") Long id){
        var dados = repository.findVendasUltimosMeses(id);

        return ResponseEntity.status(202).body(dados);
    }

    @GetMapping("estatisticasLoja/{id}")
    public ResponseEntity<DadosEstatisticasVendasLoja> getEstatisticas
    (@PathVariable("id") Long id){
        var dados = repository.findEstatisticasLoja(id);

        return ResponseEntity.status(202).body(dados);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Promocao> cadastrarPromocao(@RequestBody @Valid DadosCadastroPromocao dados){
        var empresa = empresa_repo.findById(dados.empresa_id());

        if(empresa.isPresent()){
            Promocao promocao = new Promocao(dados.preco(), dados.descricao(), dados.data_criacao(), empresa.get());
            repository.save(promocao);
            return ResponseEntity.status(201).body(promocao);
        }
        
        return ResponseEntity.status(404).body(null);
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<String> excluirPromocao(@PathVariable("id") Long id){
        var promocao = repository.findById(id);

        if(promocao.isPresent()){
            repository.deleteById(id);
        }

        return ResponseEntity.status(201).body("Promocao Excluida Com Sucesso");
    }
}