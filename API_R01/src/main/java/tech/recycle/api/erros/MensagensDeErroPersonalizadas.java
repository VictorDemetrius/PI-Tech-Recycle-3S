package tech.recycle.api.erros;

import java.util.HashMap;
import java.util.Map;

public class MensagensDeErroPersonalizadas {

    // declaração de uma variavel estatica MENSAGENS - Inalteravel apos sua
    // inicialização
    private static final Map<String, String> MENSAGENS = new HashMap<>();

    // bloco de inicialização estatica
    static {
        MENSAGENS.put("deve corresponder a \"\\d{11}\"",
                "A validação do CPF requer 11 dígitos numéricos, sem pontos ou traços seguindo o padrão 012345678-91");
        MENSAGENS.put("não deve estar em branco",
                "Este campo não pode estar em branco.");
        MENSAGENS.put("deve ser um endereço de e-mail bem formado",
                "O endereço de email deve ser válido.");
        MENSAGENS.put("deve corresponder a \"\\d{12}\"",
                "O telefone deve conter 11 dígitos númericos, sem pontos ou traços seguindo o padrão (00)123456789");
        MENSAGENS.put("must not be null", 
                "Este campo não pode ser nulo.");

    }

    // metodo de tradução das mensagens, se existir retorna a tradução caso
    // contrario retorna default
    public static String traducaoDasMensagens(String mensagem) {
        return MENSAGENS.getOrDefault(mensagem, mensagem);
    }
}
