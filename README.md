# Gustavo OS — portfólio interativo

Portfólio profissional de Gustavo Silveira Soares, apresentado como uma experiência de desktop no navegador.

## Identidade e interface

- Área de trabalho com atalhos, menu Iniciar, barra de tarefas, relógio e alternância de tema.
- Janelas que podem ser abertas, minimizadas, maximizadas, movidas e redimensionadas no desktop.
- Navegação móvel com uma janela por vez.
- Retrato original baseado na foto do Gustavo, com profundidade visual em CSS.
- Widgets de clima de Sorocaba (Open-Meteo) e estatísticas públicas do GitHub.

## Projetos e estudos de caso

Cada estudo de caso apresenta contexto, objetivo, escopo documentado, captura de tela e links para o repositório e a demonstração.

- **Positivus** e **Python + IA** são as duas partes de um teste técnico para a Asimov Academy. O README do repositório registra o formato do desafio e decisões de implementação.
- **FreelaFlow** é descrito no próprio README como um MVP para centralizar clientes, projetos e tarefas de freelancers. A captura disponível mostra o dashboard sem dados.

Os estudos não atribuem métricas de negócio aos projetos. Percentuais e números promocionais visíveis nas páginas demonstrativas são tratados como conteúdo do layout. O estado vazio do dashboard do FreelaFlow também não é apresentado como resultado de uso.

Os detalhes e as capturas de tela são mantidos em src/data/projects.ts e public/.

## Acessibilidade e mobile

- Janelas nomeadas com relações explícitas aos títulos.
- Foco movido para uma janela ao abrir e restaurado ao fechar; minimizar devolve foco à barra de tarefas.
- Escape fecha o menu Iniciar ou a janela ativa.
- Botões, filtros, links externos e entrada do terminal têm nomes acessíveis.
- Filtros anunciam a contagem atual de projetos.
- Animações respeitam prefers-reduced-motion.
- No mobile, as janelas usam uma área de leitura rolável e navegação inferior.

## Tecnologia

React 18, TypeScript, Vite, Tailwind CSS 3, Lucide React e Vitest. Não há dependências novas nesta fase.

## Executar localmente

Instale dependências com npm ci e inicie com npm run dev.

## Verificar

Execute npm run build, npm run lint e npm run test:run.

GitHub Actions executa build e testes em pull requests. Confira também a prévia do Vercel em desktop e mobile antes de realizar o merge.

## Organização do conteúdo

- src/data/projects.ts — projetos, links, capturas e fatos documentados.
- src/data/experience.ts — experiências e formação.
- src/data/technologies.ts — tecnologias.
- src/data/certificates.ts — certificados.
- src/utils/constants.ts — contatos e links sociais.
- src/components/PortfolioDesktop.tsx — janelas, navegação e interação.
- src/components/portfolio-desktop.css — identidade visual e adaptação mobile.

## Créditos

O conceito de experiência desktop foi inspirado no portfólio de [Jonathan Bergamo](https://github.com/jonabergamo/jonathanbergamo). O layout, o conteúdo e os ativos desta implementação foram criados para o portfólio do Gustavo.
