CREATE TABLE Cargo (
    id_cargo INT PRIMARY KEY AUTO_INCREMENT,
    nome_cargo VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE Pessoa (
    id_pessoa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    id_cargo INT NOT NULL,
);

CREATE TABLE Aviso (
    id_aviso INT PRIMARY KEY AUTO_INCREMENT,
    id_pessoa_sindico INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL,
    data_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE Pet (
    id_pet INT PRIMARY KEY AUTO_INCREMENT,
    id_pessoa_morador INT NOT NULL,
    nome_pet VARCHAR(100) NOT NULL,
    especie VARCHAR(50),
    raca VARCHAR(50),
    cor VARCHAR(50),
    status ENUM('SEGURO', 'PERDIDO') NOT NULL DEFAULT 'SEGURO',
);

CREATE TABLE Encomenda (
    id_encomenda INT PRIMARY KEY AUTO_INCREMENT,
    id_unidade_destino INT NOT NULL,
    id_pessoa_funcionario INT NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    local_armazenamento VARCHAR(100),
    data_recebimento DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_retirada DATETIME NULL,
    status ENUM('AGUARDANDO', 'RETIRADO', 'AUTORIZADO_TERCEIRO') NOT NULL DEFAULT 'AGUARDANDO',
);

CREATE TABLE Visitante (
    id_visitante INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(255) NOT NULL,
    documento VARCHAR(50) UNIQUE,
    tipo ENUM('FAMILIAR', 'AMIGO', 'SERVICO', 'ENTREGA')
);
