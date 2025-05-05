package tech.recycle.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor

public class Credenciais {

    private String email;
    private String password;

    public Credenciais(String email, String senhaCrypt) {
        this.email = email;
        this.password = senhaCrypt;

    }

    public void atualizarEmail(String email) {
        if (email != null) {
            this.email = email;
        }
    }

    public void atualizarPassword(String senhaCrypt) {
        if (senhaCrypt != null) {
            this.password = senhaCrypt;
        }
    }

}