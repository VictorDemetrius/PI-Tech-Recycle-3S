package tech.recycle.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tech.recycle.api.dto.DadosCompraPromocao;
import tech.recycle.api.dto.DadosListagemPromoHistorico;
import tech.recycle.api.model.PromocaoUsuario;
import tech.recycle.api.repository.PromocaoRepository;
import tech.recycle.api.repository.PromocaoUsuarioRepository;
import tech.recycle.api.repository.UsuarioRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("promosAtivas")
public class PromocaoUsuarioController {
    
    @Autowired
    private PromocaoUsuarioRepository repository;

    @Autowired
    private PromocaoRepository promocao_repo;

    @Autowired
    private UsuarioRepository usuario_repo;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<Page<DadosListagemPromoHistorico>> listarPromosAtivas
    (@PageableDefault(size = 10, sort = {"id"}) Pageable paginacao){
        var page = repository.findAllPromocoes(paginacao);

        return ResponseEntity.status(200).body(page);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<String> comprarPromocao(@RequestBody DadosCompraPromocao dto){
        var promocao = promocao_repo.findById(dto.promocao());
        var usuario = usuario_repo.findById(dto.usuario());

        if(promocao.isPresent() && usuario.isPresent()){
            PromocaoUsuario promo = new PromocaoUsuario(promocao.get(),
                                                        usuario.get(),
                                                        dto.data_compra());

            repository.save(promo);
            return ResponseEntity.status(200).body("Compra da Promoção efetuada com sucesso");
        }

        return ResponseEntity.status(404).body("Erro ao localizar Promoção ou Usuario");
    }
}
