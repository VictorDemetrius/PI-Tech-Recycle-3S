package tech.recycle.api.controller;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import jakarta.validation.Valid;
import tech.recycle.api.dto.DadosAtualizacaoCooperativa;
import tech.recycle.api.dto.DadosCadastroCooperativa;
import tech.recycle.api.dto.DadosListagemCooperativa;
import tech.recycle.api.model.Cooperativa;
import tech.recycle.api.model.Credenciais;
import tech.recycle.api.repository.CooperativaRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("cooperativa")
public class CooperativaController {
    
    @Autowired
    private CooperativaRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity<Cooperativa> cadastrarCooperativa(@RequestBody @Valid DadosCadastroCooperativa dados){
        String senhaCrypt = new BCryptPasswordEncoder().encode(dados.credenciais().getPassword());
        var credenciais = new Credenciais(dados.credenciais().getEmail(), senhaCrypt);

        var cooperativa = new Cooperativa(dados, credenciais);
        repository.save(cooperativa);
        return ResponseEntity.status(201).body(cooperativa);
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemCooperativa>> listarTodasCooperativas
    (@PageableDefault(size = 10, sort = {"id"}) Pageable paginacao){
        var page = repository.findAllAllByAtivoTrue(paginacao).map(DadosListagemCooperativa::new);
        return ResponseEntity.status(200).body(page);
    }

    @GetMapping("desativadas")
    public ResponseEntity<Page<DadosListagemCooperativa>> listarTodasCooperativasDesativadas
    (@PageableDefault(size = 10, sort = {"id"}) Pageable paginacao){
        var page = repository.findAllAllByAtivoFalse(paginacao).map(DadosListagemCooperativa::new);
        return ResponseEntity.status(200).body(page);
    }

    @GetMapping("{id}")
    public ResponseEntity<Cooperativa> acharCooperativaPorId(@PathVariable("id") Long id){
        var cooperativa = repository.findById(id);

        if(cooperativa.isPresent()){
            return ResponseEntity.status(200).body(cooperativa.get());
        }

        return ResponseEntity.status(200).body(null);
    }

    @GetMapping("email/{email}")
    public ResponseEntity acharCooperativaPorEmail(@PathVariable("email") String email ){
        Optional<Cooperativa> cooperativa = repository.findByEmail(email);

        if(cooperativa.isPresent()){
            return ResponseEntity.status(200).body(cooperativa.get());
        } else {
            HashMap<String, Boolean> disp = new HashMap<>();
            disp.put("disponivel", true);
            return ResponseEntity.status(200).body(disp);
        }  
    }

    @GetMapping("cnpj/{cnpj}")
    public ResponseEntity acharCooperativaPorCNPJ(@PathVariable("cnpj") String cnpj ){
        Optional<Cooperativa> cooperativa = repository.findByCnpj(cnpj);

        if(cooperativa.isPresent()){
            return ResponseEntity.status(200).body(cooperativa.get());
        } else {
            HashMap<String, Boolean> disp = new HashMap<>();
            disp.put("disponivel", true);
            return ResponseEntity.status(200).body(disp);
        }  
    }

    @PutMapping("{id}")
    @Transactional
    public ResponseEntity<Cooperativa> atualizarCooperativa(@RequestBody @Valid DadosAtualizacaoCooperativa dados){
        var cooperativa = repository.findById(dados.id());

        if(cooperativa.isPresent()){
            cooperativa.get().atualizarInformacoes(dados);
            return ResponseEntity.status(200).body(cooperativa.get());
        }
        

        return ResponseEntity.status(200).body(null);
    }

    @PutMapping("reativar/{id}")
    @Transactional
    public ResponseEntity<String> reativarCooperativa(@PathVariable("id") Long id){
        var cooperativa = repository.findById(id);

        if(cooperativa.isPresent()){
            cooperativa.get().reativarCooperativa();
        }
        

        return ResponseEntity.status(200).body("Cooperativa Reativada");
    }


    @DeleteMapping("{id}")
    @Transactional
    public ResponseEntity<String> excluirCooperativa(@PathVariable("id") Long id){
        var cooperativa = repository.findById(id);

        if(cooperativa.isPresent()){
            cooperativa.get().excluirCooperativa();
        }

        return ResponseEntity.status(200).body("Cooperativa desativada");
    }

    @DeleteMapping("apagar/{id}")
    @Transactional
    public ResponseEntity<String> apagarCooperativa(@PathVariable("id") Long id){
        var cooperativa = repository.findById(id);
        
        if(cooperativa.isPresent()){
            repository.apagarDoBanco(id);
        }

        return ResponseEntity.status(200).body("Cooperativa removida do banco");
    }
}
