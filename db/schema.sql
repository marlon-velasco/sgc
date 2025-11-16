/*
 * SGC (Sistema de Gerenciamento de Condomínio)
 * Script DDL (Data Definition Language)
 */


-- Tabela para Cargos/Papéis (Resolve a herança da classe Pessoa)
CREATE TABLE Cargo (
    id_cargo INT PRIMARY KEY AUTO_INCREMENT,
    nome_cargo VARCHAR(50) NOT NULL UNIQUE, -- Ex: 'Síndico', 'Morador', 'Funcionário'
    descricao TEXT
);


-- Tabela Central de Pessoas (Implementação da Superclasse Pessoa)
CREATE TABLE Pessoa (
    id_pessoa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    id_cargo INT NOT NULL,
   
    FOREIGN KEY (id_cargo) REFERENCES Cargo(id_cargo)
);


-- Tabela de Unidades (Apartamentos)
-- Criada para resolver a 1NF (atributo 'unidade' não atômico da classe Pessoa)
CREATE TABLE Unidade (
    id_unidade INT PRIMARY KEY AUTO_INCREMENT,
    bloco VARCHAR(10) NOT NULL,
    numero_apto VARCHAR(10) NOT NULL,
   
    UNIQUE(bloco, numero_apto) -- Não podem existir duas unidades 'A-101'
);


-- Tabela de Ligação Morador <-> Unidade
-- Resolve a 1NF (grupos de repetição) e permite N-N (Morador pode ter 2 ou + aptos)
CREATE TABLE MoradorUnidade (
    id_pessoa INT NOT NULL,
    id_unidade INT NOT NULL,
   
    PRIMARY KEY (id_pessoa, id_unidade), -- Chave primária composta
    FOREIGN KEY (id_pessoa) REFERENCES Pessoa(id_pessoa),
    FOREIGN KEY (id_unidade) REFERENCES Unidade(id_unidade)
);


-- Tabela de Avisos (Relacionada ao Síndico)
CREATE TABLE Aviso (
    id_aviso INT PRIMARY KEY AUTO_INCREMENT,
    id_pessoa_sindico INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL,
    data_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP,
   
    -- Garante que o publicador tenha o cargo de 'Síndico' (Regra de Negócio)
    FOREIGN KEY (id_pessoa_sindico) REFERENCES Pessoa(id_pessoa)
);


-- Tabela de Pets (Relacionada ao Morador)
CREATE TABLE Pet (
    id_pet INT PRIMARY KEY AUTO_INCREMENT,
    id_pessoa_morador INT NOT NULL,
    nome_pet VARCHAR(100) NOT NULL,
    especie VARCHAR(50), -- Ex: 'Cachorro', 'Gato'
    raca VARCHAR(50),
    cor VARCHAR(50),
    status ENUM('SEGURO', 'PERDIDO') NOT NULL DEFAULT 'SEGURO',
   
    FOREIGN KEY (id_pessoa_morador) REFERENCES Pessoa(id_pessoa)
);


-- Tabela de Alertas de Pânico (Relacionada ao Morador)
CREATE TABLE AlertaPanico (
    id_alerta INT PRIMARY KEY AUTO_INCREMENT,
    id_pessoa_morador INT NOT NULL,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ATIVO', 'ENCERRADO') NOT NULL DEFAULT 'ATIVO',
   
    FOREIGN KEY (id_pessoa_morador) REFERENCES Pessoa(id_pessoa)
);


-- Tabela de Encomendas (Relacionada à Unidade e ao Funcionário)
CREATE TABLE Encomenda (
    id_encomenda INT PRIMARY KEY AUTO_INCREMENT,
    id_unidade_destino INT NOT NULL,
    id_pessoa_funcionario INT NOT NULL, -- Funcionário que registrou
    descricao VARCHAR(255) NOT NULL,
    local_armazenamento VARCHAR(100),
    data_recebimento DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_retirada DATETIME NULL,
    status ENUM('AGUARDANDO', 'RETIRADO', 'AUTORIZADO_TERCEIRO') NOT NULL DEFAULT 'AGUARDANDO',
   
    FOREIGN KEY (id_unidade_destino) REFERENCES Unidade(id_unidade),
    FOREIGN KEY (id_pessoa_funcionario) REFERENCES Pessoa(id_pessoa)
);


-- Tabela de Visitantes
CREATE TABLE Visitante (
    id_visitante INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(255) NOT NULL,
    documento VARCHAR(50) UNIQUE, -- RG ou CPF
    tipo ENUM('FAMILIAR', 'AMIGO', 'SERVICO', 'ENTREGA')
);


-- Tabela de Registro de Entradas (Resolve 3NF)
CREATE TABLE RegistroEntrada (
    id_registro INT PRIMARY KEY AUTO_INCREMENT,
    id_visitante INT NOT NULL,
    id_unidade_visitada INT NOT NULL,
    id_pessoa_funcionario INT NOT NULL, -- Funcionário que liberou a entrada
    data_hora_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_hora_saida DATETIME NULL,
   
    FOREIGN KEY (id_visitante) REFERENCES Visitante(id_visitante),
    FOREIGN KEY (id_unidade_visitada) REFERENCES Unidade(id_unidade),
    FOREIGN KEY (id_pessoa_funcionario) REFERENCES Pessoa(id_pessoa)
);
