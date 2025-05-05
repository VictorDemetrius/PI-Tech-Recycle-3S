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
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.validation.Valid;

import tech.recycle.api.dto.DadosCadastroUsuario;
import tech.recycle.api.dto.DadosCadastroUsuarioRetorno;
import tech.recycle.api.dto.DadosListagemUsuario;
import tech.recycle.api.dto.DadosAtualizacaoUsuario;
import tech.recycle.api.dto.DadosAtualizacaoUsuarioRetorno;
import tech.recycle.api.dto.DadosAtualizaçãoCredenciais;
import tech.recycle.api.model.Credenciais;
import tech.recycle.api.model.Usuario;
import tech.recycle.api.repository.UsuarioRepository;

@RestController
// @CrossOrigin(origins = { "http://localhost:5501" })
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity<?> cadastrar(@RequestBody @Valid DadosCadastroUsuario dados,
            UriComponentsBuilder uriBuilder) {

        String senhaCrypt = new BCryptPasswordEncoder().encode(dados.credenciais().getPassword());
        var credenciais = new Credenciais(dados.credenciais().getEmail(), senhaCrypt);
        var usuario = new Usuario(dados, credenciais);
        repository.save(usuario);

        var URI = uriBuilder.path("/usuario/{id}").buildAndExpand(usuario.getId()).toUri();

        return ResponseEntity.created(URI).body(new DadosCadastroUsuarioRetorno(usuario));
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemUsuario>> listar(
            @PageableDefault(size = 10, sort = { "id" }) Pageable paginacao) {
        var page = repository.findAllAllByAtivoTrue(paginacao).map(DadosListagemUsuario::new);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/porEmail/{email}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Boolean> acharUsuarioPorEmail(@PathVariable("email") String email) {
        boolean emailExiste = repository.existsByCredenciaisEmail(email);
        return ResponseEntity.ok(emailExiste);
    }

    @GetMapping("/usuarioPorEmail/{email}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<DadosAtualizacaoUsuarioRetorno> obterUsuarioPorEmail(@PathVariable("email") String email) {
        Usuario usuario = (Usuario) repository.findByCredenciaisEmail(email);
        DadosAtualizacaoUsuarioRetorno dados = new DadosAtualizacaoUsuarioRetorno(usuario);
        return ResponseEntity.ok(dados);
    }

    @GetMapping("/porCpf/{cpf}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> acharUsuarioPorCpf(@PathVariable("cpf") String cpf) {
        Optional<Usuario> usuario = repository.findByCpf(cpf);

        if (usuario.isPresent()) {
            return ResponseEntity.status(200).body(usuario.get());
        } else {
            HashMap<String, Boolean> disp = new HashMap<>();
            disp.put("disponivel", true);
            return ResponseEntity.status(200).body(disp);
        }
    }

    @GetMapping("/porId/{id}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> ExibirUsuarioPorId(@PathVariable Long id) {
        var usuario = repository.getReferenceById(id);
        return ResponseEntity.ok(new DadosAtualizacaoUsuarioRetorno(usuario));
    }

    @PutMapping
    @Transactional
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> atualizar(@RequestBody @Valid DadosAtualizacaoUsuario dados,
            DadosAtualizaçãoCredenciais dadosCredenciais) {

        var usuario = repository.getReferenceById(dados.id());
        usuario.atualizarInformacoes(dados);
        repository.save(usuario);

        return ResponseEntity.ok(new DadosAtualizacaoUsuarioRetorno(usuario));
    }

    @DeleteMapping("/{id}")
    @Transactional
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        var usuario = repository.getReferenceById(id);
        usuario.excluirUsuario();

        return ResponseEntity.noContent().build();
        // repository.deleteById(id);
    }
}
