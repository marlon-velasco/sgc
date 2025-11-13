# Análise de Engenharia de Software Moderna

Eu tive a ideia de fazer este documento para evidenciar que sabemos que nem tudo está perfeitamente alinhado com os princípios da Engenharia de Software Moderna, conforme descritos por Marco Tulio Valente, porém sabemos que muito desses princípios podem ser aplicados e evidenciados no projeto `Sistema de Gerenciamento de Condomínio (SGC)`.

Atualmente, temos um **protótipo de alta fidelidade** (HTML/CSS/JS) focado na validação da interface e da experiência do usuário (UX), o que já é alguma coisa. A ideia agora é "profissionalizar" esse protótipo usando as bases da ESM.

### 1. Princípio: Desenvolvimento Ágil e MVP (Produto Mínimo Viável)

O que Valente enfatiza é a entrega de valor contínua e a construção incremental.

-   **Evidência Atual (O que fizemos):** Nós não tentamos construir o app inteiro de uma vez. Começamos com o `login.html`, depois `dashboard.html`, e posteriormente vamos iterar o restante dos módulos... módulo por módulo... (`pets`, `panico`, etc.). Isso _é_ desenvolvimento iterativo!
    
-   **Como Evidenciar Melhor:**
    
    -   **Versionamento (Git):** O primeiro passo absoluto é colocar este projeto em um repositório Git.
        
    -   **Commits Semânticos:** Evidencie o processo ágil na forma como você salva seu progresso. Em vez de "Atualizações", use commits que contam a história da iteração:
        
        -   `feat(auth): implementa tela de login (login.html)`
            
        -   `feat(nav): adiciona barra de navegação principal (dashboard.html)`
            
        -   `feat(panico): implementa lógica de hold-to-press (panico.html)`
            
        -   `refactor(pets): separa lógica de 'Meus Pets' e 'Perdidos' em abas`
            

### 2. Princípio: Clean Code e Design (Manutenibilidade)

O código não é só para o computador, é para outros desenvolvedores (ou eu mesmo, daqui a 6 meses).

-   **Evidência Atual (Pontos Positivos):**
    
    -   **Nomenclatura Clara:** Estamos usando IDs claros como `panicButton`, `closeModalButton`, `petRegistrationForm`. Isso é muito bom para a legibilidade.
        
-   **Como Melhorar (O Próximo Passo):**
    
    -   **Violação de DRY (Don't Repeat Yourself):** Este é o ponto mais crítico no código atual. O `<footer>` (barra de navegação) e o `<header>` estão **copiados e colados** em 6 arquivos diferentes (`dashboard.html`, `panico.html`, `pets.html`, etc.).
        
    -   **Solução (O Caminho da ESM):** Isso é um sinal claro de que o protótipo precisa evoluir para uma arquitetura baseada em **componentes**. Ferramentas como React, Vue ou Angular foram criadas para resolver _exatamente_ este problema. Daria para ter um componente `NavBar.jsx` que seria importado em todas as páginas, em vez de copiado.
        
    -   **Evidência (Tipo, agora mesmo!):** Adicione comentários que evidenciem essa dívida técnica:
        
        ```
        <!-- ... no panico.html ... -->
        <!-- Barra de Navegação Inferior Fixa (Implementação Krug: Acesso Rápido) -->
        <!-- TODO(ESM): Componentizar este footer para evitar duplicação (DRY) -->
        <footer class="fixed bottom-0 ...">
            ...
        </footer>
        
        ```
        
### 3. Princípio: DevOps e CI/CD (Produtividade)

A Engenharia de Software Moderna se baseia em automação para reduzir o atrito entre o desenvolvimento e a produção.

-   **Como Evidenciar (O Próximo Passo):**
    
    -   **CI (Continuous Integration):** Configurar o **GitHub Actions** (ou similar) no repositório Git.
        
    -   **O que o CI faria:** A cada `git push`, o servidor de CI iria automaticamente:
        
        1.  Baixar o código.
            
        2.  Rodar um **Linter** (como o ESLint) para garantir que o _Clean Code_ está sendo seguido.
            
        3.  Rodar os **Testes de Unidade**.
            
    -   **CD (Continuous Deployment):** Se os testes passarem na branch `main`, a Action pode automaticamente fazer o deploy do protótipo (ex: para o GitHub Pages), garantindo que a versão online esteja sempre atualizada e testada.