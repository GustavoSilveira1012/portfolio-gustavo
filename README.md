# Gustavo OS — Portfolio interativo

Portfolio profissional de Gustavo Silveira Soares, reconstruido como uma experiencia de **desktop OS** no navegador.

## Design

Inspirado no conceito de portfolio como sistema operacional apresentado por [Jonathan Bergamo](https://github.com/jonabergamo/jonathanbergamo). A implementacao foi escrita especificamente para este repositorio: identidade, CSS, conteudo e componentes proprios. Nenhum codigo ou asset de terceiros foi copiado.

## Funcionalidades

- Area de trabalho com atalhos e menu Iniciar
- Janelas com foco, arrastar, redimensionar, minimizar, maximizar e fechar (desktop)
- Barra de tarefas com relogio, atalhos, reset de layout e alternancia de tema
- Layout mobile com navegacao inferior e visualizacao de uma janela por vez
- Secoes Sobre, Projetos, Experiencia, Tecnologias, Formacao, Contato e Terminal
- Filtros de projetos, links para GitHub/demos, curriculos PT/EN e contatos reais
- Suporte a preferencia por movimento reduzido

## Tecnologia

React 18, TypeScript, Vite, Tailwind CSS 3 e Lucide React. Sem novas dependencias.

## Iniciar

```bash
npm ci
npm run dev
```

## Validar

```bash
npm run build
npm run lint
npm run test:run
```

O build e os testes devem ser executados antes do merge; a interface precisa de uma verificacao visual em desktop e dispositivos moveis.

## Conteudo

- `src/data/projects.ts` — projetos
- `src/data/experience.ts` — experiencia
- `src/data/technologies.ts` — tecnologias
- `src/data/certificates.ts` — certificados
- `src/utils/constants.ts` — links sociais, contato, curriculos
- `src/components/PortfolioDesktop.tsx` — interacao e janelas
- `src/components/portfolio-desktop.css` — estilos e adaptacao mobile

## Creditos

Conceito de experiencia desktop inspirado no portfolio de Jonathan Bergamo. Layout e codigo desta implementacao adaptados ao portfolio de Gustavo.
