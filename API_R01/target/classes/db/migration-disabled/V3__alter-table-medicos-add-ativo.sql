ALTER TABLE medicos ADD ativo tinyint NOT NULL;
UPDATE medicos SET ativo = 1;