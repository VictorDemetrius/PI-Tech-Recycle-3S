package tech.recycle.api.config.security;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import tech.recycle.api.model.Usuario;

import org.springframework.beans.factory.annotation.Value;

@Service
public class TokenService {

	@Value(value = "${api.security.token.secret}")
	private String token;

	public String gerarToken(Usuario usuario) {
		try {
			var algoritmo = Algorithm.HMAC256(token);

			return JWT.create()
					.withIssuer("tech.recycle")
					.withSubject(usuario.getCredenciais().getEmail())
					.sign(algoritmo);

		} catch (JWTCreationException e) {
			throw new RuntimeException("Erro ao gerar o token", e);
		}
	}

	public String validarToken(String tokenJwt) {
		try {
			var algoritmo = Algorithm.HMAC256(token);
			return JWT.require(algoritmo) 
					.withIssuer("tech.recycle") 
					.build()
					.verify(tokenJwt) 
					.getSubject(); 
		} catch (JWTVerificationException exception) {
			throw new RuntimeException("Token JWT inválido ou expirado!");
		}
	}
}
