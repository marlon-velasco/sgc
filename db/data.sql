/*
 * SGC (Sistema de Gerenciamento de Condomínio)
 * Script DML (Data Manipulation Language)
 */

-- 1. INSERÇÃO DE DADOS (POPULAÇÃO)

-- Cargos Essenciais
INSERT INTO Cargo (nome_cargo, descricao) VALUES
('Síndico', 'Responsável legal e administrativo pelo condomínio'),
('Morador', 'Residente ou proprietário de uma unidade'),
('Funcionário', 'Funcionário da portaria ou segurança');


-- Unidades
INSERT INTO Unidade (bloco, numero_apto) VALUES
('A', '101'),
('A', '102'),
('B', '101');


-- Pessoas (Senhas seriam HASHES, ex: 'senha123')
INSERT INTO Pessoa (nome, email, senha, id_cargo) VALUES
('João Silva', 'joao.silva@email.com', 'senha123', (SELECT id_cargo FROM Cargo WHERE nome_cargo = 'Morador')),
('Maria Souza', 'maria.souza@email.com', 'senha123', (SELECT id_cargo FROM Cargo WHERE nome_cargo = 'Síndico')),
('Carlos Portaria', 'carlos.portaria@email.com', 'senha123', (SELECT id_cargo FROM Cargo WHERE nome_cargo = 'Funcionário'));


-- IDs Padrão (para facilitar os exemplos)
SET @ID_MORADOR_JOAO = (SELECT id_pessoa FROM Pessoa WHERE email = 'joao.silva@email.com');
SET @ID_SINDICO_MARIA = (SELECT id_pessoa FROM Pessoa WHERE email = 'maria.souza@email.com');
SET @ID_FUNC_CARLOS = (SELECT id_pessoa FROM Pessoa WHERE email = 'carlos.portaria@email.com');
SET @ID_UNIDADE_A101 = (SELECT id_unidade FROM Unidade WHERE bloco = 'A' AND numero_apto = '101');


-- Associar Morador à Unidade (Resolvendo 1NF)
INSERT INTO MoradorUnidade (id_pessoa, id_unidade) VALUES
(@ID_MORADOR_JOAO, @ID_UNIDADE_A101);


-- Síndico publica um aviso
INSERT INTO Aviso (id_pessoa_sindico, titulo, mensagem) VALUES
(@ID_SINDICO_MARIA, 'Manutenção do Elevador', 'O elevador do Bloco A ficará em manutenção no dia 20/11.');


-- Morador cadastra um Pet
INSERT INTO Pet (id_pessoa_morador, nome_pet, especie, raca, cor, status) VALUES
(@ID_MORADOR_JOAO, 'Rex', 'Cachorro', 'Labrador', 'Dourado', 'SEGURO');


-- Funcionário registra uma encomenda
INSERT INTO Encomenda (id_unidade_destino, id_pessoa_funcionario, descricao, status) VALUES
(@ID_UNIDADE_A101, @ID_FUNC_CARLOS, 'Pacote Amazon (Livros)', 'AGUARDANDO');


-- Cadastro de um Visitante
INSERT INTO Visitante (nome_completo, documento, tipo) VALUES
('Pedro Alves', '123.456.789-00', 'SERVICO');
SET @ID_VISITANTE_PEDRO = (SELECT id_visitante FROM Visitante WHERE documento = '123.456.789-00');


-- Funcionário registra a entrada do visitante
INSERT INTO RegistroEntrada (id_visitante, id_unidade_visitada, id_pessoa_funcionario) VALUES
(@ID_VISITANTE_PEDRO, @ID_UNIDADE_A101, @ID_FUNC_CARLOS);