package tech.recycle.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.recycle.api.model.Usuario;
import tech.recycle.api.repository.UsuarioRepository;
import jakarta.validation.Valid;
import tech.recycle.api.dto.DadosCredenciaisUsuario;
import tech.recycle.api.dto.DadosTokenJWT;
import tech.recycle.api.config.security.TokenService;

//@CrossOrigin(origins = { "http://localhost:5501" })
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("auth")
public class AutenticacaoController {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<?> efetuarLogin(@RequestBody @Valid DadosCredenciaisUsuario dados) {

        var authenticationToken = new UsernamePasswordAuthenticationToken(dados.email(), dados.password());
        var authentication = this.manager.authenticate(authenticationToken);
        var tokenJWT = tokenService.gerarToken((Usuario) authentication.getPrincipal());

        return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));
    }

    @CrossOrigin
    @GetMapping("/login/{email}")
    public ResponseEntity<?> efetuarLoginGuardarDados(@PathVariable("email") String email) {
        var dados = repository.fazerLogin(email);

        if(dados.isPresent()){
            return ResponseEntity.status(200).body(dados);
        } else {
            return ResponseEntity.status(404).body(null);
        }

    }
}
