SELECT * FROM promocao;

-- BUSCAR TODAS AS PROMOÇÕES CADASTRADAS
DELIMITER $
CREATE PROCEDURE PROC_BUSCAR_PROMOCOES(
)
BEGIN
	SELECT p.id, p.preco, p.descricao, e.estabelecimento AS nome_empresa, e.foto 
	FROM Promocao p 
	INNER JOIN Empresa e 
	ON p.empresa_id = e.id 
	ORDER BY p.quant_vendidos DESC;
END $
DELIMITER ;

-- BUSCAR TODAS AS PROMOÇÕES DE UMA LOJA, PELO ID DA LOJA
DELIMITER $
CREATE PROCEDURE PROC_BUSCAR_PROMOCOES_POR_LOJA(
IN param_id BIGINT
)
BEGIN
	SELECT p.id, p.preco, p.descricao, e.estabelecimento AS nome_empresa, e.foto
	FROM Promocao p 
	INNER JOIN Empresa e 
	ON p.empresa_id = e.id 
	WHERE p.empresa_id = param_id
	ORDER BY p.quant_vendidos DESC;
END $
DELIMITER ;

-- (PARA A LOJA) Busca todas as promocoes da loja 
DELIMITER $
CREATE PROCEDURE PROC_BUSCAR_MINHAS_PROMOCOES(
IN param_id BIGINT
)
BEGIN
	SELECT id, DATE_FORMAT(data_criacao, "%d/%m/%Y") AS data_criacao, descricao, preco, quant_vendidos
    FROM promocao 
    WHERE empresa_id = param_id;
END $
DELIMITER ;
CALL PROC_BUSCAR_MINHAS_PROMOCOES(2);

-- BUSCAR TOTAL DE VENDAS POR MES NOS ULTIMOS 6 MESES, PELO ID DA LOJA
DELIMITER $
CREATE PROCEDURE PROC_VENDAS_ULTIMOS_MESES (
IN param_id bigint
)
BEGIN
	SELECT MONTH(data_criacao) as 'mes', SUM(quant_vendidos) as 'total_vendas' 
	FROM promocao 
	WHERE MONTH(data_criacao) > MONTH(DATE_SUB(current_date(), INTERVAL 6 MONTH)) AND empresa_id = param_id
	GROUP BY MONTH(data_criacao);
END $
DELIMITER ;

-- BUSCAR ESTATISTICAS DE VENDAS DE PROMOCOES DE UMA LOJA, PELO ID DA LOJA
DELIMITER $
CREATE PROCEDURE PROC_ESTATISTICAS_LOJA(
IN param_id BIGINT
)
BEGIN
	SELECT t1.quant_promocoes , t1.total_vendas , t2.vendas_mes_atual
	FROM (SELECT count(id) as quant_promocoes, sum(quant_vendidos) as total_vendas
			FROM promocao
			WHERE empresa_id = param_id) t1
	JOIN (SELECT sum(quant_vendidos) as vendas_mes_atual
			FROM promocao 
			WHERE empresa_id = param_id and MONTH(data_criacao) = MONTH(current_date())) t2;
END $
DELIMITER ;


/*************************************************************************/
/*************************************************************************/
/*************************************************************************/
/*************************************************************************/
/*************************************************************************/

DELIMITER $
CREATE PROCEDURE PROC_FAZER_LOGIN(
IN param_email varchar(255)
)
BEGIN
	IF EXISTS (SELECT * FROM usuarios WHERE email = param_email) then
		SELECT ("usuario") AS tabela, usuarios.* FROM usuarios WHERE email = param_email;
	ELSEIF EXISTS (SELECT * FROM empresa WHERE email = param_email) then
		SELECT ("loja") AS tabela, empresa.*  FROM empresa WHERE email = param_email;
	ELSEIF EXISTS (SELECT * FROM cooperativa  WHERE email = param_email) then
		SELECT ("cooperativa") AS tipo, cooperativa.*  FROM cooperativa  WHERE email = param_email;
	END IF ;
END $
DELIMITER ;





