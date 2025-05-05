package tech.recycle.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;

import tech.recycle.api.model.Eletronicos;
import tech.recycle.api.repository.EletronicosRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("eletronicos")
public class EletronicosController {
    
    @Autowired
    private EletronicosRepository repository;

    @GetMapping
    public ResponseEntity<List<Eletronicos>> listarTodosEletronicos(){
        List<Eletronicos> lista = repository.findAll();
        return ResponseEntity.status(200).body(lista);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Eletronicos> cadastrarEletronico(@RequestBody Eletronicos dados){
        repository.save(dados);
        return ResponseEntity.status(201).body(dados);
    }
}
