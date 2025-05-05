package tech.recycle.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tech.recycle.api.dto.DadosLancamentoPontos;
import tech.recycle.api.model.Pontos;
import tech.recycle.api.repository.EmpresaRepository;
import tech.recycle.api.repository.PontosRepository;
import tech.recycle.api.repository.UsuarioRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("pontos")
public class PontosController {
    
    @Autowired
    private PontosRepository repository;

    @Autowired
    private EmpresaRepository empresa_repo;

    @Autowired
    private UsuarioRepository usuario_repo;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<String> lancarPontos(@RequestBody DadosLancamentoPontos dto){
        var usuario = usuario_repo.findById(dto.usuario());
        var empresa = empresa_repo.findById(dto.empresa());

        if(usuario.isPresent() && empresa.isPresent()){
            Pontos pontos = new Pontos(dto.quant_pontos(), 
                                        empresa.get(),
                                        usuario.get(), 
                                        dto.data_transacao());
            repository.save(pontos);
            return ResponseEntity.status(200).body("Pontos salvos com sucesso");
        }
        
        return ResponseEntity.status(404).body("Erro ao localizar Empresa ou Usuário");
    }
}
