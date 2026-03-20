<h1> Desafio Técnico - SGBR Sistemas</h1>

---
 
##  Contexto do Desafio
 
O desafio consiste em desenvolver uma aplicação frontend para **gerenciamento de atendimentos**, com funcionalidades de listagem, busca, filtragem, criação e edição de registros. A proposta avalia adaptação ao ecossistema Vue 3, organização de código, componentização e uso do TailwindCSS.
 
---

##  Como Rodar o Projeto
 
### Pré-requisitos
 
- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 9.x ou [pnpm](https://pnpm.io/)
 
### Instalação e execução
 
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
 
# Instale as dependências
npm install
 
# Inicie o servidor de desenvolvimento
npm run dev
```
 
A aplicação estará disponível em `http://localhost:5173`.

##  Estrutura de Pastas

```
 ┣ 📂 public
 ┃ ┗ 📂 icons
 ┣ 📂 src
 ┃ ┣ 📂 assets
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 layout     (Ex: Navbar central)
 ┃ ┃ ┣ 📂 pages      (Ex: Dashboard, Atendimentos)
 ┃ ┃ ┗ 📂 ui         (Ex: Botões, Tabelas, Modais)
 ┃ ┣ 📂 composables  (Ex: Nosso "banco" do LocalStorage)
 ┃ ┗ 📂 types        (Ex: Nossas definições de typescript)
```
 
