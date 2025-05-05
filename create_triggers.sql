DELIMITER $

CREATE TRIGGER trigger_lancamento_pontos AFTER INSERT
ON Pontos
FOR EACH ROW
BEGIN
	UPDATE usuarios 
    SET quant_pontos = quant_pontos + NEW.quant_pontos 
    WHERE id = NEW.usuario_id;
END $

DELIMITER ;