
# SGC: Sistema de Gerenciamento de Condomínio

Este repositório contém o protótipo de alta fidelidade do aplicativo de gerenciamento de condomínios, o `SGC`. O objetivo deste projeto é validar a experiência do usuário (UX) e o fluxo de navegação das principais funcionalidades do sistema antes da implementação do _backend_ e da migração para uma arquitetura de _frontend_ robusta como React ou Flutter (ainda em discussão).

Este protótipo foi desenvolvido como um projeto de extensão acadêmica, com o intuíto de atender às necessidades da comunidade do condomínio CH7, com o foco na aplicação de princípios de **Engenharia de Software Moderna** (conforme Marco Tulio Valente) e **Design Centrado no Usuário** (conforme Steve Krug e Donald A. Norman).

## 🚀 Como Visualizar o Protótipo

Como este é um protótipo de _frontend_ puro, não há necessidade de instalação de dependências ou de um servidor.

1.  Clone este repositório:
    
    ```
    git clone https://github.com/marlon-velasco/sgc.git
    
    ```
    
2.  Navegue até a pasta do projeto e abra o arquivo `login.html` ou `dashboard.html` diretamente no seu navegador.
    
3.  **(Recomendado)** Para uma melhor visualização do projeto, abra as "Ferramentas de Desenvolvedor" do seu navegador (F12) e ative o "Modo de Visualização de Dispositivo" (Ctrl+Shift+M) para simular um _smartphone_.
    

## 🛠️ Tecnologias Utilizadas

-   **HTML5 Semântico:** Estruturação do conteúdo.
    
-   **Tailwind CSS:** Utilizado para a prototipação rápida da UI. A escolha se deu pela agilidade de construir interfaces complexas e responsivas diretamente no HTML, alinhando-se aos princípios ágeis de entrega rápida de valor visual.
    
-   **JavaScript (ES6+):** Utilizado para simular a interatividade, o gerenciamento de estado local (como modais, abas e status de botões) e a navegação entre as páginas.
    

## 🌟 Funcionalidades Implementadas (Protótipos)

O protótipo atual simula o fluxo das seguintes funcionalidades:

-   `login.html`: Tela de autenticação com feedback visual (mostrar/ocultar senha) e redirecionamento.
    
-   `dashboard.html`: Hub central do aplicativo, apresentando os módulos e a barra de navegação principal.
    
-   `panico.html`: Módulo de emergência com lógica de "pressionar e segurar" para evitar acionamentos acidentais.
    
-   `cadastro-pets.html`: Simulação de um CRUD de pets, com separação por abas (Meus Pets vs. Perdidos) e modais de cadastro e confirmação.
    
-   `quadro-avisos.html`, `encomendas.html`, `visitantes.html`: _Stubs_ (esboços) das páginas de funcionalidades, já integrados à navegação principal.
    

## 🧠 Princípios de Design e Engenharia Aplicados

A idéia central deste projeto foi demonstrar a aplicação de teorias modernas de software no desenvolvimento de um produto.

### 1. Design Centrado no Usuário (Krug & Norman)

Seguimos dois princípios fundamentais da usabilidade para garantir que a interface seja intuitiva:

-   **"Não me Faça Pensar" (Steve Krug):** A interface foi projetada para ser óbvia. A barra de navegação inferior (`<footer>`) oferece acesso persistente às funções-chave, e a hierarquia visual (títulos grandes, botões de ação claros) guia o usuário sem exigir esforço cognitivo.
    
-   **"O Design do Dia a Dia" (Donald A. Norman):** Aplicamos conceitos de _Feedback_, _Affordance_ e _Constraints_.
    
    -   **Exemplo Prático (panico.html):** O botão de pânico não é um simples clique (o que seria perigoso). Ele utiliza um _Constraint_ (restrição) ao exigir que o usuário **pressione e segure por 3 segundos**. Durante esse tempo, o sistema fornece _Feedback_ visual imediato através do círculo de progresso, comunicando claramente o que está acontecendo e prevenindo o acionamento acidental.
        

### 2. Engenharia de Software Moderna (Marco Tulio Valente)

Este protótipo foi guiado pelos princípios da ESM, focando na agilidade e na manutenibilidade futura.

-   **Desenvolvimento Iterativo e Ágil:** O projeto foi construído incrementalmente, módulo por módulo (`login` -> `dashboard` -> `pets`...). Isso permitiu a validação de cada fluxo de forma isolada, em "pequenos lotes", exatamente como Valente recomenda.
    
-   **Gestão de Dívida Técnica:** Estamos cientes das dívidas técnicas inerentes a um protótipo de HTML puro. O `README.md` (este documento) e a [Análise de ESM](https://engsoftmoderna.info/ "null") servem como artefatos que registram essas dívidas.
    
-   **Testabilidade (Desacoplamento):** Onde foi possível, utilizamos o JavaScript estruturado para separar a _lógica de UI_ (manipulação do DOM) da _lógica de negócio_ (o que deve acontecer). Um exemplo é a estruturação dos _event listeners_, que chamam funções de _handler_ (`handleConfirmarAlerta`), em vez de conter a lógica diretamente no _callback_.
    

## 📈 Próximos Passos e Dívidas Técnicas Identificadas

Este protótipo validou a UX, mas não é a arquitetura final. O próximo passo é a "profissionalização" do código, que envolve:

1.  **Violação de DRY (Don't Repeat Yourself):** A dívida técnica mais evidente é a **duplicação da barra de navegação (`<footer>`)** em todos os arquivos HTML.
    
2.  **Solução (Migração):** O próximo passo é migrar este protótipo para uma arquitetura baseada em **Componentes** como por exemplo o React. Isso resolveria o problema de DRY, centralizando a navegação em um único arquivo (`NavBar.jsx`, por exemplo).
    
3.  **Refatoração do JavaScript:** Separar formalmente a lógica de negócio (ex: `apiService.js`, `authService.js`) da lógica de visualização (que ficaria nos componentes), conforme detalhado anteriormente em testabilidade.