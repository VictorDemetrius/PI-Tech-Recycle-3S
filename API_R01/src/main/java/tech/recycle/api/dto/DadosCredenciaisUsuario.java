package tech.recycle.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record DadosCredenciaisUsuario(
        @NotBlank @Email String email,
        @NotBlank @Pattern(regexp = ".{8,64}$") String password) {
}