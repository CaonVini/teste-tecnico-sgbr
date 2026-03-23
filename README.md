# SGBR - Desafio Técnico

<div align="center">
  <img src="public/docs/dashboard.png" alt="Dashboard Preview" width="800" />
</div>

## Funcionalidades

O projeto atende aos requisitos do desafio:

- **Busca e Filtros:** Pesquisa por nome, assunto e filtro de status.
- **Atendimentos:** Interface para criação, edição, exclusão e alteração de status.
- **Persistência Local:** Os dados são mantidos no `localStorage` do navegador.
- **Paginação:** Listagem em tabela dividida em páginas.
- **Feedback Visual:** Toasts e modais para ações.
- **Loading:** Carregamento spinners.

---

## Como Executar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/CaonVini/teste-tecnico-sgbr.git
```

2. Acesse a pasta da aplicação:

```bash
cd teste-tecnico-sgbr
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse o projeto no navegador, geralmente em `http://localhost:5173`.

---

## Tecnologias e Decisões Técnicas

- **Vue 3 (Composition API):** Interface construída favorecendo código focado com `<script setup>`.
- **TypeScript:** Utilizado para tipagem e validação de dados nas tabelas e forms.
- **Tailwind CSS:** Para estilização baseada em utilitários e sistema de design limpo do zero.
- **Gerenciamento de Estado Customizado:** A manipulação dos dados e a lógica da persistência foram isoladas em _composables_ (`useAtendimentos.ts` por exemplo). Isso separa a regra de negócio da UI, facilitando futuras integrações com APIs reais sem quebrar a tela.

---

## 📁 Estrutura de Pastas

```text
src/
 ├── components/         # Blocos visuais reaproveitáveis
 │   ├── layout/         # Containers estruturais (Menus, Base da página)
 │   ├── pages/          # Páginas raízes visualizáveis
 │   └── ui/             # Micro-componentes (Botões, Inputs, UI elementar)
 ├── composables/        # Regras de negócio e Hooks ("Store" local)
 ├── types/              # Padronização TypeScript
 ├── App.vue             # Componente raiz da aplicação
 └── main.ts             # Ponto de entrada do Vue
```

## Vue vs React — Principais Diferenças

Tenho mais familiaridade com React, então anotar as diferenças que senti na prática ajudou bastante:

**Reatividade**
No React eu precisava chamar `setState` toda vez que queria atualizar algo. No Vue com `ref`, a atualização acontece automaticamente e os `computed` recalculam sozinhos. No filtro de atendimentos isso ficou bem visível — não precisei de nenhum `useEffect` pra manter a lista atualizada.

**Formulários**
No React eu estava acostumado a criar um `onChange` pra cada campo do formulário. No Vue o `v-model` já cuida disso direto no template, o que deixou os formulários bem mais limpos.

**Estrutura do arquivo**
No React tudo fica junto no mesmo arquivo `.tsx`. No Vue o `<script setup>`, o `<template>` e o `<style>` ficam separados dentro do mesmo arquivo, o que ajudou bastante na leitura quando o componente crescia.

**Composables vs Hooks**
São bem parecidos na ideia. A maior diferença que senti foi que não existe a restrição de ordem de chamada que existe nos hooks do React, o que deu mais liberdade na hora de escrever a lógica dos composables.

---

Desenvolvido por **Vinicius Caon**.
