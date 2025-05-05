package tech.recycle.api.model;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import tech.recycle.api.dto.DadosAtualizacaoUsuario;
import tech.recycle.api.dto.DadosAtualizaçãoCredenciais;
import tech.recycle.api.dto.DadosCadastroUsuario;

@Table(name = "usuarios")
@Entity(name = "Usuario")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String telefone;
    private String cpf;

    @Enumerated(EnumType.STRING)
    // @EnumValidator(enumClass = Privilegio.class, message =
    // "{user.privilege.invalid}")
    private Privilegio privilegio;

    @Embedded
    private Endereco endereco;

    @Embedded
    private Credenciais credenciais;

    private boolean ativo;

    private Integer quant_pontos;

    // chave estrangeira Pontos
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Pontos> listaPontosRecebidos;

    // chave estrangeira PromocaoUsuario
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PromocaoUsuario> listaPromocoesCompradas;

    public Usuario(DadosCadastroUsuario dados, Credenciais credenciais) {
        this.ativo = true;
        this.nome = dados.nome();
        this.telefone = dados.telefone();
        this.cpf = dados.cpf();
        this.privilegio = dados.privilegio() != null ? dados.privilegio() : Privilegio.USUARIO;
        this.credenciais = credenciais;
        this.endereco = new Endereco(dados.endereco());
    }


    public void atualizarInformacoes(@Valid DadosAtualizacaoUsuario dados) {
        if (dados.nome() != null) {
            this.nome = dados.nome();
        }
        if (dados.telefone() != null) {
            this.telefone = dados.telefone();
        }
        if (dados.cpf() != null) {
            this.cpf = dados.cpf();
        }
        if (dados.privilegio() != null) {
            this.privilegio = dados.privilegio();
        }
        if (dados.endereco() != null) {
            this.endereco.atualizarInformacoes(dados.endereco());
        }
    }

    public void atualizarCredenciais(@Valid DadosAtualizaçãoCredenciais dados) {
        if (dados.email() != null) {
            this.credenciais.atualizarEmail(dados.email());
            ;
        }
        if (dados.senhaCrypt() != null) {
            this.credenciais.atualizarPassword(dados.senhaCrypt());
        }
    }

    public void excluirUsuario() {
        this.ativo = false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
                new SimpleGrantedAuthority("USUARIO"),
                new SimpleGrantedAuthority("FUNC_LOJA"),
                new SimpleGrantedAuthority("ADMIN"));
    }

    @Override
    public String getPassword() {
        return this.credenciais.getPassword();
    }

    @Override
    public String getUsername() {
        return this.credenciais.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
