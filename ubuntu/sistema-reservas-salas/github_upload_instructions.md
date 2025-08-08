# Instruções para Upload dos Projetos no GitHub

Este documento contém as instruções passo a passo para você fazer o upload dos projetos de Backend (Flask) e Frontend (React) para sua conta no GitHub.

## Opção 1: Criação Manual de Repositórios e Upload de Arquivos

Esta é a opção mais simples se você não tem familiaridade com comandos Git.

### Para o Backend (`banana-reservas-backend`):

1.  **Crie um novo repositório no GitHub:**
    *   Acesse [github.com/new](https://github.com/new).
    *   Dê o nome `******` ao repositório.
    *   Escolha se deseja que seja público ou privado.
    *   **Não** inicialize o repositório com README, .gitignore ou licença (faremos isso manualmente).
    *   Clique em "Create repository".

2.  **Baixe o projeto Backend:**
    *   Você já possui a pasta `*******` gerada por mim. Certifique-se de que ela está completa com todos os arquivos.

3.  **Faça o upload dos arquivos:**
    *   No seu novo repositório no GitHub, clique no botão "Add file" e depois em "Upload files".
    *   Arraste e solte **todo o conteúdo** da pasta `******` (incluindo subpastas como `src`, `venv`, `database`, `requirements.txt`, `README.md`, etc.) para a área de upload.
    *   Role para baixo e clique em "Commit changes".

### Para o Frontend (`banana-reservas-frontend`):

1.  **Crie um novo repositório no GitHub:**
    *   Acesse [github.com/new](https://github.com/new).
    *   Dê o nome `*****` ao repositório.
    *   Escolha se deseja que seja público ou privado.
    *   **Não** inicialize o repositório com README, .gitignore ou licença.
    *   Clique em "Create repository".

2.  **Baixe o projeto Frontend:**
    *   Você já possui a pasta `*****` gerada por mim. Certifique-se de que ela está completa com todos os arquivos.

3.  **Faça o upload dos arquivos:**
    *   No seu novo repositório no GitHub, clique no botão "Add file" e depois em "Upload files".
    *   Arraste e solte **todo o conteúdo** da pasta `*****` (incluindo subpastas como `public`, `src`, `node_modules`, `package.json`, `README.md`, etc.) para a área de upload.
    *   Role para baixo e clique em "Commit changes".

## Opção 2: Usando Comandos Git (Recomendado para Desenvolvedores)

Esta opção é mais eficiente e é a forma padrão de trabalhar com Git e GitHub.

### Pré-requisitos:
- Git instalado na sua máquina local.
- Você deve estar no terminal do seu computador, não no ambiente do sandbox.

### Para o Backend (`banana-reservas-backend`):

1.  **Crie um novo repositório no GitHub:**
    *   Acesse [github.com/new](https://github.com/new).
    *   Dê o nome `******` ao repositório.
    *   Escolha se deseja que seja público ou privado.
    *   inicialize o repositório com README, .gitignore ou licença.
    *   Clique em "Create repository".
    *   **Copie a URL do repositório** (ex: `https://github.com/AssDan/Test_Desenvolvedor_FullStack.git`).

2.  **No seu terminal local, navegue até a pasta do projeto Backend:**
    ```bash
    cd /caminho/para/******
    ```
    (Substitua `/caminho/para/` pelo caminho real onde você salvou a pasta `******`)

3.  **Inicialize o repositório Git local e faça o primeiro commit:**
    ```bash
    git init
    git add .
    git commit -m "Initial commit: Backend do sistema de reservas"
    ```

4.  **Conecte seu repositório local ao GitHub e faça o push:**
    ```bash
    git branch -M main
    git remote add origin < https://github.com/AssDan/Test_Desenvolvedor_FullStack.git>
    git push -u origin main
    ```
    (Substitua `<URL_DO_SEU_REPOSITORIO_BACKEND>` pela URL que você copiou no passo 1).

### Para o Frontend (`banana-reservas-frontend`):

1.  **Crie um novo repositório no GitHub:**
    *   Acesse [github.com/new](https://github.com/new).
    *   Dê o nome `*****` ao repositório.
    *   Escolha se deseja que seja público ou privado.
    *   inicialize o repositório com README, .gitignore ou licença.
    *   Clique em "Create repository".
    *   **Copie a URL do repositório** (ex: `https://github.com/AssDan/Test_Desenvolvedor_FullStack.git`).

2.  **No seu terminal local, navegue até a pasta do projeto Frontend:**
    ```bash
    cd /caminho/para/******
    ```
    (Substitua `/caminho/para/` pelo caminho real onde você salvou a pasta `*****`)

3.  **Inicialize o repositório Git local e faça o primeiro commit:**
    ```bash
    git init
    git add .
    git commit -m "Initial commit: Frontend do sistema de reservas"
    ```

4.  **Conecte seu repositório local ao GitHub e faça o push:**ba
    ```bash
    git branch -M main
    git remote add origin <URL_DO_SEU_REPOSITORIO_FRONTEND>
    git push -u origin main
    ```
    (Substitua `<URL_DO_SEU_REPOSITORIO_FRONTEND>` pela URL que você copiou no passo 1).

---

